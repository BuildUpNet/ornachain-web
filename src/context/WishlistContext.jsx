import { createContext, useContext, useEffect, useState } from 'react';
import Util from '../Utils';
import { useSelector } from 'react-redux';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const User = useSelector((state) => state.login);
  const userId = User?.user?.id;

  const [wishlist, setWishlist] = useState([]);

  // 🔹 FETCH WISHLIST
  const fetchWishlist = async () => {
    if (!userId) return;

    try {
      const response = await Util.PostData('wishlistfetch', {
        user_id: userId,
      });

      if (response.data.status) {
        setWishlist(response.data.data);
      } else {
        setWishlist([]); // clear if no data
      }
    } catch (err) {
      console.error('Fetch Wishlist Error:', err);
      setWishlist([]); // clear on error
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [userId]);

  // 🔹 ADD
  const addToWishlist = async (productId) => {
    if (!userId) return;
    try {
      const res = await Util.PostData('addwishlist', {
        user_id: userId,
        product_id: productId,
      });

      if (res.data.status) {
        await fetchWishlist(); // immediately refresh after add
      }
    } catch (err) {
      console.error('Add Wishlist Error:', err);
    }
  };

  // 🔹 REMOVE
  const removeFromWishlist = async (productId) => {
    if (!userId) return;

    // Optimistically remove from UI first
    setWishlist((prev) => prev.filter((item) => item.product_id !== productId));

    try {
      const res = await Util.PostData('removewishlist', {
        user_id: userId,
        product_id: productId,
      });

      if (res.data.status) {
        await fetchWishlist(); // refresh to sync backend
      }
    } catch (err) {
      console.error('Remove Wishlist Error:', err);
    }
  };

  const isInWishlist = (productId) => wishlist.some((item) => item.product_id === productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

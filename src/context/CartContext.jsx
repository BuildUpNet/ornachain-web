import { createContext, useContext, useEffect, useState } from "react";
import Util from "../Utils";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const User = useSelector((state) => state.login);
  const userId = User?.user?.id;

  const [cart, setCart] = useState([]);

  // 🔹 FETCH CART
  const fetchCart = async () => {
    const res = await Util.PostData("cartlist", { user_id: userId });

    setCart(
      res.data.data.map((c) => ({
        product_id: c.product_id,
        variant_id: c.variant_id,
        title: c.product.title,
        image: c.product.image,
        size: c.variant.size?.name,
        color: c.variant.color?.name,
        qty: c.qty,
        price: c.price,
        stock: c.variant.quantity,
      }))
    );
  };

  useEffect(() => {
    if (userId) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [userId]);

  // 🔹 ADD TO CART
  const addToCart = async (product, qty = 1) => {
    try {
      // ✅ HANDLE BOTH CASES
      const variant = product.variant ?? product.variants?.[0];

      if (!variant) {
        toast.error("Product variant not found");
        return;
      }

      const res = await Util.PostData("addcart", {
        user_id: userId,
        product_id: product.id,
        variant_id: variant.id,
        qty,
        price: variant.discount_price ?? variant.user_price,
      });

      if (res.data.status) {
        toast.success(res.data.message || "Added to cart");
        fetchCart();
      } else {
        toast.error(res.data.message || "Unable to add to cart");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  // 🔹 UPDATE QTY
  const updateQty = async (item, qty) => {
    try {
      const res = await Util.PostData("updatecartqty", {
        user_id: userId,
        product_id: item.product_id,
        variant_id: item.variant_id,
        qty,
      });

      if (res.data.status) {
        toast.success("Cart updated");
        fetchCart();
      } else {
        toast.error(res.data.message || "Stock limit reached");
      }
    } catch (err) {
      toast.error("Unable to update cart");
    }
  };

  // 🔹 REMOVE ITEM
  const removeItem = async (item) => {
    await Util.PostData("removecart", {
      user_id: userId,
      product_id: item.product_id,
      variant_id: item.variant_id,
    });

    toast.info("Item removed from cart");
    fetchCart();
  };

  const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  <ToastContainer position="top-right" autoClose={3000} />;
  return (
    <CartContext.Provider
      value={{ cart, cartCount, total, addToCart, updateQty, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

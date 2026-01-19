import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import Util from "../../../Utils";
import { NavLink } from "react-router-dom";

const Wishlist = () => {
  const { addToCart } = useCart();
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <>
      <Util.Component.Nav />

      {/* PAGE TITLE */}
      <section className="page-title-section">
        <div className="header-bg-overlay">
          <img
            src="images/breadcrumb.webp"
            alt="Products Banner"
            className="page-title-bg-image"
          />
          <div
            className="container position-absolute"
            style={{ top: "20%", left: 0, right: 0 }}
          >
            <div className="text-center">
              <h4 className="page-title">Wishlist</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <NavLink to="/dashboard">Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Wishlist</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* WISHLIST SECTION */}
      <section className="wishlist-section py-5">
        <div className="container">
          {wishlist.length === 0 ? (
            <div className="text-center py-5">
              <h4>Your wishlist is empty 💔</h4>
              <p>Explore products and add your favorites here.</p>
              <NavLink
                to="/shop"
                className="btn btn-lg px-5"
                style={{ backgroundColor: "#ce967e", color: "#fff" }}
              >
                Shop Now
              </NavLink>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 align-items-stretch">
              {wishlist.map((item) => {
                const product = item.product;

                // ✅ SAFE price extraction
                const firstVariant = product?.variants?.[0];

                const userPrice = firstVariant?.user_price;
                const discountPrice = firstVariant?.discount_price;

                return (
                  <div className="col" key={item.id}>
                    <div className="product-item">
                      <div className="product-img-wrapper">
                        <button
                          className="remove-btn"
                          onClick={() => removeFromWishlist(item.product_id)}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>

                        <img src={product.image} alt={product.title} />
                      </div>
                      <div className="product-details">
                        <div className="vendor-name">
                            {product.sub_category_name}
                          {product.sub_sub_category_name &&
                            ` (${product.sub_sub_category_name})`}
                        </div>

                        <h5 className="product-title">{product.title}</h5>

                        {/* ✅ PRICE AREA FIXED */}
                        <div className="price-area">
                          {discountPrice && (
                            <span className="old-price">₹{userPrice}</span>
                          )}

                          <span className="new-price">
                            ₹{discountPrice ?? userPrice}
                          </span>
                        </div>

                        <button
                          className="btn btn-add-cart"
                          onClick={() => addToCart(product, 1)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Util.Component.Footer />
    </>
  );
};

export default Wishlist;

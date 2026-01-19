import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import Util from "../../../Utils";

export const Cart = () => {
  const { cart, updateQty, removeItem, total } = useCart();
  
    const navigate = useNavigate();
  return (
    <>
      <Util.Component.Nav />

      <section class="page-title-section">
        <div className="header-bg-overlay">
          <img
            src="images/breadcrumb.webp"
            alt="Products Banner"
            className="page-title-bg-image"
          />
          <div
            className="container position-absolute"
            style={{ top: "20%", left: "0", right: "0" }}
          >
            <div className="text-center">
              <h4 className="page-title">Cart</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <NavLink to="/dashboard">Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Cart
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="cart-section">
        <div className="container">
          {/* HEADINGS */}
          <div className="row cart-headings d-none d-md-flex">
            <div className="col-md-6">PRODUCT</div>
            <div className="col-md-3">QUANTITY</div>
            <div className="col-md-3 text-end">TOTAL</div>
          </div>

          {/* CART ITEMS */}
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <h4>Your cart is empty 🛒</h4>
              <p>Please add some products to continue</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                className="row cart-item py-3 align-items-center"
                key={`${item.product_id}-${item.variant_id}`}
              >
                <div className="col-12 col-md-6 d-flex">
                  <div className="cart-img-wrapper me-4">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="cart-details">
                    <div className="vendor-text">
                      {item.vendor || "Vendor Name"}
                    </div>
                    <div className="product-title">
                      <NavLink to={`/product/${item.product_id}`}>
                        {item.title}
                      </NavLink>
                    </div>
                    <div className="unit-price">${item.price}</div>
                    {item.variant && (
                      <div className="variant-info">
                        {item.variant.color && (
                          <div>Color: {item.variant.color.name}</div>
                        )}
                        {item.variant.size && (
                          <div>Size: {item.variant.size.name}</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-12 col-md-3">
                  <div className="qty-wrapper">
                    <div className="qty-input-group d-flex gap-2">
                      <button
                        className="qty-btn btn btn-outline-secondary"
                        onClick={() => updateQty(item, item.qty - 1)}
                        disabled={item.qty === 1}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <input
                        type="text"
                        className="qty-value text-center"
                        value={item.qty}
                        readOnly
                      />
                      <button
                        className="qty-btn btn btn-outline-secondary"
                        onClick={() => {
                          if (item.qty >= item.stock) {
                            alert("Stock limit reached");
                            return;
                          }
                          updateQty(item, item.qty + 1);
                        }}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                    <div style={{ marginLeft: "25px", marginBottom: "5px" }}>
                      <button
                        className="cart-remove-btn btn  p-0 mt-2"
                        onClick={() => removeItem(item)}
                        title="Remove item"
                      >
                        <i
                          className="fa-solid fa-trash-can"
                          style={{ color: "#fff" }}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-3">
                  <div className="item-total-price text-end">
                    ${(item.qty * item.price).toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          )}

          {/* FOOTER */}
          {cart.length > 0 && (
            <div className="row cart-footer mt-4">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <label htmlFor="orderNote" className="order-note-label">
                  Order special instructions
                </label>
                <textarea
                  id="orderNote"
                  className="form-control-note w-100"
                  rows="4"
                ></textarea>
              </div>

              <div className="col-lg-6">
                <div className="subtotal-area text-end">
                  <div className="mb-2">
                    <span className="subtotal-label me-2">Subtotal</span>
                    <span className="subtotal-price">${total.toFixed(2)}</span>
                  </div>
                  <p className="tax-note">
                    Taxes and <NavLink to="#">shipping</NavLink> calculated at
                    checkout
                  </p>
                  <button className="btn btn-checkout" onClick={() => navigate("/checkout")}>Check Out</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Util.Component.Footer />
    </>
  );
};

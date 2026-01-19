import Util from "../../../Utils";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";

export const Checkout = () => {
  const navigate = useNavigate();
  const User = useSelector((state) => state.login);
  const userId = User?.user?.id;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressMode, setAddressMode] = useState("existing");
  const [paymentMethod, setPaymentMethod] = useState("ONLINE"); // default

  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const inputRef = useRef(null);
  const searchBoxRef = useRef(null);

  // Google Maps API loader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC8xxqUcj3DdFxFpHsecxPkaSK3ajslMUI",
    libraries: ["places"],
  });

  // FETCH CART
  const fetchCart = async () => {
    const res = await Util.PostData("cartlist", { user_id: userId });
    setCart(
      res.data.data.map((c) => ({
        product_id: c.product_id,
        variant_id: c.variant_id,
        title: c.product.title,
        image: c.product.image,
        category_name: c.product.category_name,
        subcategory_name: c.product.sub_category_name,
        subsubcategory_name: c.product.sub_sub_category_name,
        size: c.variant.size?.name,
        color: c.variant.color?.name,
        qty: c.qty,
        price: c.price,
        stock: c.variant.quantity,
      }))
    );
  };

  // FETCH USER ADDRESSES
  const fetchAddresses = async () => {
    const res = await Util.PostData("user-addresses", { user_id: userId });
    if (res.data && res.data.length > 0) {
      setAddresses(res.data);
      setSelectedAddressId(res.data[0].id);
      fillFormWithAddress(res.data[0]);
    }
  };

  const fillFormWithAddress = (addr) => {
    setNewAddress({
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      country: addr.country,
    });
    setFirstName(addr.first_name);
    setLastName(addr.last_name);
    setPhone(addr.phone);
  };

  useEffect(() => {
    if (userId) {
      fetchCart();
      fetchAddresses();
    }
  }, [userId]);

  const handleSelectAddress = (address) => {
    setAddressMode("existing");
    setSelectedAddressId(address.id);
    fillFormWithAddress(address);
  };

  const handleAddNewAddress = () => {
    setAddressMode("new");
    setSelectedAddressId(null);
    setNewAddress({ street: "", city: "", state: "", zip: "", country: "" });
    setFirstName("");
    setLastName("");
    setPhone("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (!places || places.length === 0) return;
    const place = places[0];
    const components = place.address_components;
    const data = { street: "", city: "", state: "", zip: "", country: "" };

    components.forEach((c) => {
      const types = c.types;
      if (types.includes("street_number")) data.street = c.long_name + " ";
      if (types.includes("route")) data.street += c.long_name;
      if (types.includes("locality")) data.city = c.long_name;
      if (types.includes("administrative_area_level_1"))
        data.state = c.short_name;
      if (types.includes("postal_code")) data.zip = c.long_name;
      if (types.includes("country")) data.country = c.long_name;
    });

    setNewAddress(data);
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.qty,
    0
  );
  const taxRate = 0.12;
  const COD_EXTRA = paymentMethod === "COD" ? 100 : 0; // ← first

  const subtotalWithCOD = subtotal + COD_EXTRA;
  const taxesWithCOD = subtotalWithCOD * taxRate;
  const totalWithCOD = subtotalWithCOD + taxesWithCOD;

  const handlePayNow = async () => {
    // 1️⃣ Validation
    if (addressMode === "existing" && !selectedAddressId) {
      return alert("Please select an existing address or add a new one!");
    } else if (addressMode === "new") {
      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !phone.trim() ||
        !newAddress.city.trim() ||
        !newAddress.state.trim() ||
        !newAddress.zip.trim() ||
        !newAddress.country.trim()
      ) {
        return alert("Please fill all the required address fields!");
      }
    }

    try {
      const res = await Util.PostData("create-order", {
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        phone,
        ...newAddress,
        subtotal,
        tax: taxesWithCOD,
        totalWithCOD,
        cart,
        payment_type: paymentMethod, // ← use radio value
        address_mode: addressMode,
        selected_address_id: selectedAddressId,
        cod_extra: COD_EXTRA,
      });

      if (paymentMethod === "COD") {
        // COD → order created successfully
        alert("Order placed successfully with COD!");
        navigate("/my-account");
      } else {
        // ONLINE → Razorpay flow
        if (!window.Razorpay) return alert("Razorpay SDK not loaded!");

        const options = {
          key: res.data.key,
          amount: res.data.amount,
          currency: "INR",
          order_id: res.data.razorpay_order_id,
          name: "My Shop",
          description: "Purchase",

          prefill: {
            name: firstName + " " + lastName,
            contact: phone,
          },

          method: {
            upi: true,
            card: true,
            netbanking: true,
            wallet: true,
          },

          config: {
            display: {
              blocks: {
                upi: {
                  name: "Pay using UPI",
                  instruments: [{ method: "upi" }],
                },
              },
              sequence: ["block.upi", "block.card", "block.netbanking"],
              preferences: {
                show_default_blocks: true,
              },
            },
          },

          handler: async (response) => {
            await Util.PostData("verify-payment", {
              ...response,
              user_id: userId,
            });
            navigate("/my-account");
          },

          modal: {
            ondismiss: function () {
              alert("Payment not completed. You can try again.");
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <>
      <Util.Component.Nav />
      <section className="checkout-section">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-7">
              <button
                className="btn btn-secondary btn-sm mb-3"
                onClick={() => navigate("/cart")}
              >
                &larr; Back to Cart
              </button>

              <h4 className="section-title">Delivery Addresses</h4>

              {/* Address Cards */}
              {addressMode === "existing" && addresses.length > 0 && (
                <div className="addresses-list mb-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`address-card ${
                        selectedAddressId === addr.id ? "selected" : ""
                      }`}
                      onClick={() => handleSelectAddress(addr)}
                    >
                      <input
                        type="radio"
                        name="savedAddress"
                        checked={selectedAddressId === addr.id}
                        readOnly
                      />
                      <div className="address-content">
                        <strong>
                          {addr.first_name} {addr.last_name}
                        </strong>
                        <p>
                          {addr.street}, {addr.city}, {addr.state}, {addr.zip},{" "}
                          {addr.country}
                        </p>
                        <p>Phone: {addr.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Address Button */}
              <div className="mb-3">
                <label className="d-flex align-items-center mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name="addressMode"
                    checked={addressMode === "existing"}
                    onChange={() => setAddressMode("existing")}
                    className="me-2"
                  />
                  <strong>Existing Address</strong>
                </label>

                <label className="d-flex align-items-center cursor-pointer">
                  <input
                    type="radio"
                    name="addressMode"
                    checked={addressMode === "new"}
                    onChange={handleAddNewAddress}
                    className="me-2"
                  />
                  <strong>Add New Address</strong>
                </label>
              </div>

              {/* Address Form */}
              {addressMode === "new" && (
                <div className="mb-4">
                  {isLoaded && (
                    <StandaloneSearchBox
                      onLoad={(ref) => (searchBoxRef.current = ref)}
                      onPlacesChanged={handlePlacesChanged}
                    >
                      <input
                        ref={inputRef}
                        className="form-control mb-3"
                        placeholder="Start typing your address"
                      />
                    </StandaloneSearchBox>
                  )}

                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        className="form-control"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        className="form-control"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        placeholder="Street"
                        value={newAddress.street}
                        className="form-control"
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            street: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city}
                        className="form-control"
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, city: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        placeholder="State"
                        value={newAddress.state}
                        className="form-control"
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            state: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        placeholder="Zip"
                        value={newAddress.zip}
                        className="form-control"
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, zip: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        placeholder="Country"
                        value={newAddress.country}
                        className="form-control"
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            country: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={phone}
                        className="form-control"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Sidebar */}
            <div className="col-lg-5">
              <div className="checkout-sidebar">
                <div className="cart-items mb-4 pb-4 border-bottom">
                  {cart.map((item, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                      <div className="cart-item-thumbnail me-3">
                        <span className="item-quantity-badge">{item.qty}</span>
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="cart-item-title">{item.title}</h6>
                        {item.color && <div>Color: {item.color}</div>}
                        {item.size && <div>Size: {item.size}</div>}
                      </div>
                      <div className="cart-item-price">${item.price}</div>
                    </div>
                  ))}
                </div>

                <div className="totals-area mb-4">
                  <table className="table table-borderless totals-table mb-0">
                    <tr>
                      <th>Subtotal</th>
                      <td>${subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <th>Taxes</th>
                       <td>${taxesWithCOD.toFixed(2)}</td>
                    </tr>
                    {paymentMethod === "COD" && (
                      <tr>
                        <th>COD Extra</th>
                        <td>${COD_EXTRA.toFixed(2)}</td>
                      </tr>
                    )}
                  </table>
                  <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-2">
                    <span className="fs-5 fw-bold">Total</span>
                    <span className="fw-bold">${totalWithCOD.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  className="btn btn-checkout w-100"
                  onClick={handlePayNow}
                >
                  Pay Now: ${totalWithCOD.toFixed(2)}
                </button>
              </div>

              <div className="mb-3">
                <label className="d-flex align-items-center mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ONLINE"
                    checked={paymentMethod === "ONLINE"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="me-2"
                  />
                  <strong>Online Payment</strong>
                </label>

                <label className="d-flex align-items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="me-2"
                  />
                  <strong>Cash on Delivery (COD)</strong>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Util.Component.Footer />

      <style>{`
        .address-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 10px;
          display: flex;
          align-items: flex-start;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .address-card.selected {
          border-color: #f0c14b;
          box-shadow: 0 0 4px rgba(0,0,0,0.2);
          background: #fffbe6;
        }
        .address-card input[type="radio"] {
          margin-right: 10px;
          margin-top: 4px;
        }
        .address-content p {
          margin: 2px 0;
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

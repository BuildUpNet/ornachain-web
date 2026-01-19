import React, { useEffect, useState } from "react";
import Util from "../../Utils";
import { useSelector } from "react-redux";

const DashboardTab = ({ setActiveTab }) => {
  const User = useSelector((state) => state.login);
  const userId = User?.user?.id;

  const [totalOrders, setTotalOrders] = useState(0);
  const [userName, setUserName] = useState("");
  const [defaultAddress, setDefaultAddress] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const res = await Util.PostData("user-order-count", {
        user_id: userId,
      });

      if (res.data.success) {
        setTotalOrders(res.data.total_orders);
        setUserName(res.data.user.name);
        setDefaultAddress(res.data.default_address);
      }
    };

    if (userId) fetchDashboardData();
  }, [userId]);

  return (
    <div
      className="tab-pane fade show active"
      id="v-pills-dashboard"
      role="tabpanel"
    >
      {/* Greeting */}
      <h4 className="content-header">Hello, {userName}!</h4>

      <p className="welcome-text">
        From your account dashboard you can view your{" "}
        <span
          className="link-text"
          onClick={() => setActiveTab("orders")}
        >
          recent orders
        </span>
        , manage your{" "}
        <span
          className="link-text"
          onClick={() => setActiveTab("addresses")}
        >
          shipping and billing addresses
        </span>
        , and{" "}
        <span
          className="link-text"
          onClick={() => setActiveTab("account")}
        >
          edit your password and account details
        </span>
        .
      </p>

      <div className="row g-4 mt-2">
        {/* Total Orders */}
        <div className="col-md-6">
          <div className="address-card d-flex flex-column justify-content-center align-items-center text-center">
            <i
              className="fa-solid fa-bag-shopping mb-3"
              style={{ fontSize: "30px", color: "var(--accent-color)" }}
            ></i>

            <h5 className="mb-1">Total Orders</h5>

            <h2 className="mb-0" style={{ color: "#333", fontWeight: 600 }}>
              {totalOrders}
            </h2>
          </div>
        </div>

        {/* Default Address */}
        <div className="col-md-6">
          <div className="address-card">
            <h5>Default Address</h5>

            {defaultAddress ? (
              <address className="address-details">
                {defaultAddress.first_name} {defaultAddress.last_name}
                <br />
                {defaultAddress.street}
                <br />
                {defaultAddress.city}, {defaultAddress.state}{" "}
                {defaultAddress.zip}
                <br />
                {defaultAddress.country}
                <br />
                Phone: {defaultAddress.phone}
              </address>
            ) : (
              <p>No address found</p>
            )}

            <button
              className="btn-text-action"
              onClick={() => setActiveTab("addresses")}
            >
              View Addresses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;

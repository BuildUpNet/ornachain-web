import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AccountSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const handleLogout = () => {
    // Clear Redux state
    dispatch({ type: 'LOGOUT' });

    // Clear redux-persist localStorage
    localStorage.removeItem('persist:root');

    // Redirect to login
    navigate('/login');
  };

  return (
    <div>
      <div className="nav flex-column account-nav">
        <button
          className={`nav-link ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          <i className="fa-solid fa-gauge-high"></i> Dashboard
        </button>

        <button
          className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <i className="fa-solid fa-box-open"></i> My Orders
        </button>

        <button
          className={`nav-link ${activeTab === "addresses" ? "active" : ""}`}
          onClick={() => setActiveTab("addresses")}
        >
          <i className="fa-solid fa-map-location-dot"></i> Addresses
        </button>

        <button
          className={`nav-link ${activeTab === "account" ? "active" : ""}`}
          onClick={() => setActiveTab("account")}
        >
          <i className="fa-regular fa-user"></i> Account Details
        </button>

        <button className="nav-link text-danger mt-4" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default AccountSidebar;

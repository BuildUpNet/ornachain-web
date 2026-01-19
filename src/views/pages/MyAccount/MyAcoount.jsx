import React from "react";
import { useState } from "react";
import AccountSidebar from "../../../components/Account/AccountSidebar";
import DashboardTab from "../../../components/Account/DashboardTab";
import OrdersTab from "../../../components/Account/OrdersTab";
import AddressesTab from "../../../components/Account/AddressesTab";
import AccountDetailsTab from "../../../components/Account/AccountDetailsTab";
import Util from "../../../Utils";

const MyAcoount = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <>
    <Util.Component.Nav/>
      <section className="account-section">
        <div className="container">
          <h1 className="page-title">My Account</h1>

          <div className="row">
            <div className="col-lg-3">
              <AccountSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            <div className="col-lg-9">
              {activeTab === "dashboard" && (
                <DashboardTab setActiveTab={setActiveTab} />
              )}

              {activeTab === "orders" && <OrdersTab />}

              {activeTab === "addresses" && <AddressesTab />}

              {activeTab === "account" && <AccountDetailsTab />}
            </div>
          </div>
        </div>
      </section>
      <Util.Component.Footer/>
    </>
  );
};

export default MyAcoount;

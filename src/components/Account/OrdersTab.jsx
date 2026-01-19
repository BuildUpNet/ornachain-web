import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Util from "../../Utils";

const OrdersTab = () => {
  const User = useSelector((state) => state.login);
  const userId = User?.user?.id;

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ORDERS LIST ================= */
  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      setLoading(true);
      const res = await Util.PostData("user-orders", {
        user_id: userId,
      });

      if (res?.data?.success) {
        setOrders(res.data.orders || []);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [userId]);

  /* ================= FETCH ORDER DETAILS ================= */
  const viewOrder = async (orderId) => {
    setLoading(true);

    const res = await Util.PostData("order-details", {
      order_id: orderId,
    });

    if (res?.data?.status) {
      setOrderDetails(res.data); // FULL response
      setSelectedOrder(orderId);
    }
    setLoading(false);
  };

  /* ================= BACK ================= */
  const backToList = () => {
    setSelectedOrder(null);
    setOrderDetails(null);
  };

  /* ================= CANCEL ORDER ================= */
  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    setLoading(true);

    const res = await Util.PostData("cancel-order", {
      order_id: orderId,
    });

    if (res?.data?.status) {
      alert("Order cancelled successfully");
      viewOrder(orderId);
    } else {
      alert("Unable to cancel order");
    }

    setLoading(false);
  };

  /* ================= INVOICE ================= */
  const downloadInvoice = (orderId) => {
    window.open(
      `${process.env.REACT_APP_API_URL}/download-invoice/${orderId}`,
      "_blank"
    );
  };

  console.log(orderDetails);

  return (
    <div className="tab-pane fade show active" id="v-pills-orders">
      {/* ================= ORDER LIST ================= */}
      {!selectedOrder && (
        <div>
          <h4 className="content-header mb-4">Order History</h4>

          <div className="table-responsive">
            <table className="table table-custom">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.order_no}</td>
                      <td>{order.date}</td>
                      <td>
                        <span
                          className={`status-badge badge-${order.payment_status?.toLowerCase()}`}
                        >
                          {order.payment_status}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status-badge badge-${order.fulfillment?.toLowerCase()}`}
                        >
                          {order.fulfillment}
                        </span>
                      </td>
                      <td>₹{order.total}</td>
                      <td>
                        <button
                          className="btn-view-order"
                          onClick={() => viewOrder(order.id)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= ORDER DETAILS ================= */}
      {selectedOrder && orderDetails && (
        <div className="address-form-section">
          <button onClick={backToList} className="btn-back-link mb-3">
            ← Back to Orders
          </button>

          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-4">
            <div>
              <h4 className="mb-1">Order #{orderDetails?.data?.order?.id}</h4>
              <p className="text-muted small mb-0">
                Placed on{" "}
                {orderDetails?.data?.order?.created_at &&
                  new Date(orderDetails.data.order.created_at).toDateString()}
              </p>
            </div>

            <div className="d-flex gap-2">
              <span
                className={`status-badge badge-${orderDetails?.data?.order?.status}`}
              >
                {orderDetails?.data?.order?.status}
              </span>

              {/* <button
                className="btn btn-dark btn-sm"
                onClick={() => downloadInvoice(orderDetails.data.order.id)}
              >
                Invoice
              </button>

              {orderDetails?.data?.order?.status === "paid" && (
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => cancelOrder(orderDetails.data.order.id)}
                >
                  Cancel
                </button>
              )} */}
            </div>
          </div>

          <div className="row g-4">
            {/* ITEMS */}
            <div className="col-lg-8">
              <div className="card rounded-0">
                <div className="card-header bg-white fw-bold">Order Items</div>

                <div className="card-body p-0">
                  {orderDetails?.data?.items?.map((item) => (
                    <div
                      key={item.order_item_id}
                      className="d-flex justify-content-between align-items-center p-3 border-bottom"
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={item?.product?.product_images}
                          alt=""
                          style={{
                            width: 70,
                            height: 70,
                            objectFit: "contain",
                          }}
                        />

                        <div className="ms-3">
                          <h6 className="mb-1">{item?.product?.title}</h6>
                          <p className="mb-0 small text-muted">
                            {item?.product?.sub_category_name} |{" "}
                            {item?.product?.sub_sub_category_name}
                          </p>
                          <p className="mb-0 small text-muted">
                            Size: {item?.product?.variant?.size_name} | Color:{" "}
                            {item?.product?.variant?.color_name}
                          </p>
                        </div>
                      </div>

                      <div className="text-end">
                        <p className="fw-bold mb-0">₹{item?.price}</p>
                        <small className="text-muted">Qty: {item?.qty}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SUMMARY + ADDRESS */}
            <div className="col-lg-4">
              {/* SUMMARY */}
              <div className="card rounded-0 mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between small mb-2">
                    <span>Subtotal</span>
                    <span>₹{orderDetails?.data?.order?.subtotal}</span>
                  </div>
                  <div className="d-flex justify-content-between small mb-2">
                    <span>Tax</span>
                    <span>₹{orderDetails?.data?.order?.tax}</span>
                  </div>
                  {orderDetails?.data?.order?.cod_extra != null && (
                    <div className="d-flex justify-content-between small mb-2">
                      <span>Cash on delivery charges</span>
                      <span>₹{orderDetails?.data?.order?.cod_extra}</span>
                    </div>
                  )}

                  <div className="d-flex justify-content-between fw-bold border-top pt-3">
                    <span>Total</span>
                    <span>₹{orderDetails?.data?.order?.total}</span>
                  </div>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="card rounded-0">
                <div className="card-body">
                  <h6 className="fw-bold mb-3">Shipping Address</h6>
                  <address className="small text-muted mb-0">
                    {orderDetails?.data?.order.address?.first_name}{" "}
                    {orderDetails?.data?.order.address?.last_name}
                    <br />
                    {orderDetails?.data?.order.address?.street}
                    <br />
                    {orderDetails?.data?.order.address?.city},{" "}
                    {orderDetails?.data?.order.address?.state}{" "}
                    {orderDetails?.data?.order.address?.zip}
                    <br />
                    {orderDetails?.data?.order.address?.country}
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTab;

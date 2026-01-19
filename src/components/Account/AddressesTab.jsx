import React, { useEffect, useState } from "react";
import Util from "../../Utils";
import { useSelector } from "react-redux";
import AddressForm from "./AddressForm";
import Swal from "sweetalert2";

const AddressesTab = () => {
  const User = useSelector((state) => state.login);
  const userId = User?.user?.id;

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  // 🔹 Fetch addresses
  const fetchAddresses = async () => {
    const res = await Util.PostData("user-addresses", {
      user_id: userId,
    });

    // handle both possible API structures
    if (Array.isArray(res.data)) {
      setAddresses(res.data);
    } else if (Array.isArray(res.data?.data)) {
      setAddresses(res.data.data);
    }
  };

  const handleDelete = async (addressId) => {
    const result = await Swal.fire({
      title: "Delete Address?",
      text: "If this address was used in any order, it will still remain safe in order history.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#999",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      await Util.PostData("deleteAddress", {
        user_id: userId,
        id: addressId,
      });

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Address deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchAddresses();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to delete address",
      });
    }
  };

  useEffect(() => {
    if (userId) fetchAddresses();
  }, [userId]);

  // 🔹 Add new address
  const handleAddNew = () => {
    setEditAddress(null);
    setShowForm(true);
  };

  // 🔹 Edit address
  const handleEdit = (address) => {
    setEditAddress(address);
    setShowForm(true);
  };

  // 🔹 After save/back
  const handleBack = () => {
    setShowForm(false);
    fetchAddresses();
  };

  return (
    <div
      className="tab-pane fade show active"
      id="v-pills-addresses"
      role="tabpanel"
    >
      {showForm ? (
        <AddressForm
          userId={userId}
          editAddress={editAddress}
          goBack={handleBack}
        />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <h4 className="content-header border-0 mb-0">My Addresses</h4>
            <button
              className="btn btn-dark btn-sm rounded-0 fw-bold"
              onClick={handleAddNew}
            >
              Add New Address
            </button>
          </div>

          <div className="row g-4">
            {addresses.length === 0 && (
              <p className="text-muted">No addresses found</p>
            )}

            {addresses.map((addr) => (
              <div className="col-md-6" key={addr.id}>
                <div className="address-card">
                  <div className="d-flex justify-content-between mb-2">
                    <h5>{addr.is_default ? "Default Address" : "Address"}</h5>
                    {addr.is_default && (
                      <i className="fa-solid fa-circle-check text-success"></i>
                    )}
                  </div>

                  <address className="address-details">
                    <strong>
                      {addr.first_name} {addr.last_name}
                    </strong>
                    <br />
                    {addr.street}
                    <br />
                    {addr.city}, {addr.state} {addr.zip}
                    <br />
                    {addr.country}
                    <br />
                    Phone: {addr.phone}
                  </address>

                  <div className="d-flex gap-3">
                    <button
                      className="btn-text-action"
                      onClick={() => handleEdit(addr)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-text-action text-danger"
                      onClick={() => handleDelete(addr.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AddressesTab;

import React, { useEffect, useState } from "react";
import Util from "../../Utils";

const AddressForm = ({ userId, editAddress, goBack }) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    phone: "",
    is_default: false,
  });

  /* 🔹 Prefill on EDIT */
  useEffect(() => {
    if (editAddress) {
      setForm({
        first_name: editAddress.first_name || "",
        last_name: editAddress.last_name || "",
        street: editAddress.street || "",
        city: editAddress.city || "",
        state: editAddress.state || "",
        zip: editAddress.zip || "",
        country: editAddress.country || "India",
        phone: editAddress.phone || "",
        is_default: editAddress.is_default === 1, // 🔴 int → boolean
      });
    }
  }, [editAddress]);

  /* 🔹 Input change */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* 🔹 Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_id: userId,
      id: editAddress?.id || null, // 👈 update if exists
      first_name: form.first_name,
      last_name: form.last_name,
      street: form.street,
      city: form.city,
      state: form.state,
      zip: form.zip,
      country: form.country,
      phone: form.phone,
      is_default: form.is_default ? 1 : 0, // 🔴 boolean → int
    };

    const res = await Util.PostData("saveUserAddress", payload);

    if (res?.data?.success) {
      goBack(); // refresh list
    } else {
      alert("Failed to save address");
    }
  };

  return (
    <>
      <button className="btn-back-link mb-3" onClick={goBack}>
        <i className="fa-solid fa-arrow-left"></i> Back to Addresses
      </button>

      <h4 className="content-header mb-4">
        {editAddress ? "Edit Address" : "Add New Address"}
      </h4>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">

          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">Street</label>
            <input
              name="street"
              value={form.street}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">City</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">State</label>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Zip</label>
            <input
              name="zip"
              value={form.zip}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-12">
            <label className="form-label">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-12 mt-2">
            <div className="form-check">
              <input
                type="checkbox"
                name="is_default"
                checked={form.is_default}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">
                Set as default address
              </label>
            </div>
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-dark">
              Save Address
            </button>
            <button
              type="button"
              className="btn btn-light ms-2"
              onClick={goBack}
            >
              Cancel
            </button>
          </div>

        </div>
      </form>
    </>
  );
};

export default AddressForm;

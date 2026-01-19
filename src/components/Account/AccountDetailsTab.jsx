import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Util from "../../Utils";
import DEFAULT_IMAGE from "../../assets/default.png";
import { addLoginDetails } from "../../Services/Actions/Actions";
import { toast } from "react-toastify";

const AccountDetailsTab = () => {
  const dispatch = useDispatch();

  const User = useSelector((state) => state.login);
  const userId = User?.user?.id;
  const userProfile = User?.user?.image;
  

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    image: "", // 👈 base64 yahin aayega
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  /* 🔹 Fetch user data */
  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      setLoading(true);

      const res = await Util.PostData("user_data", {
        user_id: userId,
      });

      if (res?.data?.status) {
        const user = res.data.data;

        const nameParts = user.name ? user.name.split(" ") : [];

        setForm((prev) => ({
          ...prev,
          first_name: nameParts[0] || "",
          last_name: nameParts.slice(1).join(" ") || "",
          email: user.email || "",
        }));

        if (userProfile) {
          setImagePreview(userProfile);
        } else {
          setImagePreview(DEFAULT_IMAGE);
        }
      }

      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  /* 🔹 Input change */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* 🔹 Image change → base64 */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // 👈 preview
      setForm({ ...form, image: reader.result }); // 👈 backend
    };
    reader.readAsDataURL(file);
  };

  /* 🔹 Remove photo */
  const handleRemovePhoto = () => {
    setImagePreview(DEFAULT_IMAGE);
    setForm({ ...form, image: "" });
  };

  /* 🔹 Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.new_password && form.new_password !== form.confirm_password) {
      toast.error("Password not matched");
      return;
    }

    const payload = {
      user_id: userId,
      name: `${form.first_name} ${form.last_name}`,
      image: form.image || null,
      current_password: form.current_password || null,
      password: form.new_password || null,
    };

    try {
      const response = await Util.PostData("update", payload);

      if (response?.data?.status === true) {
        toast.success(response.data.message || "Profile updated");

        /* 🔥 SAME AS LOGIN */
        dispatch(addLoginDetails(response.data.user));

        /* clear password fields */
        setForm({
          ...form,
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
      } else {
        toast.error(response.data.message || "Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  /* 🔹 Image src handler */
  const getImageSrc = () => {
    if (!imagePreview) return DEFAULT_IMAGE;

    if (imagePreview.startsWith("data:image")) {
      return imagePreview; // base64
    }

    return imagePreview; // server image
  };

  return (
    <div className="tab-pane fade show active" id="v-pills-account">
      <h4 className="content-header">Account Details</h4>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* 🔹 Profile Image */}
          <div className="profile-photo-wrapper">
            <div className="profile-img-container">
              <img src={getImageSrc()} alt="Profile" className="profile-img" />
            </div>

            <div>
              <input
                type="file"
                id="photoUploadInput"
                className="d-none"
                accept="image/png, image/jpeg, image/gif"
                onChange={handleImageChange}
              />

              <label htmlFor="photoUploadInput" className="btn-change-photo">
                <i className="fa-solid fa-camera"></i> Change Photo
              </label>

              <button
                type="button"
                className="btn btn-link text-danger small ms-2"
                onClick={handleRemovePhoto}
              >
                Remove
              </button>

              <div className="photo-tips">
                Allowed JPG, GIF or PNG. Max size 2MB.
              </div>
            </div>
          </div>

          {/* 🔹 Form Fields */}
          <div className="row g-4">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                className="form-control form-control-custom"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                className="form-control form-control-custom"
              />
            </div>

            <div className="col-12">
              <label className="form-label">Email</label>
              <input
                value={form.email}
                readOnly
                class="form-control form-control-custom"
                style={{ background: "#f2f2f2" }}
              />
            </div>

            {/* 🔹 Password */}
            <div className="col-12 mt-4">
              <h5 className="border-bottom pb-2">Password Change</h5>
            </div>

            <div className="col-12">
              <label class="form-label">Current Password</label>
              <input
                type="password"
                name="current_password"
                placeholder="Current Password"
                value={form.current_password}
                onChange={handleChange}
                class="form-control form-control-custom"
              />
            </div>

            <div className="col-md-6">
              <label class="form-label">New Password</label>
              <input
                type="password"
                name="new_password"
                placeholder="New Password"
                value={form.new_password}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label class="form-label">Confirm New Password</label>
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={form.confirm_password}
                onChange={handleChange}
                class="form-control form-control-custom"
              />
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-save">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AccountDetailsTab;

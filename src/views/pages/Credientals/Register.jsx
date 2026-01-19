import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Util from '../../../Utils';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors');
      return;
    }

    try {
      const response = await Util.PostData('register', formData);

      // If your API returns `status: true` for success
      if (response.data.status === true) {
        const message = response.data.message || 'Registered successfully';
        toast.success(message);

        // Optionally save success message for login page
        localStorage.setItem('loginSuccessMessage', message);

        setTimeout(() => {
          navigate('/login');
        }, 50);
      } else {
        // API returned status false
        toast.error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="register-wrapper">
        <div className="register-box">
          <h2 style={{ textAlign: 'center' }}>Create Account</h2>

          <form noValidate onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form-group">
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
              {errors.name && <small className="error">{errors.name}</small>}
            </div>

            {/* Email */}
            <div className="form-group">
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
              {errors.email && <small className="error">{errors.email}</small>}
            </div>

            {/* Password */}
            <div className="form-group">
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
              {errors.password && <small className="error">{errors.password}</small>}
            </div>

            <button type="submit" className="register-btn">
              Create Account
            </button>
          </form>

          <div className="login-link">
            Already have an account? <span onClick={() => navigate('/login')}>Login</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

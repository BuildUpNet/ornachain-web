import { useNavigate } from 'react-router-dom';
import Util from '../../../Utils';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { addLoginDetails } from '../../../Services/Actions/Actions';
import { useDispatch } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  // 🔹 Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ SHOW REGISTER SUCCESS TOAST
  useEffect(() => {
    const message = localStorage.getItem('loginSuccessMessage');
    if (message) {
      toast.success(message);
      localStorage.removeItem('loginSuccessMessage');
    }
  }, []);

  // 🔹 Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

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
      const response = await Util.PostData('login', formData);
      // Check status from API
      if (response.data.status === true) {
        dispatch(addLoginDetails(response.data.user));
        toast.success(response.data.message || 'Login successful');
        navigate('/dashboard');
      } else {
        toast.error(response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.log(error);
      // Catch network or server errors
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="register-wrapper">
        <div className="register-box">
          <h2 style={{ textAlign: 'center' }}>Login to your Account</h2>

          <form noValidate onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>

          <div className="login-link">
            Don’t have an account? <span onClick={() => navigate('/register')}>Register</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import defaultProfile from '../assets/default.png';
import Util from '../Utils';

export const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuProducts, setMenuProducts] = useState([]);


  const GetProducts = async () => {
    try {
      const response = await Util.getdata('get_product');

      // Correct path
      if (response.data.status === true && response.data.data.length > 0) {
        setMenuProducts(response.data.data);
      } else {
        console.log('No Products found, using fallback');
      }
    } catch (error) {
      console.log('Error fetching banner:', error);
    }
  };

  useEffect(() => {
    GetProducts();
  }, []);

  const groupedMenu = {};

  menuProducts?.forEach((item) => {
    // SUB CATEGORY = COLUMN
    if (!groupedMenu[item.sub_category_id]) {
      groupedMenu[item.sub_category_id] = {
        id: item.sub_category_id,
        name: item.sub_category_name, // Rings / Anklet / Earring
        items: {},
      };
    }

    // SUB SUB CATEGORY = LIST ITEM
    if (!groupedMenu[item.sub_category_id].items[item.sub_sub_category_id]) {
      groupedMenu[item.sub_category_id].items[item.sub_sub_category_id] = {
        id: item.sub_sub_category_id,
        name: item.sub_sub_category_name,
      };
    }
  });

  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();

  const user = useSelector((state) => state.login);
  console.log(user.user);


  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Helper function to check active route
  const isActive = (path) => location.pathname === path;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Clear Redux state
    dispatch({ type: 'LOGOUT' });

    // Clear redux-persist localStorage
    localStorage.removeItem('persist:root');

    // Redirect to login
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top border-bottom">
      <div className="container px-4">
        <NavLink className="navbar-brand fw-bold fs-4" to="/">
          OrnaChain
        </NavLink>

        <button className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-expand-lg navbar-collapse justify-content-center">
          <ul className="navbar-nav gap-1">
            <li className="nav-item">
              <NavLink to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
                HOME
              </NavLink>
            </li>

            <li className="nav-item mega-dropdown">
              <span className="nav-link" style={{ cursor: 'pointer' }}>
                SHOP
              </span>

              <div className="mega-menu">
                <div className="container">
                  <div className="row">
                    {Object.values(groupedMenu).map((group) => (
                      <div className="col-md-3" key={group.id}>
                        {/* COLUMN HEADING */}
                        <p className="fw-bold mb-3">{group.name}</p>

                        {/* ITEMS */}
                        {Object.values(group.items).map((item) => (
                          <NavLink key={item.id} to={`/shop/${item.id}`} className="d-block text-muted small">
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <NavLink to="/collection" className="nav-link">
                COLLECTIONS
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/contact-us" className="nav-link">
                CONTACT
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/blog" className="nav-link">
                BLOG
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="d-none d-lg-flex align-items-center gap-3">
          <NavLink to="/wishlist" className="text-dark position-relative">
            <i className="fa-regular fa-heart fs-5"></i>
            {wishlistCount > 0 && (
              <span className="badge rounded-pill position-absolute top-0 start-100 translate-middle" style={{ background: '#ce967e' }}>
                {wishlistCount}
              </span>
            )}
          </NavLink>

          <NavLink to="/cart" className="text-dark position-relative">
            <i className="fa-solid fa-cart-shopping fs-5"></i>
            {cartCount > 0 && (
              <span className="badge rounded-pill position-absolute top-0 start-100 translate-middle" style={{ background: '#ce967e' }}>
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Profile Dropdown */}
          {user?.user?.name && (
            <div className="position-relative" ref={menuRef}>
              <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }} onClick={() => setShowMenu(!showMenu)}>
                <img src={user.user.image || defaultProfile} alt="profile" width="32" height="32" className="rounded-circle object-fit-cover" />
                <span className="fw-semibold">{user.user.name}</span>
              </div>

              {showMenu && (
                <div className="position-absolute end-0 mt-2 bg-white shadow rounded py-2" style={{ minWidth: 160 }}>
                  <NavLink to="/my-account" className="dropdown-item" onClick={() => setShowMenu(false)}>
                    My Profile
                  </NavLink>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

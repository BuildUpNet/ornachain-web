import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './Services/Store/Store';
import Util from './Utils';

import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext'; // ✅ ADD THIS

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ToastContainer } from 'react-toastify';

const AppRoutes = () => {
  const user = useSelector((state) => state.login);
  return (
    <Routes>
      <Route path="/register" element={<Util.Component.Register />} />
      <Route path="/login" element={<Util.Component.Login />} />
      <Route path="/dashboard" element={<Util.Component.Dashboard />} />
      <Route path="/about-us" element={<Util.Component.About />} />
      <Route path="/contact-us" element={<Util.Component.ContactUs />} />
      <Route path="/wishlist" element={<Util.Component.Wishlist />} />

      {/* 🛒 CART & CHECKOUT */}
      <Route path="/cart" element={<Util.Component.Cart />} />
      <Route path="/checkout" element={<Util.Component.Checkout />} />
      <Route path="/collection" element={<Util.Component.Collection />} />
      <Route path="/my-account" element={<Util.Component.MyAcoount />} />

      {/* PRODUCT */}
      <Route path="/product-details/:id" element={<Util.Component.ProductDetails />} />

      <Route path="*" element={<Util.Component.PageNotFound />} />
    </Routes>
  );
};

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <>
              <ToastContainer position="top-right" autoClose={3000} newestOnTop pauseOnHover closeOnClick />
              <AppRoutes />
            </>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </PersistGate>
  </Provider>
);

export default App;

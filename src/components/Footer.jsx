import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div>
      {' '}
      <div>
        {' '}
        <footer className="footer bg-white py-5 border-top">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-3 col-md-6">
                <h5 className="fw-bold mb-3">OrnaChain</h5>
                <p className="text-muted small mb-3">If you are going to use of lorem Ipsum need to be sure there isn't anything of text</p>
                <div className="social-links d-flex gap-2">
                  <a href="#" className="btn btn-sm btn-outline-dark rounded-circle">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#" className="btn btn-sm btn-outline-dark rounded-circle">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="#" className="btn btn-sm btn-outline-dark rounded-circle">
                    <i className="fa-brands fa-pinterest-p"></i>
                  </a>
                  <a href="#" className="btn btn-sm btn-outline-dark rounded-circle">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
                <div className="mt-3">
                  <img src="https://via.placeholder.com/120x40/fff/999?text=Google+Play" alt="Google Play" className="img-fluid mb-2" />
                  <img src="https://via.placeholder.com/120x40/fff/999?text=App+Store" alt="App Store" className="img-fluid" />
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-6">
                <h6 className="fw-bold mb-3">INFORMATION</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link to="/about-us" clasName="text-muted text-decoration-none small">
                      About us
                    </Link>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-muted text-decoration-none small">
                      Delivery
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-muted text-decoration-none small">
                      Privacy
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-muted text-decoration-none small">
                      FAQ
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-muted text-decoration-none small">
                      Stocklist
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 col-6">
                <h6 className="fw-bold mb-3">CUSTOMER SERVICE</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a href="#" className="text-muted text-decoration-none small">
                      My Account
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-muted text-decoration-none small">
                      Order History
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-muted text-decoration-none small">
                      Wish List
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-muted text-decoration-none small">
                      Return & Refund
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-muted text-decoration-none small">
                      Testimonials
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 col-6">
                <h6 className="fw-bold mb-3">ACCOUNT</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link to="/login" className="text-muted text-decoration-none small">
                      Sign In
                    </Link>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-muted text-decoration-none small">
                      Track My Order
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-muted text-decoration-none small">
                      Help
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-muted text-decoration-none small">
                      Store Locator
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-muted text-decoration-none small">
                      Blogs
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6">
                <h6 className="fw-bold mb-3">CONTACT US</h6>
                <ul className="list-unstyled">
                  <li className="mb-2 small">
                    <i className="fa-solid fa-location-dot me-2 text-primary"></i>
                    <span className="text-muted">123, Jewellery Street, New York, NY 10001</span>
                  </li>
                  <li className="mb-2 small">
                    <i className="fa-solid fa-phone me-2 text-primary"></i>
                    <a href="tel:+1234567890" className="text-muted text-decoration-none">
                      (+91) 123 4567 890
                    </a>
                  </li>
                  <li className="mb-2 small">
                    <i className="fa-solid fa-envelope me-2 text-primary"></i>
                    <a href="mailto:info@OrnaChain.com" className="text-muted text-decoration-none">
                      info@OrnaChain.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <hr className="my-4" />
            <div className="row align-items-center">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                <p className="text-muted small mb-0">© 2026 OrnaChain. All Rights Reserved.</p>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <img src="https://via.placeholder.com/250x30/fff/999?text=Payment+Methods" alt="Payment Methods" className="img-fluid" />
              </div>
            </div>
          </div>
        </footer>
        ;
      </div>
    </div>
  );
};

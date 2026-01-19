import React from 'react';

export const Support = () => {
  return (
    <div>
      <section className="features-section py-4 bg-light">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3 col-6">
              <div className="feature-box">
                <i className="fa-solid fa-truck fs-3 mb-2" style={{ color: '#ce967e' }}></i>
                <h6 className="mb-1">Worldwide Shipping</h6>
                <p className="small text-muted mb-0">For Order Over $100</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="feature-box">
                <i className="fa-solid fa-clock-rotate-left fs-3 mb-2" style={{ color: '#ce967e' }}></i>
                <h6 className="mb-1">Money Back Guarantee</h6>
                <p className="small text-muted mb-0">Money back guarantee</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="feature-box">
                <i className="fa-solid fa-percent fs-3 mb-2" style={{ color: '#ce967e' }}></i>
                <h6 className="mb-1">Offer And Discounts</h6>
                <p className="small text-muted mb-0">New discount</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="feature-box">
                <i className="fa-solid fa-headset fs-3 mb-2" style={{ color: '#ce967e' }}></i>
                <h6 className="mb-1">24/7 Support Service</h6>
                <p className="small text-muted mb-0">online support service</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

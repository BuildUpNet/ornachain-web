import React, { useState } from 'react';
import Util from '../../../Utils';
import { NavLink } from 'react-router-dom';

export const ContactUs = () => {
  return (
    <>
      <Util.Component.Nav />

      {/* BREADCRUMB BANNER */}
      <section class="page-title-section">
        <div className="header-bg-overlay">
          <img src="images/breadcrumb.webp" alt="Products Banner" className="page-title-bg-image" />
          <div className="container position-absolute" style={{ top: '20%', left: '0', right: '0' }}>
            <div className="text-center">
              <h4 className="page-title">Contact Us</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <NavLink to="/dashboard">Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Contact Us
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <div className="contact-page">
        <div className="contact-container">
          {/* LEFT FORM */}
          <div className="contact-form">
            <h3>Do You Have Any Questions?</h3>

            <div className="row">
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email *" />
            </div>

            <input type="text" placeholder="Phone number" />
            <textarea placeholder="Comment"></textarea>

            <button>SEND</button>
          </div>

          {/* RIGHT INFO */}
          <div className="contact-info">
            <h3>Get In Touch With Us</h3>

            <p>
              <strong>📍 Address:</strong>
              <br />
              Co Grover Mechanical Shop,
              <br />
              Bhalla Street, Outside, Sunami Gate,
              <br />
              Sangrur, Punjab 148001
            </p>

            <p>
              <strong>📞 Contact No.:</strong>
              <br />
              098887 47494
            </p>
          </div>
        </div>

        {/* MAP */}
        <div className="map-section">
          <iframe title="map" src="https://www.google.com/maps?q=Co+Grover+Mechanical+Shop,+Bhalla+Street,+Outside,+Sunami+Gate,+Sangrur,+Punjab+148001&output=embed" width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

      <Util.Component.Footer />
    </>
  );
};

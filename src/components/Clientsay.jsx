import React from 'react';

export const Clientsay = () => {
  return (
    <div>
      {' '}
      <section className="testimonials-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold mb-2">What Our Clients Say</h2>
            <p className="text-muted">There are many variations of passages of lorem ipsum available</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="testimonial-card bg-light rounded p-4">
                <h5 className="mb-3">"Reliable product, consistently delivers."</h5>
                <p className="text-muted mb-4">lorem Ipsum is simply dummy text of the printing and typesetting industry There are many variations of passages of lorem Ipsum available.</p>
                <div className="d-flex align-items-center">
                  <img src="https://via.placeholder.com/60" alt="Author" className="rounded-circle me-3" />
                  <div>
                    <h6 className="mb-0">Stefanie Rashford</h6>
                    <small className="text-muted">Founder</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="testimonial-card bg-light rounded p-4">
                <h5 className="mb-3">"Excellent product, A+ customer service."</h5>
                <p className="text-muted mb-4">lorem Ipsum many variations of passages of there are available but the have alteration in some form by injected humour or randomised words.</p>
                <div className="d-flex align-items-center">
                  <img src="https://via.placeholder.com/60" alt="Author" className="rounded-circle me-3" />
                  <div>
                    <h6 className="mb-0">Augusta Wind</h6>
                    <small className="text-muted">Web Designer</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="testimonial-card bg-light rounded p-4">
                <h5 className="mb-3">"Impressive quality, durable and reliable."</h5>
                <p className="text-muted mb-4">There are many variations of passages of lorem Ipsum more available but the have alteration in some type scrambled it to make a type.</p>
                <div className="d-flex align-items-center">
                  <img src="https://via.placeholder.com/60" alt="Author" className="rounded-circle me-3" />
                  <div>
                    <h6 className="mb-0">Beverly Brooks</h6>
                    <small className="text-muted">Developer</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

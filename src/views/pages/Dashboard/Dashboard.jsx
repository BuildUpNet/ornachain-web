import { useState, useEffect, useRef } from 'react';
import Util from '../../../Utils';
import { Carousel as BootstrapCarousel } from 'bootstrap';

export const Dashboard = () => {
  const [Banner, setBanner] = useState([]);

  const carouselRef = useRef(null);

  // Fetch Banner data
  const GetBanner = async () => {
    try {
      const response = await Util.getdata('get_banner');

      // Correct path
      if (response.data.status === true && response.data.data.length > 0) {
        setBanner(response.data.data);
      } else {
        console.log('No banners found, using fallback');
      }
    } catch (error) {
      console.log('Error fetching banner:', error);
    }
  };

  useEffect(() => {
    GetBanner();
  }, []);

  // Initialize Bootstrap Carousel after Banner loads
  useEffect(() => {
    if (Banner.length > 0 && carouselRef.current) {
      // eslint-disable-next-line no-unused-vars
      const carousel = new BootstrapCarousel(carouselRef.current, {
        ride: 'carousel',
        interval: 3000,
        pause: 'hover',
      });
    }
  }, [Banner]);

  const activeBanners = Banner;

  return (
    <div>
      <Util.Component.Nav />

      <section className="hero-slider">
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" ref={carouselRef}>
          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {activeBanners.map((_, index) => (
              <button key={index} type="button" data-bs-target="#heroCarousel" data-bs-slide-to={index} className={index === 0 ? 'active' : ''} aria-current={index === 0 ? 'true' : undefined} aria-label={`Slide ${index + 1}`}></button>
            ))}
          </div>

          {/* Carousel Slides */}
          <div className="carousel-inner" style={{ minHeight: '600px' }}>
            {activeBanners.map((item, index) => (
              <div
                key={item.id}
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                style={{
                  backgroundImage: `url("${item.image}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '600px',
                }}
              >
                <div className="hero-slide position-relative h-100 d-flex align-items-center">
                  <div className="container-fluid">
                    <div className="row align-items-center">
                      <div className="col-lg-6 ps-5 bg-light bg-opacity-75 p-4 rounded">
                        <p className="text-uppercase mb-2 text-dark fw-bold">{item.heading}</p>

                        <h1 className="display-3 fw-bold mb-3 text-dark">{item.title}</h1>

                        <p className="lead mb-4 text-dark">{item.description}</p>

                        <a className="btn btn-lg px-5" style={{ backgroundColor: '#ce967e', color: 'white' }}>
                          {item.buttonText}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Carousel Controls */}
            <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
              {/* <span className="carousel-control-prev-icon" aria-hidden="true"></span> */}
              <span className="visually-hidden">Previous</span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
              {/* <span className="carousel-control-next-icon" aria-hidden="true"></span> */}
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>
      <Util.Component.Support />
      <Util.Component.LatestProduct />
      <Util.Component.Footer />
    </div>
  );
};

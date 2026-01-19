import React, { useEffect, useState } from 'react';
import Util from '../../../Utils';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../../context/WishlistContext';
import LoginModal from '../../../components/LoginModal';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import CryptoJS from 'crypto-js';
import { Clientsay } from '../../../components/clientsay';

export const LatestProduct = () => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);

  const GetProduct = async () => {
    try {
      const response = await Util.getdata('get_product');
      if (response.data.status === true && response.data.data.length > 0) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log('Error fetching product:', error);
    }
  };

  useEffect(() => {
    GetProduct();
  }, []);

  const handleProductClick = (id) => {
    const encryptedId = CryptoJS.AES.encrypt(id.toString(), 'Suriya123@').toString();
    navigate(`/product-details/${encodeURIComponent(encryptedId)}`);
    // navigate(`/product-details/${id}`);
  };

  const handleWishlistClick = (e, productId) => {
    e.stopPropagation();

    if (!user) {
      setShowLoginModal(true);
      return;
    }

    isInWishlist(productId) ? removeFromWishlist(productId) : addToWishlist(productId);
  };

  const NextArrow = ({ onClick }) => {
    return (
      <div
        className="custom-arrow custom-next"
        onClick={onClick}
        style={{
          position: 'absolute',
          right: '-25px',
          top: '35%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          cursor: 'pointer',
          fontSize: '30px',
          color: '#333',
        }}
      >
        &#10095; {/* Right arrow symbol */}
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div
        className="custom-arrow custom-prev"
        onClick={onClick}
        style={{
          position: 'absolute',
          left: '-25px',
          top: '35%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          cursor: 'pointer',
          fontSize: '30px',
          color: '#333',
        }}
      >
        &#10094; {/* Left arrow symbol */}
      </div>
    );
  };

  const sliderSettings = {
    dots: false, // remove bottom dots
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      {/* Products Carousel */}
      <section className="products-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold mb-2">Latest Products</h2>
            <p className="text-muted">There are many variations of passages of lorem ipsum available</p>
          </div>

          {products.length > 0 ? (
            <Slider {...sliderSettings}>
              {products.map((product) => {
                const firstVariant = product.variants && product.variants.length > 0 ? product.variants[0] : null;
                const discountPercentage = firstVariant && firstVariant.discount_price ? Math.round(((firstVariant.user_price - firstVariant.discount_price) / firstVariant.user_price) * 100) : 0;

                return (
                  <div key={product.id} className="px-2">
                    <div className="product-card h-100 d-flex flex-column" style={{ cursor: 'pointer' }} onClick={() => handleProductClick(product.id)}>
                      <div className="product-image position-relative mb-3">
                        {firstVariant && firstVariant.discount_price && <span className="badge bg-danger position-absolute top-0 start-0 m-2">SALE {discountPercentage}%</span>}
                        <img src={product.image} alt={product.title} className="img-fluid w-100" />
                        <div className="product-overlay">
                          <button className="btn btn-sm btn-white rounded-circle me-2" title="Add to Wishlist" onClick={(e) => handleWishlistClick(e, product.id)}>
                            <i className={`fa ${isInWishlist(product.id) ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'}`}></i>
                          </button>
                          <button className="btn btn-sm btn-white rounded-circle" title="Quick View" onClick={() => handleProductClick(product.id)}>
                            <i className="fa-regular fa-eye"></i>
                          </button>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-muted small mb-1">{product.sub_sub_category_name}</p>
                        <h6 className="mb-2">{product.title}</h6>
                        <div className="rating mb-2">
                          <i className="fa-solid fa-star text-warning"></i>
                          <i className="fa-solid fa-star text-warning"></i>
                          <i className="fa-solid fa-star text-warning"></i>
                          <i className="fa-solid fa-star text-warning"></i>
                          <i className="fa-regular fa-star text-warning"></i>
                        </div>
                        <p className="mb-0">
                          {firstVariant && firstVariant.discount_price ? (
                            <>
                              <span className="text-decoration-line-through text-muted me-2">${firstVariant.user_price}</span>
                              <span className="fw-bold text-primary">${firstVariant.discount_price}</span>
                            </>
                          ) : firstVariant ? (
                            <span className="fw-bold text-primary">${firstVariant.user_price}</span>
                          ) : (
                            <span className="fw-bold text-primary">Price not available</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          ) : (
            <div className="text-center">
              <p className="text-muted">No products available</p>
            </div>
          )}
        </div>

        <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />

        <style>{`
          .product-card:hover img {
            transform: scale(1.05);
          }
          .product-card:hover .product-overlay {
            opacity: 1;
          }
          .product-overlay {
            position: absolute;
            right: 10px;
            opacity: 0;
            transition: 0.3s;
          }
        `}</style>
      </section>

      <Clientsay />
    </>
  );
};

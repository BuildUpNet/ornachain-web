import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Util from '../../../Utils';
import { useCart } from '../../../context/CartContext';
import LoginModal from '../../../components/LoginModal';
import { useSelector } from 'react-redux';
import InfoModal from '../../../components/InfoModal';
import CryptoJS from 'crypto-js';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [qty, setQty] = useState(1);
  const user = useSelector((state) => state.login.user);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockMessage, setStockMessage] = useState('');

  // Variant selection state
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const bytes = CryptoJS.AES.decrypt(decodeURIComponent(id), 'Suriya123@');
        const decryptedId = bytes.toString(CryptoJS.enc.Utf8);
        const response = await Util.PostData('get_product_details', { id: decryptedId });
        if (response.data.status) {
          const productData = response.data.data;

          setProduct(productData);

          // Extract unique colors from variants
          const uniqueColors = [...new Map(productData.variants.map((v) => [v.color.id, v.color])).values()];

          const defaultColor = uniqueColors[0];
          setSelectedColor(defaultColor);

          // Sizes available for default color
          const sizesForColor = productData.variants.filter((v) => v.color.id === defaultColor.id).map((v) => v.size);
          const defaultSize = sizesForColor[0];
          setSelectedSize(defaultSize);

          // Selected variant based on default color and size
          const defaultVariant = productData.variants.find((v) => v.color.id === defaultColor.id && v.size.id === defaultSize.id);
          setSelectedVariant(defaultVariant);

          // Set main image for the variant
          // You may want to map images per variant color here.
          // For demo, pick the first image or main product image:
          setMainImage(productData.product_images?.[0] || productData.image);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product || !selectedVariant) return <p className="text-center py-5">Loading...</p>;

  const cartItem = cart.find((c) => c.product_id === product.id && c.variant?.id === selectedVariant.id);
  const alreadyInCartQty = cartItem ? cartItem.qty : 0;

  // Convert quantity to number here
  const remainingStock = Number(selectedVariant.quantity) - alreadyInCartQty;

  // Calculate discount percentage
  const discount = selectedVariant.discount_price ? Math.round(((selectedVariant.user_price - selectedVariant.discount_price) / selectedVariant.user_price) * 100) : 0;

  // Handle color selection
  const handleColorClick = (color) => {
    setSelectedColor(color);

    // Update sizes for selected color
    const sizesForColor = product.variants.filter((v) => v.color.id === color.id).map((v) => v.size);

    const firstSize = sizesForColor[0];
    setSelectedSize(firstSize);

    // Update selected variant for first size of selected color
    const variant = product.variants.find((v) => v.color.id === color.id && v.size.id === firstSize.id);
    setSelectedVariant(variant);

    // Update main image: you should ideally filter images by color here
    // For demo, just reset to first product image or main image
    setMainImage(product.product_images?.[0] || product.image);
  };

  // Handle size selection
  const handleSizeClick = (size) => {
    setSelectedSize(size);

    // Update selected variant based on current selected color and new size
    const variant = product.variants.find((v) => v.color.id === selectedColor.id && v.size.id === size.id);
    if (variant) setSelectedVariant(variant);
  };

  const handleAdd = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const remainingStock = getRemainingStock();

    if (remainingStock <= 0) {
      setStockMessage('This product is out of stock!');
      setShowStockModal(true);
      return;
    }

    if (qty > remainingStock) {
      setStockMessage(`Only ${remainingStock} item(s) left in stock!`);
      setShowStockModal(true);
      return;
    }

    addToCart({ ...product, variant: selectedVariant }, qty);
    setQty(1);
  };

  const handleBuyNow = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    const remainingStock = Number(selectedVariant.quantity) - (cart.find((c) => c.product_id === product.id && c.variant?.id === selectedVariant.id)?.qty || 0);

    if (remainingStock <= 0) {
      setStockMessage('This product is out of stock!');
      setShowStockModal(true);
      return;
    }

    if (qty > remainingStock) {
      setStockMessage(`Only ${remainingStock} item(s) left in stock!`);
      setShowStockModal(true);
      return;
    }

    addToCart({ ...product, variant: selectedVariant }, qty);
    navigate('/checkout');
  };

  const getRemainingStock = () => {
    const cartItem = cart.find((c) => c.product_id === product.id && c.variant?.id === selectedVariant.id);
    const alreadyInCartQty = cartItem ? Number(cartItem.qty) : 0;
    const variantStock = Number(selectedVariant.quantity) || 0;
    return variantStock - alreadyInCartQty;
  };

  return (
    <>
      <Util.Component.Nav />
      <section class="page-title-section">
        <div className="header-bg-overlay">
          <img src="/images/breadcrumb.webp" alt="Products Banner" className="page-title-bg-image" />
          <div className="container position-absolute" style={{ top: '20%', left: '0', right: '0' }}>
            <div className="text-center">
              <h4 className="page-title">Details</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <NavLink to="/dashboard">Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Details
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="product-details py-5">
        <div className="container">
          <div className="row">
            {/* LEFT – IMAGES */}
            <div className="col-lg-6">
              <div className="product-gallery">
                <img src={mainImage} className="main-image img-fluid mb-3" alt={product.title} />

                <div className="thumbnail-row d-flex gap-2">
                  {/* thumbnails from product_images */}
                  {product.product_images.map((img, i) => (
                    <img key={i} src={img} className={`thumbnail ${mainImage === img ? 'active border border-primary' : ''}`} style={{ width: '60px', cursor: 'pointer' }} onClick={() => setMainImage(img)} alt={`thumbnail-${i}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT – DETAILS */}
            <div className="col-lg-6">
              <h1 className="product-title">{product.title}</h1>

              {/* Category */}
              <p className="text-muted mb-2">
                {product.category_name} &gt; {product.sub_category_name} &gt; {product.sub_sub_category_name}
              </p>

              {/* Prices */}
              <div className="price-row mb-3">
                {selectedVariant.discount_price ? (
                  <>
                    <span className="old-price text-decoration-line-through me-2">${selectedVariant.user_price}</span>
                    <span className="price fw-bold text-primary me-2">${selectedVariant.discount_price}</span>
                    <span className="discount text-danger">-{discount}%</span>
                  </>
                ) : (
                  <span className="price fw-bold text-primary">${selectedVariant.user_price}</span>
                )}
              </div>

              {/* Description */}
              <p className="description mb-3 clamp-3">{product.description}</p>

              <div className="mb-3">
                <h6>Color:</h6>
                <div className="d-flex gap-2">
                  {[...new Map(product.variants.map((v) => [v.color.id, v.color])).values()].map((color) => (
                    <button
                      key={color.id}
                      style={{
                        backgroundColor: color.code,
                        width: '25px',
                        height: '24px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleColorClick(color)}
                      aria-label={color.name}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-3">
                <h6>Size:</h6>
                <div className="d-flex gap-2">
                  {product.variants
                    .filter((v) => v.color.id === selectedColor.id)
                    .map((v) => (
                      <button key={v.size.id} className={`size-btn ${selectedSize?.id === v.size.id ? 'selected' : ''}`} onClick={() => handleSizeClick(v.size)}>
                        {v.size.name}
                      </button>
                    ))}
                </div>
              </div>

              {/* Stock */}
              <div className="stock mb-3">
                <span>🔥 Stock left: {remainingStock}</span>
              </div>

              {/* Quantity Selector */}
              <div className="qty-box d-flex align-items-center mb-3 gap-2">
                <button className="btn btn-outline-secondary" onClick={() => qty > 1 && setQty(qty - 1)}>
                  -
                </button>
                <span>{qty}</span>
                <button className="btn btn-outline-secondary" onClick={() => qty < getRemainingStock() && setQty(qty + 1)} disabled={qty >= getRemainingStock()}>
                  +
                </button>
              </div>

              {/* Buttons */}
              <div className="d-flex gap-2">
                <button className="btn btn-primary" disabled={remainingStock <= 0} onClick={handleAdd}>
                  ADD TO CART
                </button>

                <button className="btn btn-success" onClick={handleBuyNow}>
                  BUY IT NOW
                </button>
              </div>
            </div>
          </div>
        </div>

        <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />

        <InfoModal show={showStockModal} onClose={() => setShowStockModal(false)} title="Stock Alert" message={stockMessage} />

        {/* Simple CSS for active thumbnail */}
        <style>{`
          .thumbnail.active {
            border: 2px solid #d8a48f;
          }
        `}</style>
      </section>

      {/* EXTRA DESCRIPTION SECTION */}
      <div className="product-extra-description mt-5">
        <div className="container">
          {/* Tabs */}
          <div className="desc-tabs text-center mb-4">
            <span className="active-tab">Description</span>
          </div>

          <hr />

          {/* Content */}
          <div className="desc-content mt-4">
            <h4 className="mb-3">About this item</h4>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      <Util.Component.Footer />
    </>
  );
};

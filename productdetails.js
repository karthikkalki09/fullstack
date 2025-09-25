
import React, { useState, useEffect } from 'react';

const ProductDetails = ({ product, onBack, onAddToCart, onBuyNow, allProducts = [], setSelectedProduct }) => {
  const [mainImage, setMainImage] = useState('');
  const [selectedTab, setSelectedTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [imageZoomed, setImageZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  // Helper function to calculate discounted price
  const getDiscountedPrice = (originalPrice, discount) => {
    return Math.round(originalPrice * (1 - (discount || 0) / 100));
  };

  // Initialize state when product is available
  useEffect(() => {
    if (product && product.images) {
      setMainImage(product.images[0]);
      setSelectedColor(product.color || '');
      const parsedSizes = product.size ? product.size.split(',').map(s => s.trim()) : [];
      setSelectedSize(parsedSizes[0] || '');
      setLoading(false);
    }
  }, [product]);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleImageHover = (e) => {
    if (!imageZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setImageZoomed(!imageZoomed);
  };

  // Loading state
  if (loading) {
    return (
      <div className="product-details-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (!product) {
    return (
      <div className="product-details-container">
        <div className="error-state">
          <h2>Product Not Found</h2>
          <p>The product you're looking for is not available.</p>
          <button onClick={onBack} className="back-btn">
            ← Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Safe defaults and mapping from ProductList data structure
  const isSoldOut = product.additionalDetails && product.additionalDetails.toLowerCase().includes('sold out');
  const parsedSizes = product.size ? product.size.split(',').map(s => s.trim()) : [];
  const parsedColors = product.color ? [{ value: product.color }] : [];
  const parsedFeatures = product.specifications ? Object.entries(product.specifications).map(([key, value]) => `${key}: ${value}`) : ['No features listed'];
  const discountedPrice = getDiscountedPrice(product.price || 0, product.discount || 0);

  const safeProduct = {
    id: product.id || '',
    name: product.name || 'Product Name',
    price: discountedPrice,
    originalPrice: product.price || null,
    discount: product.discount || 0,
    description: product.description || 'No description available.',
    fullDescription: `${product.description || ''} ${product.additionalDetails || ''}`.trim() || 'No detailed description available.',
    images: (product.images || []).map(img => img.trim()).filter(Boolean) || ['https://via.placeholder.com/600x600?text=No+Image'],
    specifications: product.specifications || { 'No specifications': 'available' },
    colors: parsedColors,
    sizes: parsedSizes,
    rating: product.rating || 0,
    reviewCount: product.reviewCount || 0,
    reviews: product.reviews || [],
    stock: isSoldOut ? 0 : 999,
    features: parsedFeatures,
    relatedProducts: product.relatedProducts || [],
    brand: product.name.split(' ')[0] || 'Unknown Brand', // Rough extraction from name
    category: product.category || 'Uncategorized',
    clothType: product.clothType || '',
    deliveryTime: product.deliveryTime || '',
    returnPolicy: product.returnPolicy || '',
  };

  // Recommended products (excluding current, with computed fields)
  const recommendedProducts = allProducts
    .filter(p => p.id !== safeProduct.id)
    .map(item => {
      const itemDiscountedPrice = getDiscountedPrice(item.price || 0, item.discount || 0);
      const itemIsSoldOut = item.additionalDetails && item.additionalDetails.toLowerCase().includes('sold out');
      return {
        ...item,
        price: itemDiscountedPrice,
        originalPrice: item.price,
        discount: item.discount || 0,
        stock: itemIsSoldOut ? 0 : 1,
        images: (item.images || []).map(img => img.trim()).filter(Boolean),
      };
    })
    .slice(0, 8);

  return (
    <div className="product-details-container">
      <div className="breadcrumb">
        <span>Home</span> / <span>Products</span> / <span className="current">{safeProduct.category}</span> / <span className="current">{safeProduct.name}</span>
      </div>

      <button onClick={onBack} className="back-btn">
        ← Back to Products
      </button>

      <div className="product-grid">
        {/* Image Gallery */}
        <div className="image-section">
          <div 
            className={`main-image-container ${imageZoomed ? 'zoomed' : ''}`}
            onMouseMove={handleImageHover}
            onMouseLeave={() => setImageZoomed(false)}
          >
            <img
              src={mainImage || safeProduct.images[0]}
              alt={safeProduct.name}
              className="main-image"
              style={{ transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }}
              onClick={toggleZoom}
            />
            {imageZoomed && <div className="zoom-hint">Click to zoom out</div>}
            {safeProduct.discount > 0 && (
              <div className="image-discount-badge">-{safeProduct.discount}%</div>
            )}
          </div>
          <div className="thumbnail-container">
            {safeProduct.images.map((img, index) => (
              <div key={index} className="thumbnail-wrapper">
                <img
                  src={img}
                  alt={`${safeProduct.name} view ${index + 1}`}
                  className={`thumbnail ${img === mainImage ? 'active' : ''}`}
                  onClick={() => {
                    setMainImage(img);
                    setImageZoomed(false);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="product-header">
            <div>
              <span className="product-brand">{safeProduct.brand}</span>
              <h1 className="product-title">{safeProduct.name}</h1>
            </div>
            <div className="product-badge">Bestseller</div>
          </div>
          
          <div className="price-section">
            <div className="price-container">
              <span className="current-price">₹{safeProduct.price.toFixed(2)}</span>
              {safeProduct.originalPrice && safeProduct.originalPrice > safeProduct.price && (
                <span className="original-price">₹{safeProduct.originalPrice.toFixed(2)}</span>
              )}
              {safeProduct.discount > 0 && (
                <span className="discount-badge">Save {safeProduct.discount}%</span>
              )}
            </div>
            <div className="tax-info">Incl. VAT plus shipping</div>
          </div>

          {safeProduct.rating > 0 && (
            <div className="rating-section">
              <div className="stars">
                {'★'.repeat(Math.floor(safeProduct.rating))}
                {'☆'.repeat(5 - Math.floor(safeProduct.rating))}
                <span className="rating-value">{safeProduct.rating.toFixed(1)}</span>
              </div>
              <span className="rating-count">({safeProduct.reviewCount} reviews)</span>
              <a href="#reviews" className="see-all-reviews">See all reviews</a>
            </div>
          )}

          <div className="product-description">
            <p>{safeProduct.description}</p>
          </div>

          <div className="share-section" style={{ marginTop: '12px' }}>
            <button
              className="btn"
              onClick={async () => {
                try {
                  const url = `${window.location.origin}?productId=${encodeURIComponent(safeProduct.id)}`;
                  const shareData = {
                    title: safeProduct.name,
                    text: safeProduct.description || 'Check out this product on NXew',
                    url
                  };
                  if (navigator.share) {
                    await navigator.share(shareData);
                  } else if (navigator.clipboard) {
                    await navigator.clipboard.writeText(url);
                    alert('Link copied to clipboard!');
                  } else {
                    prompt('Copy this link:', url);
                  }
                } catch (e) {
                  console.error('Share failed', e);
                  alert('Unable to share at the moment.');
                }
              }}
            >
              🔗 Share
            </button>
          </div>

          {/* Color Selector */}
          {safeProduct.colors.length > 0 && (
            <div className="product-option-selector">
              <span className="selector-label">Color: {selectedColor && `(${selectedColor})`}</span>
              <div className="color-options">
                {safeProduct.colors.map((color, index) => (
                  <div 
                    key={index} 
                    className={`color-option ${selectedColor === color.value ? 'selected' : ''}`}
                    style={{ backgroundColor: color.value || '#ccc' }}
                    onClick={() => setSelectedColor(color.value)}
                  >
                    {selectedColor === color.value && <span className="checkmark">✓</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {safeProduct.sizes.length > 0 && (
            <div className="product-option-selector">
              <span className="selector-label">Size: {selectedSize && `(${selectedSize})`}</span>
              <div className="size-options">
                {safeProduct.sizes.map((size, index) => (
                  <div 
                    key={index} 
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="quantity-section">
            <div className="quantity-selector">
              <span className="quantity-label">Quantity:</span>
              <div className="quantity-controls">
                <button className="quantity-btn" onClick={decrementQuantity}>-</button>
                <input 
                  type="number" 
                  className="quantity-input" 
                  value={quantity} 
                  onChange={handleQuantityChange}
                  min="1"
                />
                <button className="quantity-btn" onClick={incrementQuantity}>+</button>
              </div>
            </div>
            
            <div className="stock-status">
              {safeProduct.stock > 0 ? (
                <>
                  <span className="in-stock">In stock</span>
                  <span className="stock-amount">{safeProduct.stock} available</span>
                </>
              ) : (
                <span className="out-of-stock">Out of stock</span>
              )}
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="btn add-to-cart"
              onClick={() => onAddToCart && onAddToCart(safeProduct, quantity)}
              disabled={safeProduct.stock === 0}
            >
              <span className="btn-icon">🛒</span>
              Add to Cart
            </button>
            <button
              className="btn buy-now"
              onClick={() => onBuyNow && onBuyNow(safeProduct, quantity)}
              disabled={safeProduct.stock === 0}
            >
              <span className="btn-icon">⚡</span>
              Buy Now
            </button>
          </div>

          <div className="delivery-options">
            <h3>Delivery Options</h3>
            <div className="delivery-option">
              <span className="delivery-icon">🚚</span>
              <div className="delivery-info">
                <span className="delivery-title">Free Shipping</span>
                <span className="delivery-details">{safeProduct.deliveryTime}</span>
              </div>
            </div>
            <div className="delivery-option">
              <span className="delivery-icon">⚡</span>
              <div className="delivery-info">
                <span className="delivery-title">Express Delivery</span>
                <span className="delivery-details">Get it by tomorrow - ₹49.99</span>
              </div>
            </div>
          </div>

          <div className="product-features">
            <div className="feature">
              <span className="feature-icon">↩️</span>
              <span className="feature-text">{safeProduct.returnPolicy}</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🔒</span>
              <span className="feature-text">Secure checkout</span>
            </div>
            <div className="feature">
              <span className="feature-icon">📞</span>
              <span className="feature-text">24/7 Customer support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="product-tabs">
        <div className="tabs-header">
          <button 
            className={`tab ${selectedTab === 'description' ? 'active' : ''}`}
            onClick={() => setSelectedTab('description')}
          >
            Description
          </button>
          <button 
            className={`tab ${selectedTab === 'specifications' ? 'active' : ''}`}
            onClick={() => setSelectedTab('specifications')}
          >
            Specifications
          </button>
          <button 
            className={`tab ${selectedTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setSelectedTab('reviews')}
            id="reviews"
          >
            Reviews ({safeProduct.reviewCount})
          </button>
        </div>
        
        <div className="tab-content">
          {selectedTab === 'description' && (
            <div className="description-content">
              <h3>About this product</h3>
              <p>{safeProduct.fullDescription}</p>
              <h4>Key Features</h4>
              <ul className="feature-list">
                {safeProduct.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {selectedTab === 'specifications' && (
            <div className="specs-content">
              <h3>Technical Specifications</h3>
              <table className="specs-table">
                <tbody>
                  {Object.entries(safeProduct.specifications).map(([key, value]) => (
                    <tr key={key} className="spec-row">
                      <td className="spec-key">{key}</td>
                      <td className="spec-value">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {selectedTab === 'reviews' && (
            <div className="reviews-content">
              <div className="reviews-header">
                <div className="average-rating">
                  <span className="average">{safeProduct.rating.toFixed(1)}</span>
                  <span className="out-of">/5</span>
                  <div className="stars interactive-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="star"
                        onClick={() => {
                          alert(`You rated this product: ${star} star(s)`);
                          console.log(`Rating submitted: ${star} for ${safeProduct.name}`);
                        }}
                        style={{ 
                          cursor: 'pointer', 
                          color: star <= safeProduct.rating ? '#ffc107' : '#ddd',
                          transition: 'all 0.2s',
                          display: 'inline-block',
                          padding: '2px'
                        }}
                        onMouseEnter={(e) => (e.target.style.color = '#ffc107')}
                        onMouseLeave={(e) => (e.target.style.color = star <= safeProduct.rating ? '#ffc107' : '#ddd')}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="total-reviews">{safeProduct.reviewCount} reviews</span>
                </div>
              </div>

              <div className="review-list">
                {safeProduct.reviews.slice(0, 5).map((review, index) => (
                  <div key={index} className="review">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <span className="reviewer">{review.name || 'Anonymous'}</span>
                        <div className="review-stars">
                          {'★'.repeat(Math.floor(review.rating || 0))}
                          {'☆'.repeat(5 - Math.floor(review.rating || 0))}
                        </div>
                      </div>
                      <span className="review-date">{review.date || ''}</span>
                    </div>
                    <h4 className="review-title">{review.title || 'No Title'}</h4>
                    <p className="review-text">{review.text || 'No review text provided.'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Products Section */}
      {recommendedProducts.length > 0 && (
        <div className="recommended-products-section">
          <h2 className="section-title">You Might Also Like</h2>
          <div className="recommended-products-grid">
            {recommendedProducts.map((item) => {
              const safeItem = {
                id: item.id || '',
                name: item.name || 'Product Name',
                price: item.price || 0,
                originalPrice: item.originalPrice || null,
                discount: item.discount || 0,
                images: item.images || ['https://via.placeholder.com/300x300?text=No+Image'],
                category: item.category || '',
                stock: item.stock || 1,
              };
              return (
                <div
                  key={safeItem.id}
                  className={`recommended-product-card ${safeItem.stock === 0 ? 'out-of-stock' : ''}`}
                  onClick={() => {
                    if (setSelectedProduct && safeItem.stock > 0) {
                      setSelectedProduct(item);
                      window.scrollTo(0, 0);
                    }
                  }}
                >
                  <div className="product-image-container">
                    <img
                      src={item.images?.[0] || 'https://via.placeholder.com/300x300?text=No+Image'}
                      alt={item.name}
                      className="product-image"
                      style={{ height: '340px', width: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    {item.discount > 0 && (
                      <div className="discount-badge">-{item.discount}%</div>
                    )}
                    {item.stock === 0 && (
                      <div className="sold-out-badge">SOLD OUT</div>
                    )}
                  </div>
                  <div className="product-info">
                    {safeItem.category && (
                      <div className="product-category">{safeItem.category}</div>
                    )}
                    <div className="product-title">{safeItem.name}</div>
                    <div className="product-price">
                      <span className="discounted-price">₹{safeItem.price.toFixed(2)}</span>
                      {safeItem.originalPrice && safeItem.originalPrice > safeItem.price && (
                        <span className="original-price">₹{safeItem.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
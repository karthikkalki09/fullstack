import React, { useState } from 'react';

function CheckoutForm({ product, onBack, onSubmit }) {
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [details, setDetails] = useState('');
  const [payment, setPayment] = useState('Cash on Delivery');
  const [quantity, setQuantity] = useState(1);

  const totalPrice = (product.price * quantity).toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      address,
      mobile,
      details,
      payment,
      product: {
        ...product,
        quantity,
        totalPrice,
      },
    });
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back to Product
        </button>
        <h1>📦 Secure Checkout</h1>
      </div>

      <div className="checkout-grid">
        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-item product-summary">
            <img
              src={product.images?.[0] || 'https://via.placeholder.com/80'}
              alt={product.name || product.title}
              className="summary-image"
            />
            <div className="summary-info">
              <h3 className="summary-title">{product.name || product.title}</h3>
              <p className="summary-price">${product.price} × {quantity}</p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="quantity-selector">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button
                type="button"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="quantity-btn"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(prev => prev + 1)}
                className="quantity-btn"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${product.price * quantity}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>FREE</span>
          </div>
          <div className="summary-row total">
            <strong>Total:</strong>
            <strong className="total-amount">${totalPrice}</strong>
          </div>

          <div className="payment-method-display">
            <span>Payment Method:</span>
            <span className="payment-badge">{payment}</span>
          </div>
        </div>

        {/* Shipping & Payment Form */}
        <div className="checkout-form-section">
          <div className="form-card">
            <h2>🚚 Delivery Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="address">Delivery Address *</label>
                <input
                  id="address"
                  type="text"
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Street, City, State"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile Number *</label>
                <input
                  id="mobile"
                  type="tel"
                  required
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  placeholder="+1 234 567 8900"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="details">Additional Details</label>
                <textarea
                  id="details"
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  placeholder="Apartment, floor, delivery instructions..."
                  rows="3"
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label htmlFor="payment">Payment Method</label>
                <div className="payment-options">
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="cod"
                      name="payment"
                      value="Cash on Delivery"
                      checked={payment === 'Cash on Delivery'}
                      onChange={e => setPayment(e.target.value)}
                    />
                    <label htmlFor="cod" className="payment-label">
                      💵 Cash on Delivery
                    </label>
                  </div>
                  {/* Add more payment methods later */}
                  {/* <div className="payment-option">
                    <input
                      type="radio"
                      id="card"
                      name="payment"
                      value="Credit Card"
                      disabled
                      onChange={e => setPayment(e.target.value)}
                    />
                    <label htmlFor="card" className="payment-label">
                      💳 Credit Card (Coming Soon)
                    </label>
                  </div> */}
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={onBack}>
                  ← Back
                </button>
                <button type="submit" className="btn btn-primary">
                  ✅ Place Order Now
                </button>
              </div>
            </form>
          </div>

          <div className="trust-badges">
            <div className="badge-item">🔒 Secure Checkout</div>
            <div className="badge-item">🚚 Fast Delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
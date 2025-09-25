import React from 'react';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2 className="cart-title">Your Cart</h2>
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <p>Your cart is empty</p>
          <button 
            className="btn primary" 
            onClick={() => window.location.href = '/'}  // 👈 Redirect to homepage/products
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          {/* Product Image */}
          <div className="cart-item-image">
            <img
              src={item.image || 'https://via.placeholder.com/100?text=No+Image'}
              alt={item.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/100?text=No+Image'; // Fixed spaces
              }}
            />
          </div>

          {/* Item Info & Controls */}
          <div className="cart-item-details">
            <div className="cart-item-info">
              <div className="cart-item-title">{item.name}</div>
              <div className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</div>
            </div>

            <div className="cart-item-actions">
              <div className="cart-item-quantity">
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <div className="cart-total">Total: ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
        <button className="btn checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
// components/myorders.js
import React from 'react';

const MyOrders = ({ orders, onBuyAgain, onViewProduct, onBrowseProducts }) => {
  // Show empty state if no orders
  if (!orders || orders.length === 0) {
    return (
      <div className="my-orders-container">
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No Orders Yet</h3>
          <p>Looks like you haven't placed any orders. Start shopping now!</p>
          <button 
            className="btn primary" 
            onClick={onBrowseProducts}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders-container">
      <h2 className="panel-title">📦 My Orders</h2>
      
      {orders.map(order => {
        // Ensure order is valid
        if (!order) return null;

        const status = order.status?.toLowerCase() || 'unknown';
        const formattedDate = new Date(order.date).toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        return (
          <div key={order.id} className="order-section">
            <div className="order-summary-card">
              <div className="order-header">
                <div>
                  <strong className="order-id">{order.id}</strong>
                  <div className="order-date">{formattedDate}</div>
                </div>
                <span className={`status-badge status-${status}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-meta">
                <div><strong>🚚 Delivery:</strong> {order.address || 'Not specified'}</div>
                <div><strong>📞 Contact:</strong> {order.mobile || 'Not provided'}</div>
                {order.additional && <div><strong>📝 Note:</strong> {order.additional}</div>}
                <div><strong>💳 Payment:</strong> {order.payment || 'N/A'}</div>
                <div><strong>💰 Order Total:</strong> ₹{order.total?.toLocaleString() || 'N/A'}</div>
              </div>
            </div>

            <div className="order-items">
              <h3>Items ({order.items?.length || 0})</h3>
              <div className="items-grid">
                {order.items?.map(item => {
                  if (!item || !item.productId) return null;

                  const product = item.product;
                  const hasProductData = product && product.name && product.price !== undefined;

                  return (
                    <div 
                      key={item.productId} 
                      className="order-item"
                      onClick={() => hasProductData && onViewProduct(product)}
                      style={{ cursor: hasProductData ? 'pointer' : 'default' }}
                      aria-label={hasProductData ? `View ${product.name}` : 'Product unavailable'}
                    >
                      <img 
                        src={hasProductData && product.images && product.images[0] 
                          ? product.images[0] 
                          : 'https://via.placeholder.com/150?text=No+Image'}
                        alt={hasProductData ? product.name : 'Product image'}
                        className="order-image"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                        }}
                      />
                      <div className="order-details">
                        <h4>{hasProductData ? product.name : 'Product data unavailable'}</h4>
                        <p><strong>Price:</strong> ₹{hasProductData ? product.price?.toLocaleString() : 'N/A'}</p>
                        <p><strong>Quantity:</strong> {item.quantity || 1}</p>
                        <p><strong>Subtotal:</strong> ₹{
                          hasProductData 
                            ? (product.price * (item.quantity || 1)).toFixed(2)
                            : 'N/A'
                        }</p>
                        {hasProductData && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering onViewProduct
                              onBuyAgain(product);
                            }} 
                            className="buy-again-btn"
                            aria-label={`Buy ${product.name} again`}
                          >
                            🔄 Buy Again
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }) || (
                  <div className="order-item">
                    <div className="order-image-placeholder">🖼️</div>
                    <div className="order-details">
                      <h4>No items found</h4>
                      <p><em>Order has no items.</em></p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
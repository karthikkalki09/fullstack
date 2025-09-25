import React from 'react';

const HelpSupport = ({ setCurrentView }) => {
  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => setCurrentView('menu')}>
          ← Back to Menu
        </button>
        <h1 className="page-title">❓ Help & Support</h1>
      </div>
      
      <div className="page-content">
        <div className="help-section">
          <div className="contact-section">
            <h2>Need Assistance?</h2>
            <p>Our support team is here to help you 24/7.</p>
            
            <div className="contact-methods">
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-info">
                  <h3>Call Us</h3>
                  <p>+91 98765 43210</p>
                  <small>Mon-Sat, 9AM-8PM</small>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div className="contact-info">
                  <h3>Email Support</h3>
                  <p>support@nxew.com</p>
                  <small>Response within 2 hours</small>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">💬</div>
                <div className="contact-info">
                  <h3>Live Chat</h3>
                  <p>Available on website</p>
                  <small>Bottom right corner</small>
                </div>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>Q: How long does delivery take?</h3>
                <p>A: 3-7 business days depending on location. We provide tracking information once your order is dispatched.</p>
              </div>
              <div className="faq-item">
                <h3>Q: Can I return a product?</h3>
                <p>A: Yes, within 7 days of delivery for unused items in original packaging. Contact our support team to initiate a return.</p>
              </div>
              <div className="faq-item">
                <h3>Q: Is Cash on Delivery available?</h3>
                <p>A: Yes, Cash on Delivery is available in most major cities. Check availability during checkout.</p>
              </div>
              <div className="faq-item">
                <h3>Q: How can I track my order?</h3>
                <p>A: You'll receive a tracking number via SMS and email once your order is dispatched. You can also check your order status in "My Orders".</p>
              </div>
              <div className="faq-item">
                <h3>Q: What payment methods do you accept?</h3>
                <p>A: We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery.</p>
              </div>
              <div className="faq-item">
                <h3>Q: Can I cancel my order?</h3>
                <p>A: Orders can be cancelled within 24 hours of placement if not yet dispatched. Contact support for assistance.</p>
              </div>
            </div>
          </div>

          <div className="support-tips">
            <h2>Quick Tips</h2>
            <div className="tips-grid">
              <div className="tip-item">
                <span className="tip-icon">🔍</span>
                <p>Use our search feature to quickly find products</p>
              </div>
              <div className="tip-item">
                <span className="tip-icon">📱</span>
                <p>Add products to cart for easy checkout</p>
              </div>
              <div className="tip-item">
                <span className="tip-icon">⭐</span>
                <p>Leave reviews to help other customers</p>
              </div>
              <div className="tip-item">
                <span className="tip-icon">📧</span>
                <p>Keep your email updated for order notifications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;


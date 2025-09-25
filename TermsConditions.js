import React from 'react';

const TermsConditions = ({ setCurrentView }) => {
  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => setCurrentView('menu')}>
          ← Back to Menu
        </button>
        <h1 className="page-title">📜 Terms & Conditions</h1>
      </div>
      
      <div className="page-content">
        <div className="terms-section">
          <div className="terms-intro">
            <p><strong>Last Updated:</strong> July 1, 2024</p>
            <p>By using NXew, you agree to be bound by these Terms and Conditions. Please read them carefully.</p>
          </div>

          <div className="terms-content">
            <div className="term-item">
              <h3>1. Acceptance of Terms</h3>
              <p>By accessing and using NXew, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
            </div>

            <div className="term-item">
              <h3>2. Product Information</h3>
              <p>We strive for accuracy in all product descriptions, images, and pricing. However, we are not liable for any misprints or inaccuracies. Product colors may vary slightly due to monitor settings.</p>
            </div>

            <div className="term-item">
              <h3>3. Pricing and Payment</h3>
              <p>Prices are subject to change without notice. We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery. All payments are processed securely through encrypted gateways.</p>
            </div>

            <div className="term-item">
              <h3>4. Shipping and Delivery</h3>
              <p>Delivery within 3-7 business days. Delays may occur during peak seasons or due to factors beyond our control. We are not liable for delays caused by shipping carriers.</p>
            </div>

            <div className="term-item">
              <h3>5. Returns and Refunds</h3>
              <p>7-day return policy for unused, undamaged items with original packaging. Returns must be initiated within 7 days of delivery. Refunds will be processed within 5-7 business days.</p>
            </div>

            <div className="term-item">
              <h3>6. User Account</h3>
              <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.</p>
            </div>

            <div className="term-item">
              <h3>7. Prohibited Uses</h3>
              <p>You may not use our website for any unlawful purpose or to solicit others to perform unlawful acts. You may not violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.</p>
            </div>

            <div className="term-item">
              <h3>8. Intellectual Property</h3>
              <p>All content on this website, including text, graphics, logos, and software, is the property of NXew and is protected by copyright laws.</p>
            </div>

            <div className="term-item">
              <h3>9. Limitation of Liability</h3>
              <p>NXew shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>
            </div>

            <div className="term-item">
              <h3>10. Changes to Terms</h3>
              <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of the service constitutes acceptance of the modified terms.</p>
            </div>

            <div className="term-item">
              <h3>11. Contact Information</h3>
              <p>For questions about these Terms and Conditions, please contact us at:</p>
              <ul>
                <li>Email: legal@nxew.com</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: NXew Headquarters, Mumbai, India</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;


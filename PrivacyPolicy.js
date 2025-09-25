import React from 'react';

const PrivacyPolicy = ({ setCurrentView }) => {
  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => setCurrentView('menu')}>
          ← Back to Menu
        </button>
        <h1 className="page-title">🔒 Privacy Policy</h1>
      </div>
      
      <div className="page-content">
        <div className="privacy-section">
          <div className="privacy-intro">
            <p><strong>Last Updated:</strong> July 1, 2024</p>
            <p>At <strong>NXew</strong>, we respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information.</p>
          </div>

          <div className="privacy-content">
            <div className="privacy-item">
              <h3>What Information We Collect</h3>
              <div className="info-categories">
                <div className="category">
                  <h4>Personal Information</h4>
                  <ul>
                    <li>Name, email address, and phone number</li>
                    <li>Shipping and billing addresses</li>
                    <li>Date of birth (optional)</li>
                  </ul>
                </div>
                <div className="category">
                  <h4>Payment Information</h4>
                  <ul>
                    <li>Payment method details (processed securely)</li>
                    <li>Transaction history</li>
                    <li>Billing information</li>
                  </ul>
                </div>
                <div className="category">
                  <h4>Technical Information</h4>
                  <ul>
                    <li>Device and browser information</li>
                    <li>IP address and location data</li>
                    <li>Website usage patterns and preferences</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="privacy-item">
              <h3>How We Use Your Information</h3>
              <div className="usage-purposes">
                <div className="purpose">
                  <span className="purpose-icon">🛒</span>
                  <div className="purpose-content">
                    <h4>Order Processing</h4>
                    <p>To process and fulfill your orders, send confirmations, and provide customer support.</p>
                  </div>
                </div>
                <div className="purpose">
                  <span className="purpose-icon">📧</span>
                  <div className="purpose-content">
                    <h4>Communication</h4>
                    <p>To send order updates, respond to inquiries, and provide customer service.</p>
                  </div>
                </div>
                <div className="purpose">
                  <span className="purpose-icon">🔧</span>
                  <div className="purpose-content">
                    <h4>Service Improvement</h4>
                    <p>To analyze usage patterns and improve our website, products, and services.</p>
                  </div>
                </div>
                <div className="purpose">
                  <span className="purpose-icon">🎯</span>
                  <div className="purpose-content">
                    <h4>Personalization</h4>
                    <p>To personalize your experience and recommend products you might like.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="privacy-item">
              <h3>Data Protection & Security</h3>
              <div className="security-measures">
                <div className="security-item">
                  <span className="security-icon">🔐</span>
                  <div className="security-content">
                    <h4>SSL Encryption</h4>
                    <p>All data transmission is protected with industry-standard SSL encryption.</p>
                  </div>
                </div>
                <div className="security-item">
                  <span className="security-icon">💳</span>
                  <div className="security-content">
                    <h4>Secure Payments</h4>
                    <p>We never store your full payment card details. All payments are processed through secure third-party gateways.</p>
                  </div>
                </div>
                <div className="security-item">
                  <span className="security-icon">🛡️</span>
                  <div className="security-content">
                    <h4>Access Controls</h4>
                    <p>Strict access controls and regular security audits protect your personal information.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="privacy-item">
              <h3>Information Sharing</h3>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share information only in these limited circumstances:</p>
              <ul>
                <li><strong>Service Providers:</strong> With trusted partners who help us operate our business (shipping, payment processing)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </div>

            <div className="privacy-item">
              <h3>Your Rights</h3>
              <div className="user-rights">
                <div className="right-item">
                  <span className="right-icon">👁️</span>
                  <h4>Access</h4>
                  <p>Request a copy of the personal data we hold about you</p>
                </div>
                <div className="right-item">
                  <span className="right-icon">✏️</span>
                  <h4>Correction</h4>
                  <p>Request correction of inaccurate or incomplete data</p>
                </div>
                <div className="right-item">
                  <span className="right-icon">🗑️</span>
                  <h4>Deletion</h4>
                  <p>Request deletion of your personal data</p>
                </div>
                <div className="right-item">
                  <span className="right-icon">🚫</span>
                  <h4>Opt-out</h4>
                  <p>Unsubscribe from marketing communications</p>
                </div>
              </div>
            </div>

            <div className="privacy-item">
              <h3>Cookies and Tracking</h3>
              <p>We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.</p>
            </div>

            <div className="privacy-item">
              <h3>Contact Us</h3>
              <p>For questions about this Privacy Policy or to exercise your rights, please contact us:</p>
              <div className="contact-info">
                <div className="contact-item">
                  <strong>Email:</strong> privacy@nxew.com
                </div>
                <div className="contact-item">
                  <strong>Phone:</strong> +91 98765 43210
                </div>
                <div className="contact-item">
                  <strong>Address:</strong> NXew Privacy Officer, Mumbai, India
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

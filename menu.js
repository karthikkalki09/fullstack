import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaShoppingBag,
  FaHome,
  FaQuestionCircle,
  FaFileContract,
  FaUserShield,
  FaChevronDown,
} from 'react-icons/fa';

const Menu = ({ setCurrentView }) => {

  const menuItems = [
    { id: 1, title: 'My Orders', icon: <FaShoppingBag />, view: 'orders' },
    { id: 2, title: 'About Us', icon: <FaHome />, view: 'about' },
    { id: 3, title: 'Help & Support', icon: <FaQuestionCircle />, view: 'help' },
    { id: 4, title: 'Terms & Conditions', icon: <FaFileContract />, view: 'terms' },
    { id: 5, title: 'Privacy Policy', icon: <FaUserShield />, view: 'privacy' }
  ];

  const handleMenuClick = (view) => {
    setCurrentView(view);
  };


  return (
    <div className="menu-dashboard">
      {/* Sidebar */}
      <div className="menu-sidebar">
        <div className="sidebar-header">
          <h2 className="menu-title">☰ Account Menu</h2>
        </div>
        
        <nav className="menu-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className="menu-item"
              onClick={() => handleMenuClick(item.view)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.title}</span>
              <span className="menu-arrow">
                <FaChevronDown />
              </span>
            </button>
          ))}
        </nav>

        {/* Social Links */}
        <div className="social-section">
          <p className="social-title">Connect With Us</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="menu-main-content">
        <div className="section-panel welcome-panel">
          <div className="welcome-content">
            <div className="welcome-icon">👋</div>
            <h2>Welcome to Your Account Dashboard</h2>
            <p>Select an option from the menu to view details.</p>
            <div className="welcome-illustration">📊</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
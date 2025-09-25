import React from "react";

const MiniFooter = () => {
  return (
    <div className="mini-footer" role="contentinfo" aria-label="Site footer">
      <div className="mini-footer-sections">
        <div className="mini-footer-col">
          <h4 className="mini-footer-title">Quick Links</h4>
          <ul className="mini-footer-list">
            <li><button className="link-like" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button></li>
            <li><a href="#offers" className="mini-link">Offer Zone</a></li>
          </ul>
        </div>
        <div className="mini-footer-col">
          <h4 className="mini-footer-title">Customer Service</h4>
          <ul className="mini-footer-list">
            <li><a href="#contact" className="mini-link">Contact Us</a></li>
            <li><a href="#help" className="mini-link">Help & FAQ</a></li>
            <li><a href="#track" className="mini-link">Track Order</a></li>
          </ul>
        </div>
        <div className="mini-footer-col">
          <h4 className="mini-footer-title">Let's Connect</h4>
          <div className="mini-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="mini-footer-bottom">
        <span>© {new Date().getFullYear()} NXew. All rights reserved.</span>
        <div className="mini-legal">
          <a href="#terms" className="mini-link">Terms & Conditions</a>
          <span className="dot" aria-hidden>•</span>
          <a href="#privacy" className="mini-link">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default MiniFooter;



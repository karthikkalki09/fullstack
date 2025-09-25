import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = ({ currentView, setCurrentView, cartItemsCount }) => {
  return (
    <footer className="footer">
      <div className="footer-icons">
        {/* Home */}
        <div
          className={`footer-icon ${currentView === "home" ? "active" : ""}`}
          onClick={() => setCurrentView("home")}
        >
          <i className="bi bi-house"></i>
        </div>

        {/* Search */}
        <div
          className={`footer-icon ${currentView === "search" ? "active" : ""}`}
          onClick={() => setCurrentView("search")}
        >
          <i className="bi bi-search"></i>
        </div>

        {/* Menu */}
        <div
          className={`footer-icon ${currentView === "menu" ? "active" : ""}`}
          onClick={() => setCurrentView("menu")}
        >
          <span className="footer-label">MENU</span>
        </div>

        {/* Cart */}
        <div
          className={`footer-icon ${currentView === "cart" ? "active" : ""}`}
          onClick={() => setCurrentView("cart")}
          style={{ position: "relative" }}
          aria-label="Cart"
        >
          <i className="bi bi-bag"></i>
          {cartItemsCount > 0 && (
            <span className="cart-badge inside">{cartItemsCount}</span>
          )}
        </div>
 {/* Account */}
        <div
          className={`footer-icon ${currentView === "account" ? "active" : ""}`}
          onClick={() => setCurrentView("account")}
        >
          <i className="bi bi-person"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

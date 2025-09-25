import React, { useState, useEffect } from 'react';

import Footer from './components/footer';
import MiniFooter from './components/MiniFooter';
import Header from './components/header';
import ProductList from './components/productlist';
import Account from './components/account';
import Menu from './components/menu';
import Cart from './components/cart';
import Search from './components/search';
import ProductDetails from './components/productdetails';
import CheckoutForm from './components/checkoutform';
import MyOrders from './components/myorders';
import { products } from './data/products';
import AboutUs from './components/AboutUs';
import HelpSupport from './components/HelpSupport';
import TermsConditions from './components/TermsConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import Popup from './components/popup';

import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orders, setOrders] = useState([]);
  const [popup, setPopup] = useState({ message: '', type: 'info', show: false });

  // 🎉 Show popup message
  const showPopup = (message, type = 'info') => {
    setPopup({ message, type, show: true });
  };

  // 🎉 Close popup
  const closePopup = () => {
    setPopup(prev => ({ ...prev, show: false }));
  };

  // 📦 Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedUser = localStorage.getItem('user');
    const savedOrders = localStorage.getItem('orders');

    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    // Deep link: open product by ?productId=
    const params = new URLSearchParams(window.location.search);
    const productIdParam = params.get('productId');
    if (productIdParam) {
      const pid = parseInt(productIdParam, 10);
      const match = products.find(p => p.id === pid);
      if (match) {
        setSelectedProduct(match);
        setCurrentView('home');
      }
    }
  }, []);

  // 💾 Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 💾 Save orders to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // 💾 Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // ➕ Add to Cart
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        showPopup(`${product.name} quantity increased!`, 'success');
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        showPopup(`${product.name} added to cart!`, 'success');
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // ➖ Remove from Cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      if (itemToRemove) {
        showPopup(`${itemToRemove.name} removed from cart!`, 'warning');
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  // 🔄 Update Quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === productId);
      if (item) {
        showPopup(`${item.name} quantity updated to ${newQuantity}!`, 'info');
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  // 🔐 Login / Logout
  const handleLogin = (userData) => {
    setUser(userData);
    showPopup(`Welcome back, ${userData.name}!`, 'success');
    handleFooterNavigation('home'); // ✅ Use global nav
  };

  const handleLogout = () => {
    const userName = user?.name || 'User';
    setUser(null);
    showPopup(`Goodbye, ${userName}! See you next time.`, 'info');
    handleFooterNavigation('home'); // ✅ Use global nav
  };

  // 💳 Buy Now → Go to Checkout
  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowCheckout(true);
  };

  // ✅ Handle Checkout Submission
  const handleCheckoutSubmit = (orderDetails) => {
    const newOrder = {
      ...orderDetails,
      date: new Date().toISOString(),
      id: `ORD-${Date.now()}`,
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);

    showPopup(
      `Order placed successfully!\n${orderDetails.product.name} - ₹${orderDetails.product.price}`,
      'success'
    );

    setShowCheckout(false);
    setSelectedProduct(null);
  };

  // 🔄 Buy Again (from MyOrders)
  const handleBuyAgain = (product) => {
    addToCart(product);
    showPopup(`${product.name} added to cart from order history!`, 'info');
    handleFooterNavigation('cart'); // ✅ Navigate via global nav
  };

  // 🔄 Global Navigation Handler — resets modal states
  const handleFooterNavigation = (view) => {
    setCurrentView(view);
    setShowCheckout(false);      // Exit checkout
    setSelectedProduct(null);   // Clear product detail view
  };

  // 🎯 Render Content Based on State
  const renderContent = () => {
    // Show Checkout Form if active
    if (showCheckout && selectedProduct) {
      return (
        <CheckoutForm
          product={selectedProduct}
          onBack={() => setShowCheckout(false)}
          onSubmit={handleCheckoutSubmit}
        />
      );
    }

    // Show Product Details if selected
    if (selectedProduct) {
      return (
        <ProductDetails
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          onBuyNow={handleBuyNow}
          allProducts={products}
          setSelectedProduct={setSelectedProduct}
        />
      );
    }

    // Render main views
    switch (currentView) {
      case 'home':
        return <ProductList addToCart={addToCart} setSelectedProduct={setSelectedProduct} />;
      case 'account':
        return <Account user={user} onLogin={handleLogin} onLogout={handleLogout} showPopup={showPopup} />;
      case 'menu':
        return <Menu setCurrentView={handleFooterNavigation} />; // ✅ Use global nav
      case 'cart':
        return (
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        );
      case 'search':
        return <Search addToCart={addToCart} setSelectedProduct={setSelectedProduct} />;
      case 'orders':
        return (
          <MyOrders 
            orders={orders} 
            onBuyAgain={handleBuyAgain} 
            onBrowseProducts={() => handleFooterNavigation('home')} 
          />
        );
      case 'about':
        return <AboutUs setCurrentView={handleFooterNavigation} />;
      case 'help':
        return <HelpSupport setCurrentView={handleFooterNavigation} />;
      case 'terms':
        return <TermsConditions setCurrentView={handleFooterNavigation} />;
      case 'privacy':
        return <PrivacyPolicy setCurrentView={handleFooterNavigation} />;
      default:
        return <ProductList addToCart={addToCart} setSelectedProduct={setSelectedProduct} />;
    }
  };

  // 🛒 Calculate total cart item count for badges
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="App">
      {/* Show header only on true home (not details or checkout) */}
      {currentView === 'home' && !selectedProduct && !showCheckout && (
        <Header
          currentView={currentView}
          setCurrentView={handleFooterNavigation}
          cartItemsCount={cartItemCount}
          user={user}
        />
      )}
      <main className="main-content">
        {renderContent()}
        {/* Mini footer appears only on home page and scrolls with content */}
        {currentView === 'home' && !selectedProduct && !showCheckout && (
          <MiniFooter />
        )}
      </main>
      <Footer 
        currentView={currentView} 
        setCurrentView={handleFooterNavigation} // ✅ Global nav
        cartItemsCount={cartItemCount}          // ✅ Show cart badge in footer
      />
      {popup.show && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={closePopup}
        />
      )}
    </div>
  );
}

export default App;
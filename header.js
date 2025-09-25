import React from 'react';

const Header = ({ currentView }) => {
  // Only render header on the home page
  if (currentView !== 'home') {
    return null;
  }

  return (
    <header className="header">
      <div className="header-content">
        <img src="https://i.pinimg.com/1200x/df/87/f5/df87f5ae6f8bd3e9f624c301509c0179.jpg"/>
      </div>
    </header>
  );
};

export default Header;

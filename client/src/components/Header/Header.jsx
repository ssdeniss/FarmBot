import React from 'react';
import logo from '../../assets/images/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <img className="header__logo" src={logo} alt="Logo" />
          <div className="header__user">Administrative Acount</div>
        </div>
      </div>
    </header>
  );
};

export default Header;

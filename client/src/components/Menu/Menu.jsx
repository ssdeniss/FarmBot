import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../Icon';

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentMenuItem, setCurrentMenuItem] = useState('');

  const handleNavigate = (nav) => {
    navigate(`/${nav}`);
  };

  useEffect(() => {
    setCurrentMenuItem(location.pathname.split('/').pop());
  }, [location.pathname]);

  return (
    <div className="menu">
      <div className="menu__items">
        <div className="menu__indicator" />
        <button
          className={`menu__item ${currentMenuItem === 'home' ? 'active' : ''}`}
          type="button"
          onClick={() => handleNavigate('home')}
        >
          <Icon name="home" />
        </button>
        <button
          className={`menu__item ${
            currentMenuItem === 'library' ? 'active' : ''
          }`}
          type="button"
          onClick={() => handleNavigate('library')}
        >
          <Icon name="library" />
        </button>
        <button
          className={`menu__item ${
            currentMenuItem === 'calendar' ? 'active' : ''
          }`}
          type="button"
          onClick={() => handleNavigate('calendar')}
        >
          <Icon name="calendar" />
        </button>
        <button
          className={`menu__item ${
            currentMenuItem === 'settings' ? 'active' : ''
          }`}
          type="button"
          onClick={() => handleNavigate('settings')}
        >
          <Icon name="settings" />
        </button>
      </div>
    </div>
  );
};

export default Menu;

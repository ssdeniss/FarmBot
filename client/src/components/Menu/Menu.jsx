import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../Icon';

const ICONS_DISTANCE = 69;

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentMenuItem, setCurrentMenuItem] = useState(
    location.pathname.split('/').pop(),
  );
  const [distance, setDistance] = useState(0);
  const [menuHover, setMenuHover] = useState(false);

  const handleNavigate = (nav, index) => {
    navigate(`/${nav}`);
    setDistance(index * ICONS_DISTANCE);
  };

  useEffect(() => {
    setCurrentMenuItem(location.pathname.split('/').pop());
  }, [location.pathname]);

  return (
    <div
      className={`menu ${menuHover ? 'active' : ''}`}
      onMouseEnter={() => setMenuHover(true)}
      onMouseLeave={() => setMenuHover(false)}
    >
      <Icon className="menu__icon" name="menu" />
      <div className="menu__items">
        <button
          className={`menu__item ${currentMenuItem === 'home' ? 'active' : ''}`}
          type="button"
          onClick={() => handleNavigate('home', 0)}
        >
          <Icon name="home" />
        </button>
        <button
          className={`menu__item ${
            currentMenuItem === 'library' ? 'active' : ''
          }`}
          type="button"
          onClick={() => handleNavigate('library', 1)}
        >
          <Icon name="library" />
        </button>
        <button
          className={`menu__item ${
            currentMenuItem === 'calendar' ? 'active' : ''
          }`}
          type="button"
          onClick={() => handleNavigate('calendar', 2)}
        >
          <Icon name="calendar" />
        </button>
        <button
          className={`menu__item ${
            currentMenuItem === 'settings' ? 'active' : ''
          }`}
          type="button"
          onClick={() => handleNavigate('settings', 3)}
        >
          <Icon name="settings" />
        </button>
        <button
          className={`menu__item ${
            currentMenuItem === 'administration' ? 'active' : ''
          }`}
          type="button"
          onClick={() => handleNavigate('administration', 4)}
        >
          <Icon name="administration" />
        </button>
        <div
          className="menu__indicator"
          style={{ transform: `translateY(${distance}px)` }}
        />
      </div>
    </div>
  );
};

export default Menu;

import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../Icon';
import MenuItem from './MenuItem';

const ICONS_DISTANCE = 69;

const MENU_ITEMS = {
  DEFAULT: { path: '' },
  HOME: { path: 'home', index: 0 },
  LIBRARY: { path: 'library', index: 1 },
  CALENDAR: { path: 'calendar', index: 2 },
  SETTINGS: { path: 'settings', index: 3 },
  ADMINISTRATION: { path: 'administration', index: 4 },
};

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [distance, setDistance] = useState(0);
  const [menuHover, setMenuHover] = useState(false);

  const current = useMemo(() => {
    const key = location.pathname.split('/')[1].toUpperCase();
    return MENU_ITEMS[key] || MENU_ITEMS.DEFAULT;
  }, [location.pathname]);

  useEffect(() => {
    if (current) {
      setDistance(current.index * ICONS_DISTANCE);
    }
  }, [current]);

  const handleNavigate = ({ path, index }) => {
    navigate(`/${path}`);
    setDistance(index * ICONS_DISTANCE);
  };

  return (
    <div
      className={`menu ${menuHover ? 'active' : ''}`}
      onMouseEnter={() => setMenuHover(true)}
      onMouseLeave={() => setMenuHover(false)}
    >
      <Icon className="menu__icon" name="menu" />
      <div className="menu__items">
        <MenuItem
          current={current.path}
          name={MENU_ITEMS.HOME.path}
          onClick={() => handleNavigate(MENU_ITEMS.HOME)}
        />
        <MenuItem
          current={current.path}
          name={MENU_ITEMS.LIBRARY.path}
          onClick={() => handleNavigate(MENU_ITEMS.LIBRARY)}
        />
        <MenuItem
          current={current.path}
          name={MENU_ITEMS.CALENDAR.path}
          onClick={() => handleNavigate(MENU_ITEMS.CALENDAR)}
        />
        <MenuItem
          current={current.path}
          name={MENU_ITEMS.SETTINGS.path}
          onClick={() => handleNavigate(MENU_ITEMS.SETTINGS)}
        />
        <MenuItem
          current={current.path}
          name={MENU_ITEMS.ADMINISTRATION.path}
          onClick={() => handleNavigate(MENU_ITEMS.ADMINISTRATION)}
        />
        <div
          className="menu__indicator"
          style={{ transform: `translateY(${distance}px)` }}
        />
      </div>
    </div>
  );
};

export default Menu;

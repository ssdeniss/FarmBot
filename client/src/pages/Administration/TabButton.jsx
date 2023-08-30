import React from 'react';

const TabButton = ({ current, tabKey, name, onClick }) => {
  const handleClick = () => {
    if (onClick && typeof onClick === 'function') {
      onClick(tabKey);
    }
  };

  return (
    <button
      type="button"
      className={`administration__tab ${current === tabKey ? 'active' : ''}`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default TabButton;

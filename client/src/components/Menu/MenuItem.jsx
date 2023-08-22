import React from 'react';
import Icon from '../Icon';

const MenuItem = ({ current, name, onClick = () => {} }) => {
  return (
    <button
      className={`menu__item ${current === name ? 'active' : ''}`}
      type="button"
      onClick={onClick}
    >
      <Icon name={name} />
    </button>
  );
};
export default MenuItem;

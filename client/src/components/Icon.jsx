import React from 'react';
import sprite from '../assets/icons/sprite.svg';

const Icon = ({ onClick, name, className, ...rest }) => {
  return (
    <svg className={className} onClick={onClick} {...rest}>
      <use href={`${sprite}#${name}`} />
    </svg>
  );
};

export default Icon;

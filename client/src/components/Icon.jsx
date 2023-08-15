import React from 'react';
import sprite from '../assets/icons/sprite.svg';

const Icon = ({ name, className, ...rest }) => {
  return (
    <svg className={className} {...rest}>
      <use href={`${sprite}#${name}`} />
    </svg>
  );
};

export default Icon;

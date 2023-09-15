import React from 'react';
import sprite from '../assets/icons/sprite.svg';

const Icon = ({
  onClick,
  name,
  className,
  width = '20px',
  height = '20px',
  ...rest
}) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      {...rest}
      width={width}
      height={height}
    >
      <use href={`${sprite}#${name}`} />
    </svg>
  );
};

export default Icon;

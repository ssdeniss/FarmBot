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
      width={width}
      height={height}
      {...rest}
    >
      <use href={`${sprite}#${name?.toString()?.toLowerCase()}`} />
    </svg>
  );
};

export default Icon;

import React from 'react';

const Drawer = ({ children, active }) => {
  return <div className={`drawer ${active ? 'active' : ''}`}>{children}</div>;
};

export default Drawer;

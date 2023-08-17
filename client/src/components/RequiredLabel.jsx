import React from 'react';

const RequiredLabel = ({ title, required = true, ...res }) => {
  return required ? (
    <div style={{ display: 'flex', ...res }}>
      <div style={{ color: 'red' }}>*</div>
      <div style={{ marginLeft: '5px' }}> {title} </div>
    </div>
  ) : null;
};

export default RequiredLabel;

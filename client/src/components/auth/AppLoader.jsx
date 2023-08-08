import React from 'react';
import loader from '../../assets/carLoader.gif';
import './AppLoader.scss';

const AppLoader = () => (
  <div className="apploader">
    <img src={loader} alt="loader" />
  </div>
);

export default AppLoader;

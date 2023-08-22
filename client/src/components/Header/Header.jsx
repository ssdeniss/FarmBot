import React, { useContext } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import AuthContext from '../../pages/Login';
import Avatar from '../Avatar';

const Header = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/settings');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <img className="header__logo" src={logo} alt="Logo" />
          <div className="header__user-data">
            {user?.id ? (
              <Button type="text" onClick={handleRedirect}>
                {user?.fullname}
              </Button>
            ) : (
              'Oaspete'
            )}
            {user?.avatarUrl ? (
              <Avatar src={user?.avatarUrl} size={40} />
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

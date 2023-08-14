import React, { useContext } from 'react';
import { Button } from 'antd';
import logo from '../../assets/images/logo.png';
import AuthContext from '../../pages/Login';
import { SERVICE_URI, BASE_URI } from '../../services/auth';

const Header = () => {
  const { user } = useContext(AuthContext);
  const handleLogout = () => {
    window.location.href = `${window._env_.API_BACKEND_URL}${SERVICE_URI}${BASE_URI}/logout`;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <img className="header__logo" src={logo} alt="Logo" />
          {/* <div className="header__user">Administrative Acount</div> */}
          {user?.id ? (
            <Button type="text" onClick={handleLogout}>
              {user?.fullname || 'Utilizator'}
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;

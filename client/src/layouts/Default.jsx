import React, { useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../pages/Login';
import Menu from '../components/Menu/Menu';
import Header from '../components/Header/Header';

const Default = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const path = useMemo(() => {
    if (user?.id) {
      if (location.pathname !== '/') {
        return location.pathname;
      }
      return '/home';
    }
    return '/';
  }, [user?.id, location.pathname]);

  useEffect(() => {
    if (user?.id) {
      navigate(path);
    }
    // eslint-disable-next-line
  }, [user?.id]);

  return (
    <>
      <Header />
      {user?.id ? <Menu /> : null}
      <div className="default">
        <div className="default__content">{children}</div>
      </div>
    </>
  );
};

export default Default;

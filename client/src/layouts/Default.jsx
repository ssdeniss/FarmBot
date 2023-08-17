import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import AuthContext from '../pages/Login';
import Menu from '../components/Menu/Menu';
import Header from '../components/Header/Header';

const Default = ({ children }) => {
  const { user } = useContext(AuthContext);
  // const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      // navigate('/home');
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

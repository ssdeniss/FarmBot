import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../pages/Login';

const Default = ({ children }) => {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (user?.id) {
      history.push('/home');
    }
    // eslint-disable-next-line
  }, [user?.id]);

  return <>{children}</>;
};

export default Default;

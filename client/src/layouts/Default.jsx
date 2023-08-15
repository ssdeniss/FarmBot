import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../pages/Login';

const Default = ({ children }) => {
  const { user } = useContext(AuthContext);
  // const history = useHistory();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.id) {
      navigate('/home');
    }
    // eslint-disable-next-line
  }, [user?.id]);

  return <>{children}</>;
};

export default Default;

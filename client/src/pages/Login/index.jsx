import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Navigate } from 'react-router-dom';
import { getCurrentUserDetails } from '../../services/auth';

const AuthContext = React.createContext(null);

export const AuthContextWrapper = ({ children }) => {
  const { i18n } = useTranslation();

  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);

  const locale = localStorage.getItem('locale');

  useMemo(() => i18n.changeLanguage(locale), [i18n, locale]);

  useEffect(() => {
    setLoaded(false);
    getCurrentUserDetails()
      .then((res) => {
        setUser(res);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoaded(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>
      {loaded ? children : null}
    </AuthContext.Provider>
  );
};

const arrayIsEmpty = (array) =>
  // eslint-disable-next-line no-nested-ternary
  Array.isArray(array)
    ? array.length === 0
    : typeof array === 'string'
    ? array.length === 0
    : true;

export const hasPermission = (userPerm, allowedPerm) => {
  if (arrayIsEmpty(allowedPerm)) {
    return true;
  }

  if (arrayIsEmpty(userPerm)) {
    return false;
  }

  const perms = Array.isArray(allowedPerm) ? allowedPerm : [allowedPerm];

  for (let i = 0; i < perms.length; i += 1) {
    if (userPerm.includes(perms[i])) {
      return true;
    }
  }

  return false;
};

export const IsAuthenticated = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? <>{children}</> : <Navigate to="/" />;
};

export const HasPermission = ({ permissions, children }) => {
  if (!Array.isArray(permissions)) {
    throw new Error('Permissions should be an array');
  }

  const { user } = useContext(AuthContext);

  if (!user) {
    return null;
  }

  const allow = hasPermission(user.permissions, permissions);
  return allow ? children : null;
};

export const PrivateRoute = ({
  component: Component,
  permissions,
  ...rest
}) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      // eslint-disable-next-line consistent-return
      render={(props) => {
        if (user) {
          if (hasPermission(user.permissions, permissions)) {
            return <Component {...props} key={props.location.search} />;
          }
          return <Navigate to="/forbidden" />;
        }
        return <Navigate to="/" />;
      }}
    />
  );
};

export default AuthContext;

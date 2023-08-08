import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Redirect } from 'react-router-dom';
import { notification } from 'antd';
import { getCurrentUserDetails } from '../../services/auth';
import { getHeaderDetails } from '../../services/admin/users/users';
import AppLoader from './AppLoader';

const AuthContext = React.createContext(null);

const LEFT_DAYS_ALERT_IN = 5;

export const AuthContextWrapper = ({ children }) => {
  const { i18n } = useTranslation();

  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);

  const locale = localStorage.getItem('locale');

  const checkPasswordValidityDate = (res) => {
    if (!res?.passwordValidityDate) {
      return;
    }

    const passwordValidityDate = new Date(res?.passwordValidityDate);
    const now = new Date();
    const nextWarning = localStorage.getItem('nextPasswordWarningTime')
      ? new Date(localStorage.getItem('nextPasswordWarningTime'))
      : now;

    if (passwordValidityDate.getTime() > now.getTime()) {
      const diffTime = Math.abs(passwordValidityDate - now);
      const diffInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (
        diffInDays <= LEFT_DAYS_ALERT_IN &&
        now.getTime() >= nextWarning.getTime()
      ) {
        notification.warning({
          message: 'Atenție !',
          description: `Parola expiră în ${diffInDays} zile`,
          className: 'password__notification',
          duration: 0,
        });

        // next warning in 24 hours
        now.setHours(now.getHours() + 24);
        localStorage.setItem('nextPasswordWarningTime', now);
      }
    }
  };

  useMemo(() => i18n.changeLanguage(locale), [i18n, locale]);

  useEffect(() => {
    setLoaded(false);
    getCurrentUserDetails()
      .then((res) => {
        checkPasswordValidityDate(res);
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

  useEffect(() => {
    if (user?.id) {
      getHeaderDetails(user.id).then((res) => {
        if (res) {
          setUser({
            ...user,
            currency: res.currency,
            customsPost: res.customsPost,
          });
        }
      });
    }
    // eslint-disable-next-line
  }, [user?.id]);

  const contextValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>
      {loaded ? (
        children
      ) : (
        <>
          {localStorage.getItem('them') === 'true' ? (
            <div className="loaderOverlay active">
              <AppLoader />
            </div>
          ) : (
            <div
              className="loaderOverlay active"
              style={{ background: '#24305a' }}
            >
              <AppLoader />
            </div>
          )}
        </>
      )}
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

export const hasTracks = (usr) => {
  if ('track' in usr) {
    return true;
  }
  return false;
};

export const IsAuthenticated = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? <>{children}</> : <Redirect to="/" />;
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

// export const PrivateRoute = ({
//   component: Component,
//   permissions,
//   ...rest
// }) => {
//   const { user } = useContext(AuthContext);
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         // eslint-disable-next-line no-nested-ternary
//         user ? (
//           hasPermission(user.permissions, permissions) ? (
//             <Component {...props} key={props.location.search} />
//           ) : (
//             <Redirect to={{ pathname: '/forbidden' }} />
//           )
//         ) : (
//           <Redirect to={{ pathname: '/' }} />
//         )
//       }
//     />
//   );
// };

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
          return <Redirect to={{ pathname: '/forbidden' }} />;
        }
        return <Redirect to={{ pathname: '/' }} />;
      }}
    />
  );
};

export default AuthContext;

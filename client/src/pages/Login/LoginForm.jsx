import React, { useMemo, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Input, Alert, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { SERVICE_URI, AUTH_URI } from '../../services/auth';
import AuthContext from '.';

const LoginForm = () => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const isInvalid = useMemo(() => search === '?invalid', [search]);
  const { user } = useContext(AuthContext);

  // const history = useHistory();

  const handleRedirectToHome = () => {
    // history.push('/home');
  };

  return (
    <div className={`login__form ${user?.id ? '' : 'active'}`}>
      <div className="login__form-content">
        <h4 className="login__title">Autentificare</h4>
        <form
          name="log-in"
          id="log-in"
          method="POST"
          action={`${process.env.REACT_APP_API_BACKEND_URL}${SERVICE_URI}${AUTH_URI}`}
        >
          <div className="login__form-inputs">
            <Input
              name="username"
              size="large"
              placeholder="Nume utilizator"
              prefix={<UserOutlined />}
            />

            <Input.Password
              name="password"
              size="large"
              placeholder="Parola"
              prefix={<LockOutlined />}
            />
          </div>

          {isInvalid && (
            <Alert description={t('errors.loginError')} type="error" />
          )}

          <div className="login__buttons">
            <Button block htmlType="submit">
              Autentificare
            </Button>
            <Divider />
            <Button type="default" block onClick={handleRedirectToHome}>
              Oaspete
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

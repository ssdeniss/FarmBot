import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { Button, Input, Space, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import { SERVICE_URI, BASE_URI } from '../../services/auth';

const LoginForm = () => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const isInvalid = useMemo(() => search === '?invalid', [search]);
  // const history = useHistory();

  const handleRedirectToHome = () => {
    // history.push('/home');
  };

  return (
    <div className="login__form">
      <div className="container">
        <h4 className="login__title">Autentificare</h4>

        <form
          name="log-in"
          id="log-in"
          method="POST"
          action={`${process.env.REACT_APP_API_BACKEND_URL}${SERVICE_URI}${BASE_URI}`}
        >
          <Space
            direction="vertical"
            size="large"
            style={{ width: '100%' }}
            className="log__form-content"
          >
            <Input
              name="username"
              size="large"
              placeholder="Nume utilizator"
              prefix={<UserOutlined />}
              // disabled
            />

            <Input.Password
              name="password"
              size="large"
              placeholder="Parola"
              prefix={<LockOutlined />}
              // disabled
            />

            {isInvalid && (
              <Alert description={t('errors.loginError')} type="error" />
            )}

            <div className="login__buttons">
              <Button type="default" onClick={handleRedirectToHome}>
                Oaspete
              </Button>
              <Button type="primary" onClick={handleRedirectToHome}>
                Autentificare
              </Button>
            </div>
          </Space>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

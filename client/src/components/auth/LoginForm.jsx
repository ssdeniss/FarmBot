import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Button, Input, Space, Row, Col, Alert } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
// import { SERVICE_URI, BASE_URI } from '../../services/auth';
const LoginForm = () => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const isInvalid = useMemo(() => search === '?invalid', [search]);
  const history = useHistory();

  const handleRedirectToHome = () => {
    history.push('/home');
  };

  return (
    <>
      <h3
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '1.2rem',
        }}
      >
        Autentificare
      </h3>

      <div className="text-divider">Autentificare ca utilizator</div>

      <form
        name="log-in"
        id="log-in"
        method="POST"
        // action={`${window._env_.API_BACKEND_URL}${SERVICE_URI}${BASE_URI}/local`}
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
            disabled
          />

          <Input.Password
            name="password"
            size="large"
            placeholder="Parola"
            prefix={<UserOutlined />}
            disabled
          />

          {isInvalid && (
            <Alert description={t('errors.loginError')} type="error" />
          )}

          <Row gutter={16}>
            <Col span={24}>
              <Button
                type="primary"
                // block
                // htmlType="submit"
                onClick={handleRedirectToHome}
              >
                Autentificare
              </Button>
            </Col>
          </Row>
        </Space>
      </form>
    </>
  );
};

export default LoginForm;

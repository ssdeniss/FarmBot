import React, { useContext, useEffect, useState } from 'react';
import { Button, Input, Divider, Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import AuthContext from '../Login';
import { BASE_URI, SERVICE_URI } from '../../services/auth';
import Avatar from '../../components/Avatar';

const Settings = () => {
  const { user } = useContext(AuthContext);
  const [form] = useForm();
  const [base64, setBase64] = useState('');

  useEffect(() => {
    if (user?.fullname) {
      form.setFieldsValue({ fullname: user?.fullname });
    }
  }, [user?.fullname, form]);

  const handleLogout = () => {
    window.location.href = `${window._env_.API_BACKEND_URL}${SERVICE_URI}${BASE_URI}/logout`;
  };

  return (
    <div className="settings">
      <div className="settings__content">
        <Avatar removable onUpload={setBase64} base64={base64} size={200} />
        <Form form={form} layout="vertical">
          <Form.Item name="fullname">
            <Input
              size="large"
              placeholder="Nume Utilizator"
              className="settings__user-name"
            />
          </Form.Item>
          <Button type="primary" block>
            Salvează
          </Button>
          <Divider />
          <div className="settings__user-password">
            <Form.Item name="password">
              <Input.Password size="large" placeholder="Parola veche" />
            </Form.Item>
            <Form.Item name="newPassword">
              <Input.Password size="large" placeholder="Parola nouă" />
            </Form.Item>
            <Button type="primary" block>
              Modifică parola
            </Button>
            <Divider />
            <Button onClick={handleLogout} type="default">
              Delogare
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Settings;

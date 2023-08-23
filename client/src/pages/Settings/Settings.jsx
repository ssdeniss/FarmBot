import React, { useContext, useEffect, useState } from 'react';
import { Button, Input, Divider, Form, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import AuthContext from '../Login';
import { BASE_URI, SERVICE_URI } from '../../services/auth';
import Avatar from '../../components/Avatar';
import { changePassword, update } from '../../services/users';
import useFormErrors from '../../hooks/useFormErrors';

const Settings = () => {
  const { user, setUser } = useContext(AuthContext);

  const [errors, setErrors] = useState(null);
  const [base64, setBase64] = useState(undefined);

  const [form] = useForm();
  useFormErrors(form, errors);

  useEffect(() => {
    if (user?.fullname) {
      form.setFieldsValue({ fullname: user?.fullname });
    }
  }, [user?.fullname, form]);

  const handleLogout = () => {
    window.location.href = `${window._env_.API_BACKEND_URL}${SERVICE_URI}${BASE_URI}/logout`;
  };

  const handleSave = () => {
    const name = form.getFieldValue('fullname');
    const avatar = base64 !== undefined;
    const image = {
      content: base64 === 0 ? null : base64,
    };

    update({ name, avatar, image })
      .then((res) => {
        if (res.id !== user.id) {
          handleLogout();
        }
        setUser(res);
        notification.success({ message: 'Datele au fost salvate cu succes' });
      })
      .catch(() =>
        notification.error({ message: 'Erroare la salvarea datelor' }),
      );
  };

  const handleChangePassword = () => {
    const password = form.getFieldValue('password');
    const newPassword = form.getFieldValue('newPassword');

    changePassword({ password, newPassword })
      .then(() => handleLogout())
      .catch((err) => {
        setErrors(err.inner);
        const {
          inner: { _ },
        } = err;
        if (_) {
          notification.error({ message: _ });
        }
      });
  };

  return (
    <div className="settings">
      <div className="settings__content">
        <Avatar
          src={user?.avatarUrl}
          removable
          onUpload={setBase64}
          onClear={() => {
            setUser((prev) => ({ ...prev, avatarUrl: null }));
            setBase64(0);
          }}
          base64={base64}
          size={200}
        />
        <Form className="settings__form" form={form} layout="vertical">
          <Form.Item name="fullname">
            <Input
              size="large"
              placeholder="Nume Utilizator"
              className="settings__user-name"
            />
          </Form.Item>
          <Button type="primary" block onClick={handleSave}>
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
            <Button type="primary" block onClick={handleChangePassword}>
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

import React, { useContext } from 'react';
import { Button, Input, Divider } from 'antd';
import AuthContext from '../Login';
import ImageUploader from '../../components/Uploader/ImageUploader';
import { setAvatar } from '../../services/user';
import { BASE_URI, SERVICE_URI } from '../../services/auth';

const Settings = () => {
  const { user } = useContext(AuthContext);
  console.log(user, 'user');
  const handleSelectImage = (image) => {
    setAvatar(image);
  };
  const handleLogout = () => {
    window.location.href = `${window._env_.API_BACKEND_URL}${SERVICE_URI}${BASE_URI}/logout`;
  };

  return (
    <div className="settings">
      <div className="settings__content">
        <ImageUploader onImageUpload={handleSelectImage} />
        <h5 className="settings__user-name">{user.fullname}</h5>
        <div className="settings__user-password">
          <Input name="password" size="large" placeholder="Parola veche" />
          <Input name="newPassword" size="large" placeholder="Parola nouă" />
          <Button type="primary" block>
            Modifică parola
          </Button>
          <Divider />
          <Button onClick={handleLogout} type="default">
            Delogare
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

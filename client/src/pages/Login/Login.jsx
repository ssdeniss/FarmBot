import React from 'react';
import LoginForm from './LoginForm';
import { FarmBotModel } from '../../components/3DModels/FarmBotModel';

const Login = () => {
  return (
    <div className="login">
      <div className="login__model">
        <FarmBotModel />
      </div>
      <LoginForm />
    </div>
  );
};
export default Login;

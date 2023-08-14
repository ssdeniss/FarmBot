import React from 'react';
import ReactDOM from 'react-dom';
import i18n from 'i18next';
import backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import localeRo from 'antd/es/locale/ro_RO';
import { ConfigProvider } from 'antd';
import App from './App';
import 'antd/dist/reset.css';
// eslint-disable-next-line no-undef
if (process && process.env.NODE_ENV !== 'production') {
  window._env_ = window._env_ || {};

  // eslint-disable-next-line no-undef
  window._env_.API_BACKEND_URL = process.env.REACT_APP_API_BACKEND_URL;
  window._env_.VERSION = process.env.REACT_APP_VERSION;
}

i18n
  .use(backend)
  .use(initReactI18next)
  .init({
    lng: 'ro',
    fallbackLng: 'ro',
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
    react: {
      useSuspense: false,
    },
  });

ReactDOM.render(
  <ConfigProvider locale={localeRo}>
    <App />
  </ConfigProvider>,

  document.getElementById('root'),
);

import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContextWrapper } from './pages/Login';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Default from './layouts/Default';
import Menu from './components/Menu/Menu';
import Library from './pages/Library/Library';
import Calendar from './pages/Calendar/Calendar';
import NotFound from './pages/NotFound/NotFound';
import Settings from './pages/Settings/Settings';
import './styles/styles.scss';

require('dotenv').config();

const App = () => (
  <AuthContextWrapper>
    <BrowserRouter>
      <Default>
        <Header />
        <Menu />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/library" element={<Library />} />
          <Route exact path="/calendar" element={<Calendar />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/notFound" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/NotFound" replace />} />
          <Route
            path="/home"
            // element={<PrivateRoute path="/home" component={Home} />}
            exact
            element={<Home />}
          />
        </Routes>
      </Default>
    </BrowserRouter>
  </AuthContextWrapper>
);

export default App;

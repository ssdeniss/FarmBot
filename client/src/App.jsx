import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContextWrapper } from './pages/Login';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Default from './layouts/Default';
import Library from './pages/Library/Library';
import Calendar from './pages/Calendar/Calendar';
import NotFound from './pages/NotFound/NotFound';
import Settings from './pages/Settings/Settings';
import './styles/styles.scss';
import Administration from './components/Administration/Administration';

require('dotenv').config();

const App = () => (
  <AuthContextWrapper>
    <BrowserRouter>
      <Default>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/library" element={<Library />} />
          <Route exact path="/calendar" element={<Calendar />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/administration" element={<Administration />} />
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

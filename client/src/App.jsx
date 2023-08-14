import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import './styles/styles.scss';
import Header from './components/Header/Header';
import { AuthContextWrapper, PrivateRoute } from './pages/Login';
import Default from './layouts/Default';

require('dotenv').config();

const App = () => (
  <AuthContextWrapper>
    <BrowserRouter>
      <Default>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/home" component={Home} />
        </Switch>
      </Default>
    </BrowserRouter>
  </AuthContextWrapper>
);

export default App;

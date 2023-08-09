import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import './styles/styles.scss';
import Header from './components/Header/Header';

require('dotenv').config();

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/home" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default App;

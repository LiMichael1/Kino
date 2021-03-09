import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Kino from './components/kino/Kino';
import User from './components/pages/User';
import Alerts from './components/layout/Alerts';
import LoadUser from './components/layout/LoadUser';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import KinoState from './context/kino/KinoState';

import './App.css';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <LoadUser>
            <Navbar />
            <Alerts />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/u/:username' component={User} />

              <KinoState>
                <Route exact path='/m/:movie' component={Kino} />
              </KinoState>
            </Switch>
          </LoadUser>
        </Router>
      </AlertState>
    </AuthState>
  );
};

export default App;

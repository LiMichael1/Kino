import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Kino from './components/kino/Kino';
import User from './components/pages/User';
import Alerts from './components/layout/Alerts';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

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
          <Fragment>
            <Navbar />
            <Alerts />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/m/:movie' component={Kino} />
              <Route exact path='/u/:username' component={User} />
            </Switch>
            {/* <Footer /> */}
          </Fragment>
        </Router>
      </AlertState>
    </AuthState>
  );
};

export default App;

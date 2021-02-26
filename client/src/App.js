import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import AuthState from './context/auth/AuthState';

import './App.css';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </AuthState>
  );
};

export default App;

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = false;

  const authLinks = (
    <Fragment>
      <a>Logged In</a>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/Register' className='links'>
          Register
        </Link>
      </li>
      <li>
        <Link to='/Login' className='links'>
          Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar'>
      <h1 className='logo-text'>
        <Link to='/'>Kino</Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

export default Navbar;

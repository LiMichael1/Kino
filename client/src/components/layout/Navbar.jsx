import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const username = user && user.username;

  const authLinks = (
    <Fragment>
      <li>
        <Link to={`/u/${username}`} className='links'>
          {username}
        </Link>
      </li>
      <li>
        <a onClick={logout} href='/' className='links'>
          Logout
        </a>
      </li>
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
      <SearchBar />
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

export default Navbar;

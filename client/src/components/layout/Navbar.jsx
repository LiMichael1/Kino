import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user, loading } = authContext;

  const username = user && user.username;

  const authLinks = (
    <Fragment>
      <li>
        <a href={`/u/${username}`} className='links'>
          {username}
        </a>
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

  const loadingLinks = (
    <Fragment>
      <li>
        <Link to='/' className='links'>
          <i className='fas fa-spinner'></i>
        </Link>
      </li>
      <li>
        <Link to='/' className='links'>
          <i className='fas fa-spinner'></i>
        </Link>
      </li>
    </Fragment>
  );

  return (
    <div className='nav navbar'>
      <h1>
        <a href='/' class='logo_text'>
          Kino
        </a>
      </h1>
      <SearchBar />
      {!loading ? (
        <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
      ) : (
        loadingLinks
      )}
    </div>
  );
};

export default Navbar;

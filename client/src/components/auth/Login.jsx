import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  const authContext = useContext(AuthContext);

  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) props.history.push('/');
  }, [isAuthenticated]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      // Alert: One of the fields is Empty
    } else {
      // Login User
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account Login
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
            />
          </div>

          <input type='submit' value='Login' />
        </form>
      </h1>
    </div>
  );
};

export default Login;

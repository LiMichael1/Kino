import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const authContext = useContext(AuthContext);

  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated]);

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { username, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (username === '' || email === '' || password === '') {
      // Alert: One of the field is Empty
    } else if (password !== password2) {
      // Alert: Passwords don't match
    } else {
      // Register
      register({
        username,
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>Account Register</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>UserName</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={onChange}
            required
          />
        </div>

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
            minLength='6'
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            minLength='6'
            required
          />
        </div>

        <input type='submit' value='Register' />
      </form>
    </div>
  );
};

export default Register;

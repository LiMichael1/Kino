import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) props.history.push('/');

    if (error === 'Invalid Credientials') {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [isAuthenticated, error, clearErrors, props.history]);

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
      setAlert('Please fill in all fields', 'danger');
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
      <div className='card'>
        <div className='card-header'>Login</div>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='email' className='col-form-label text-md-right'>
                Email Address
              </label>
              <input
                type='email'
                name='email'
                className='form-control'
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <label
                htmlFor='password'
                className='col-form-label text-md-right'
              >
                Password
              </label>
              <input
                type='password'
                name='password'
                className='form-control'
                value={password}
                onChange={onChange}
                required
              />
            </div>

            <div className='form-group'>
              <input
                type='submit'
                value='Login'
                className='btn btn-primary d-block form-button'
              />

              <a href='/register' className='btn btn-link text-md-left'>
                Don't have an account?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

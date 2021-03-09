import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { register, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [isAuthenticated, error, clearErrors, setAlert, props.history]);

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
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      // Alert: Passwords don't match
      setAlert('Please enter all fields', 'danger');
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
      <div className='card'>
        <div className='card-header'>Register</div>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='username'>UserName</label>
              <input
                type='text'
                name='username'
                className='form-control'
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
                className='form-control'
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
                className='form-control'
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
                className='form-control'
                value={password2}
                onChange={onChange}
                minLength='6'
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='submit'
                value='Register'
                className='btn btn-primary d-block form-button'
              />

              <a href='/login' className='btn btn-link text-md-left'>
                Already have an account?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

import * as API from '../../api';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  // Reducer = State Manager
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Default Load User when already Logged In
  const loadUser = async () => {
    if (localStorage.token) setAuthToken(localStorage.token);

    try {
      const { data } = await API.loadUser();

      dispatch({ type: USER_LOADED, payload: data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register a User
  const register = async (formData) => {
    try {
      const { data } = await API.register(formData);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    try {
      const { data } = await API.login(formData);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

import React from 'react';
import alertReducer from './alertReducer';
import AlertContext from './alertContext';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg, type, timeout= 5000) => {
    
  }
  return <div></div>;
};

export default AlertState;

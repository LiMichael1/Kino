import React, { Fragment, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const LoadUser = (props) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  }, []);

  return <Fragment>{props.children}</Fragment>;
};

export default LoadUser;

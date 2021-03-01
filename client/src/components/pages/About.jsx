import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const About = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  }, []);

  return (
    <div>
      <h1>About Page</h1>
    </div>
  );
};

export default About;

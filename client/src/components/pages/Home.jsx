import React, { useEffect, useContext } from 'react';
import Kinos from '../kino/Kinos';
import Reviews from '../review/Reviews';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  }, []);

  return (
    <div>
      <Kinos />
      <Reviews />
    </div>
  );
};

export default Home;

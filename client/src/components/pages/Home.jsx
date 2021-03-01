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
    <div class='text-white'>
      <Kinos />
      <h1 class='m-5 cursive-glow-txt'>Recent Reviews</h1>
      <Reviews />
    </div>
  );
};

export default Home;

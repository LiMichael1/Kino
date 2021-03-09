import React from 'react';
import Kinos from '../kino/Kinos';
import Reviews from '../review/Reviews';

const Home = () => {
  return (
    <div className='text-white'>
      <Kinos />
      <h1 className='m-5 cursive-glow-txt'>Recent Reviews</h1>
      <Reviews />
    </div>
  );
};

export default Home;

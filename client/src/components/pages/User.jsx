import React from 'react';

import Reviews from '../review/Reviews';

const User = ({ match }) => {
  const username = match.params.username;

  return (
    <div class='text-white'>
      <h1 class='cursive-glow-txt m-3'>{username}</h1>
      <Reviews userReviews={username} />
    </div>
  );
};

export default User;

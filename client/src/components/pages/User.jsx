import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

import Reviews from '../review/Reviews';
import Spinner from '../layout/Spinner';

const User = ({ match }) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  }, []);

  const [loading, setLoading] = useState(false);
  const [userReviews, setUserReviews] = useState([]);

  const username = match.params.username;

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);

      const res = await fetch(`/api/reviews/u/${username}`);
      const data = await res.json();

      setUserReviews(data);
      setLoading(false);
    };

    fetchReviews();
  }, []);

  return (
    <div class='text-white'>
      <h1 class='cursive-glow-txt m-3'>{username}</h1>
      {!loading && userReviews ? <Reviews review={userReviews} /> : <Spinner />}
    </div>
  );
};

export default User;

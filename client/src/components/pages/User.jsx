import React, { useState, useEffect } from 'react';

import Reviews from '../review/Reviews';
import Spinner from '../layout/Spinner';

const User = ({ match }) => {
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
    <div>
      <h1>{username}</h1>
      {!loading && userReviews ? <Reviews review={userReviews} /> : <Spinner />}
    </div>
  );
};

export default User;

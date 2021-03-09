import React, { useState, useEffect, useContext, Fragment } from 'react';
import ReviewItem from './ReviewItem';
import Spinner from '../layout/Spinner';
import AuthContext from '../../context/auth/authContext';

import * as API from '../../api';

const Reviews = ({ movieId, needPic, userReviews }) => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const authContext = useContext(AuthContext);

  const { isAuthenticated, user } = authContext;

  // API FETCH
  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);

      let data;

      if (movieId) {
        const res = await API.getMovieReviews(movieId);
        if (isAuthenticated) {
          const username = user && user.username;
          data = res.data;

          data = data.filter((review) => review.username !== username);
        } else {
          data = res.data;
        }
      } else if (userReviews) {
        const res = await API.getUserReviews(userReviews);
        data = res.data;
      } else {
        const res = await API.getRecentReviews();
        data = res.data;
      }

      setReviews(data);
      setLoading(false);
    };

    fetchAPI();
  }, [user]);

  return (
    <Fragment>
      {!loading && reviews.length > 0 ? (
        <div className='container px-5'>
          {reviews.map((review) => (
            <ReviewItem review={review} key={review._id} needPic={needPic} />
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Reviews;

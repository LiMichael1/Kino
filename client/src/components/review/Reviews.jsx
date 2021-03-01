import React, { useState, useEffect, useContext, Fragment } from 'react';
import ReviewItem from './ReviewItem';
import Spinner from '../layout/Spinner';
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';

const Reviews = ({ movieId, needPic }) => {
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
        const res = await axios.get(`/api/reviews/m/${movieId}`);
        if (isAuthenticated) {
          const username = user && user.username;
          const temp = res.data;
          data = [];

          temp.forEach((userReview) => {
            if (userReview.username !== username) data.push(userReview);
          });
        } else {
          data = res.data;
        }
      } else if (user) {
        const res = await fetch(`/api/reviews/u/${user}`);
        data = res.json();
      } else {
        const res = await fetch(`/api/reviews`);
        data = await res.json();
      }

      setReviews(data);
      setLoading(false);
    };

    fetchAPI();
  }, []);

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

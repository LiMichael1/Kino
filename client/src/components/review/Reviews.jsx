import React, { useState, useEffect, Fragment } from 'react';
import ReviewItem from './ReviewItem';
import Spinner from '../layout/Spinner';

import * as API from '../../api';

const Reviews = ({ kino, needPic, userReviews }) => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  // API FETCH
  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);

      let data;

      if (kino) {
        data = kino;
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
  }, [kino, userReviews]);

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

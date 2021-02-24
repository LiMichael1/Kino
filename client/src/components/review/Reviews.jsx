import React, { useState, useEffect } from 'react';
import ReviewItem from './ReviewItem';
import Spinner from '../layout/Spinner';

const Reviews = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  // API FETCH
  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);

      const res = await fetch('/api/reviews');
      const data = await res.json();

      setReviews(data);
      setLoading(false);
    };

    fetchAPI();
  }, []);

  return (
    <div>
      {!loading ? (
        <div>
          {reviews.map((review) => (
            <ReviewItem review={review} key={review._id} />
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Reviews;

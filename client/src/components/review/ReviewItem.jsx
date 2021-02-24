import React from 'react';

const ReviewItem = ({
  review: { date, likes, movieId, rating, text_body, text_header, user },
}) => {
  return (
    <div>
      <h1>{text_header}</h1>
      <h2>{text_body}</h2>
      <h3>{rating}</h3>
      <h4>{date}</h4>
      <h5>{likes}</h5>
    </div>
  );
};

export default ReviewItem;

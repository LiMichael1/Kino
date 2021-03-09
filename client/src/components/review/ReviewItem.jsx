import React from 'react';
import { Link } from 'react-router-dom';

const url = 'https://image.tmdb.org/t/p/w500/';

const ReviewItem = ({
  review: {
    date,
    likes,
    movieId,
    movie_name,
    poster_path,
    rating,
    text_body,
    text_header,
    user,
    username,
  },
  needPic,
}) => {
  return (
    <div className='row review text-white'>
      {!needPic ? (
        <div className='col-4 review-header'>
          <img
            src={url + poster_path}
            alt={movie_name}
            className='review-img'
          />
          <p>
            <Link to={`/m/${movieId}`}>{movie_name}</Link>
          </p>
        </div>
      ) : (
        ''
      )}

      <div className='col-8 review-info'>
        <h3>{text_header}</h3>
        <p>
          User:{'   '}
          <Link className='cursive-glow-txt' to={`../u/${username}`}>
            {username}
          </Link>
        </p>
        <p>
          <i className='fas fa-star text-warning'></i>
          {' ' + rating}
        </p>
        <p>{text_body}</p>
      </div>
    </div>
  );
};

export default ReviewItem;

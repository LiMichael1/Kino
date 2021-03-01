import React from 'react';

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
  console.log(needPic);

  return (
    <div class='row review text-white'>
      {!needPic ? (
        <div class='col-4 review-header'>
          <img src={url + poster_path} alt={movie_name} class='review-img' />
          <p>
            <a href={`/m/${movieId}`}>{movie_name}</a>
          </p>
        </div>
      ) : (
        ''
      )}

      <div class='col-8 review-info'>
        <h3>{text_header}</h3>
        <p>
          User:{'   '}
          <a class='cursive-glow-txt' href={`u/${username}`}>
            {username}
          </a>
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

import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import KinoContext from '../../context/kino/kinoContext';
import Reviews from '../review/Reviews';
import ReviewItem from '../review/ReviewItem';
import Spinner from '../layout/Spinner';

const Kino = ({ match }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user } = authContext;

  const kinoContext = useContext(KinoContext);
  const {
    kino,
    userReview,
    kinoRating,
    kinoReviews,
    loading,
    userHasReview,
    userReviewLoading,
    getMovieInfo,
    submitReview,
  } = kinoContext;

  const { title, release_date, poster_path, overview, runtime } = kino;

  useEffect(() => {
    getMovieInfo(parseInt(match.params.movie), isAuthenticated, user);
  }, [match.params.movie, user]);

  const [review, setReview] = useState({
    rating: 0,
    review_title: '',
    review_body: '',
  });

  const { rating, review_title, review_body } = review;

  const onChange = (e) =>
    setReview({ ...review, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    submitReview({
      movie_name: title,
      movieId: parseInt(match.params.movie),
      poster_path: poster_path,
      rating: parseInt(rating),
      text_header: review_title,
      text_body: review_body,
    });
  };

  return (
    <div className='container'>
      {!loading ? (
        <div className='text-white row mt-3 align-items-center'>
          <div className='w-50 text-align-center'>
            <img
              src={
                poster_path && `https://image.tmdb.org/t/p/w500/` + poster_path
              }
              alt={title}
              className='big-image'
            />
          </div>
          <div className='w-50 text-align-start'>
            <h2 className='cursive-glow-txt mb-3'>{title}</h2>
            <p>Release Date: {release_date}</p>
            <p>Running Time: {runtime} mins</p>
            <p>
              <i className='fas fa-star text-warning'></i>{' '}
              {kinoRating ? kinoRating.toFixed(2) : 0}
            </p>
            <p>{overview}</p>
          </div>
        </div>
      ) : (
        <Spinner />
      )}

      {isAuthenticated && !userHasReview && !userReviewLoading ? (
        <div className='form-container text-white'>
          <form onSubmit={onSubmit}>
            <div className='form-group w-25'>
              <label htmlFor='rating'>Rating: </label>
              <input
                type='number'
                name='rating'
                className='form-control'
                value={rating}
                onChange={onChange}
                min='0'
                max='10'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='review_title'>Title</label>
              <input
                type='text'
                name='review_title'
                className='form-control'
                value={review_title}
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <textarea
                name='review_body'
                value={review_body}
                className='form-control'
                onChange={onChange}
                cols='30'
                rows='10'
                required
              ></textarea>
            </div>

            <input type='submit' value='submit' className='btn btn-primary' />
          </form>
        </div>
      ) : (
        ''
      )}

      <div className='container px-5'>
        {isAuthenticated && userHasReview ? (
          <ReviewItem review={userReview} needPic={true} />
        ) : (
          ''
        )}
        <Reviews kino={kinoReviews} needPic={true} />
      </div>
    </div>
  );
};

export default Kino;

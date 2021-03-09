import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import Reviews from '../review/Reviews';
import ReviewItem from '../review/ReviewItem';
import Spinner from '../layout/Spinner';

import * as API from '../../api';

const Kino = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [kino, setKino] = useState({});
  const [userReview, setUserReview] = useState({});
  const [userHasReview, setUserHasReview] = useState(false);
  const [userReviewLoading, setUserReviewLoading] = useState(false);
  const [kinoRating, setKinoRating] = useState(0);

  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  const { title, release_date, poster_path, overview, runtime } = kino;

  useEffect(() => {
    // api request for individual movie
    const fetchMovieInfo = async () => {
      setLoading(true);

      const res = await API.getMovieInfo(match.params.movie);
      const data = await res.json();

      setKino(data);

      setLoading(false);
    };

    fetchMovieInfo();
  }, []);

  useEffect(() => {
    const fetchUserReview = async () => {
      setUserReviewLoading(true);
      try {
        if (isAuthenticated) {
          const response = await API.getUserMovieReview(match.params.movie);
          if (response.status === 200) {
            const review = response.data;

            setUserReview(review);
            setUserHasReview(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
      setUserReviewLoading(false);
    };

    fetchUserReview();
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchKinoRating = async () => {
      const {
        data: { rating },
      } = await API.getKinoRating(match.params.movie);

      setKinoRating(rating);
    };
    fetchKinoRating();
  });

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

  const submitReview = async (formData) => {
    try {
      const { data } = await API.submitReview(formData);

      setUserReview(data);
      setUserHasReview(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class='container'>
      {!loading ? (
        <div className='text-white row mt-3 align-items-center'>
          <div className='col-5 text-align-center'>
            <img
              src={`https://image.tmdb.org/t/p/w500/` + poster_path}
              alt={title}
              class='big-image'
              srcset=''
            />
          </div>
          <div className='col-5 text-align-start'>
            <h2 class='cursive-glow-txt mb-3'>{title}</h2>
            <p>Release Date: {release_date}</p>
            <p>Running Time: {runtime} mins</p>
            <p>
              <i className='fas fa-star text-warning'></i>{' '}
              {kinoRating.toFixed(2)}
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
            <div className='form-group'>
              <label htmlFor='rating'>Rating: </label>
              <input
                type='number'
                name='rating'
                class='form-control'
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
                class='form-control'
                value={review_title}
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <textarea
                name='review_body'
                value={review_body}
                class='form-control'
                onChange={onChange}
                cols='30'
                rows='10'
                required
              ></textarea>
            </div>

            <input type='submit' value='submit' class='btn btn-primary' />
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
        <Reviews movieId={match.params.movie} needPic={true} />
      </div>
    </div>
  );
};

export default Kino;

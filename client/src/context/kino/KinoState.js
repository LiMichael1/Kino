import React, { useReducer } from 'react';
import KinoContext from './kinoContext';
import kinoReducer from './kinoReducer';

import * as API from '../../api';
import {
  KINO,
  REVIEW,
  NO_REVIEW,
  RATING,
  NO_RATING,
  LOADING,
  KINO_REVIEWS,
  NO_KINO_REVIEWS,
  REVIEW_LOADING,
  REVIEW_DONE_LOADING,
  SUBMIT_REVIEW_SUCCESS,
} from '../types';

const KinoState = (props) => {
  const initialState = {
    kino: {},
    userReview: {},
    kinoReviews: [],
    kinoRating: 0,
    loading: false,
    userHasReview: false,
    userReviewLoading: false,
  };

  const [state, dispatch] = useReducer(kinoReducer, initialState);

  const getMovieInfo = async (movieId, isAuthenticated, user) => {
    dispatch({ type: LOADING });
    try {
      const res = await API.getMovieInfo(movieId);
      const data = await res.json();

      dispatch({ type: KINO, payload: data });
    } catch (error) {
      console.log(error);
    }
    getKinoRating(movieId);
    getUserReview(movieId, isAuthenticated);
    getMovieReviews(movieId, isAuthenticated, user);
  };

  const getMovieReviews = async (movieId, isAuthenticated, user) => {
    try {
      let { data } = await API.getMovieReviews(movieId);
      if (isAuthenticated) {
        const username = user && user.username;
        data = data.filter((review) => review.username !== username);
      }

      dispatch({ type: KINO_REVIEWS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: NO_KINO_REVIEWS });
    }
  };

  const getUserReview = async (movieId, isAuthenticated) => {
    dispatch({ type: REVIEW_LOADING });
    try {
      if (isAuthenticated) {
        const res = await API.getUserMovieReview(movieId);
        if (res.status === 200) {
          const review = res.data;

          dispatch({ type: REVIEW, payload: review });
        } else {
          dispatch({ type: NO_REVIEW });
        }
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: NO_REVIEW });
    }
    dispatch({ type: REVIEW_DONE_LOADING });
  };

  const getKinoRating = async (movieId) => {
    try {
      const {
        data: { rating },
      } = await API.getKinoRating(movieId);

      dispatch({ type: RATING, payload: rating });
    } catch (error) {
      console.log(error);
      dispatch({ type: NO_RATING });
    }
  };

  const submitReview = async (formData) => {
    try {
      const { data } = await API.submitReview(formData);

      dispatch({ type: SUBMIT_REVIEW_SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KinoContext.Provider
      value={{
        kino: state.kino,
        userReview: state.userReview,
        kinoRating: state.kinoRating,
        kinoReviews: state.kinoReviews,
        loading: state.loading,
        userHasReview: state.userHasReview,
        userReviewLoading: state.userReviewLoading,
        getMovieInfo,
        getKinoRating,
        getUserReview,
        submitReview,
      }}
    >
      {props.children}
    </KinoContext.Provider>
  );
};

export default KinoState;

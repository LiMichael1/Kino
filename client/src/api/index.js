import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const loadUser = () =>
  axios.get(`${process.env.REACT_APP_BACKEND}/api/auth`);

export const login = (formData) =>
  axios.post(`${process.env.REACT_APP_BACKEND}/api/auth`, formData);
export const register = (formData) =>
  axios.post(`${process.env.REACT_APP_BACKEND}/api/users`, formData);

export const searchMovie = async (movie) =>
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=${process.env.REACT_APP_API_KEY}`
  );

export const getPopularMovies = () =>
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
  );

export const getMovieInfo = async (movieId) =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`
  );

// Reviews
export const getUserMovieReview = (movieId) =>
  axios.get(`${process.env.REACT_APP_BACKEND}/api/reviews/mu/${movieId}`);

export const getMovieReviews = (movieId) =>
  axios.get(`${process.env.REACT_APP_BACKEND}/api/reviews/m/${movieId}`);

export const getUserReviews = (user) =>
  axios.get(`${process.env.REACT_APP_BACKEND}/api/reviews/u/${user}`);

export const getRecentReviews = () =>
  axios.get(`${process.env.REACT_APP_BACKEND}/api/reviews`);

export const submitReview = (formData) =>
  axios.post(`${process.env.REACT_APP_BACKEND}/api/reviews`, formData, config);

export const getKinoRating = (movieId) =>
  axios.get(`${process.env.REACT_APP_BACKEND}/api/kinos/${movieId}`);

import axios from 'axios';

export const loadUser = () => axios.get('/api/auth');
export const login = (formData) => axios.post('/api/auth', formData);
export const register = (formData) => axios.post('/api/users', formData);

export const searchMovie = async (movie) =>
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=e303bacd98bdfe6244014f8c8f687ec9`
  );

export const getPopularMovies = () =>
  fetch(
    'https://api.themoviedb.org/3/movie/popular?api_key=e303bacd98bdfe6244014f8c8f687ec9'
  );

export const getMovieInfo = async (movieId) =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=e303bacd98bdfe6244014f8c8f687ec9`
  );

// Reviews
export const getUserMovieReview = (movieId) =>
  axios.get(`/api/reviews/mu/${movieId}`);

export const getMovieReviews = (movieId) =>
  axios.get(`/api/reviews/m/${movieId}`);

export const getUserReviews = (user) => axios.get(`/api/reviews/u/${user}`);

export const getRecentReviews = () => axios.get('/api/reviews');

export const submitReview = (formData) => axios.post('/api/reviews', formData);

export const getKinoRating = (movieId) => axios.get(`/api/kinos/${movieId}`);

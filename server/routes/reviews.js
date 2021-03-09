const express = require('express');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const {
  postReview,
  getReviews,
  getPopularReviews,
  getOneReview,
  deleteReview,
  upvoteReview,
  getMovieReviews,
  getUserMovieReview,
  getUserReviews,
} = require('../controller/reviews');

const router = express.Router();

// @route     POST api/reviews
// @desc      Post a Review
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('movie_name', 'Movie Required').not().isEmpty(),
      check('movieId', 'Movie required').not().isEmpty(),
      check('poster_path', 'No Poster').not().isEmpty(),
      check('rating', 'Rating is required').not().isEmpty(),
      check('text_header', 'Please put a review header').not().isEmpty(),
      check('text_body', 'Review body is empty').not().isEmpty(),
    ],
  ],
  postReview
);

// @route     GET api/reviews
// @desc      Get Recent Reviews
// @access    Public
router.get('/', getReviews);

// @route     GET api/reviews/popular
// @desc      Get Popuar Reviews
// @access    Public
router.get('/popular', getPopularReviews);

// @route     GET api/reviews/r/:id
// @desc      Get a review
// @access    Public
router.get('/r/:id', getOneReview);

// @route     DELETE api/reviews/r/:id
// @desc      DELETE a review
// @access    Private
router.delete('/r/:id', auth, deleteReview);

// @route     POST api/reviews/r/:id
// @desc      Upvote a Review
// @access    Private
router.post('/r/:id', auth, upvoteReview);

// @route     Get api/reviews/m/:movieId
// @desc      Get a list of reviews from a movie
// @access    Public
router.get('/m/:movieId', getMovieReviews);

// @route     Get api/reviews/mu/:movieId
// @desc      Get single review from user
// @access    Private
router.get('/mu/:movieId', [auth], getUserMovieReview);

// @route     Get api/reviews/u
// @desc      Get all reviews from user
// @access    Public
router.get('/u/:username', getUserReviews);

// export router
module.exports = router;

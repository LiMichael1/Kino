const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Review = require('../models/Review');
const Kino = require('../models/Kino');
const User = require('../models/User');

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
      check('date', 'No Date?').not().isEmpty(),
      check('rating', 'Rating is required').not().isEmpty(),
      check('text_header', 'Please put a review header').not().isEmpty(),
      check('text_body', 'Review body is empty').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      movie_name,
      movieId,
      poster_path,
      date,
      rating,
      text_header,
      text_body,
    } = req.body;
    try {
      let findKino = await Kino.findOne({ movieId }).lean();

      if (!findKino) {
        // INSERT A NEW MOVIE TO BE RATED
        const newKino = new Kino({
          movieId: movieId,
          rating: rating,
          numOfReviews: 1,
        });

        const kino = await newKino.save();
      } else {
        // UPDATE AVERAGE RATING FOR A PARTICULAR MOVIE
        let totalScore = rating + findKino.rating * findKino.numOfReviews;
        findKino.rating = totalScore / (findKino.numOfReviews + 1);

        let updateKino = await Kino.findOneAndUpdate(
          { movieId: movieId },
          {
            $set: {
              rating: findKino.rating,
              numOfReviews: findKino.numOfReviews + 1,
            },
          },

          (err, doc) => {
            if (err) throw err;
          }
        );
      }

      // FIND USERNAME
      let findUser = await User.findOne({ _id: req.user.id }, 'username', {
        lean: true,
      });

      const newReview = new Review({
        user: req.user.id,
        username: findUser.username,
        movie_name,
        movieId,
        poster_path,
        date,
        rating,
        text_header,
        text_body,
      });

      const review = await newReview.save();

      res.status(201).json(review);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @route     GET api/reviews
// @desc      Get Recent Reviews
// @access    Public
router.get('/', async (req, res) => {
  try {
    let recentReviews = await Review.find().sort({ date: -1 }).limit(10).lean();

    res.json(recentReviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route     GET api/reviews/popular
// @desc      Get Popuar Reviews
// @access    Public
router.get('/popular', async (req, res) => {
  try {
    let recentReviews = await Review.find()
      .sort({ likes: -1 })
      .limit(10)
      .lean();

    res.json(recentReviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route     GET api/reviews/r/:id
// @desc      Get a review
// @access    Public
router.get('/r/:id', async (req, res) => {
  try {
    let review = await Review.findById(req.params.id).lean();

    res.json(review);
  } catch (err) {
    console.error(res.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route     DELETE api/reviews/r/:id
// @desc      DELETE a review
// @access    Private
router.delete('/r/:id', auth, async (req, res) => {
  try {
    await Review.findById(req.params.id).remove();

    res.status(200).json({ msg: 'Successfully Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route     POST api/reviews/r/:id
// @desc      Upvote a Review
// @access    Private
router.post('/r/:id', auth, async (req, res) => {
  try {
    let review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { likes: 1 },
      },
      function (err, doc) {
        if (err) throw err;
      }
    );

    res.status(201).json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route     Get api/reviews/m/:movie
// @desc      Get a list of reviews from a movie
// @access    Public
router.get('/m/:id', async (req, res) => {
  try {
    let reviews = await Review.find({ movieId: req.params.id }).lean();

    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// export router
module.exports = router;

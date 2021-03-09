const { validationResult } = require('express-validator');

const Review = require('../models/Review');
const Kino = require('../models/Kino');
const User = require('../models/User');

const postReview = async (req, res) => {
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
    let findReview = await Review.findOne({
      movieId: movieId,
      user: req.user.id,
    });

    if (findReview) {
      res.status(409).json({ error: 'User already has review of this movie' });
      return;
    }

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
};

const getReviews = async (req, res) => {
  try {
    let recentReviews = await Review.find().sort({ date: -1 }).limit(10).lean();

    res.json(recentReviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getPopularReviews = async (req, res) => {
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
};

const getOneReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id).lean();

    res.json(review);
  } catch (err) {
    console.error(res.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const deleteReview = async (req, res) => {
  try {
    await Review.findById(req.params.id).remove();

    res.status(200).json({ msg: 'Successfully Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const upvoteReview = async (req, res) => {
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
};

const getMovieReviews = async (req, res) => {
  try {
    let reviews = await Review.find({ movieId: req.params.movieId }).lean();

    res.status(200).json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getUserMovieReview = async (req, res) => {
  try {
    let userReview = await Review.findOne({
      movieId: req.params.movieId,
      user: req.user.id,
    });

    if (userReview) {
      res.status(200).json(userReview);
    } else {
      res.status(404).json({ msg: 'Review not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getUserReviews = async (req, res) => {
  try {
    let userReviews = await Review.find({ username: req.params.username });

    if (userReviews) {
      res.status(200).json(userReviews);
    } else {
      res.status(404).json({ msg: 'No User Reviews' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  postReview,
  getReviews,
  getPopularReviews,
  getOneReview,
  deleteReview,
  upvoteReview,
  getMovieReviews,
  getUserMovieReview,
  getUserReviews,
};

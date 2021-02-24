/* SUBJECT TO CHANGE */

const mongoose = require('mongoose');

const RatingSchema = mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'kinos',
      required: true,
    },
    avgRating: {
      type: Number,
      required: true,
    },
    numOfReviews: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

module.exports = mongoose.model('rating', RatingSchema);

const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    // NEW
    username: {
      type: String,
      required: true,
    },
    // NEW
    movie_name: {
      type: String,
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    // NEW
    poster_path: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    rating: {
      type: Number,
      required: true,
    },
    text_header: {
      type: String,
      required: true,
    },
    text_body: {
      type: String,
      required: true,
    },

    likes: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('review', ReviewSchema);

// TV and Movies Database Schema
const mongoose = require('mongoose');

const KinoSchema = mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true,
      unique: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('kino', KinoSchema);

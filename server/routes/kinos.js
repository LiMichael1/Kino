const express = require('express');

const { getMovie } = require('../controller/kinos');

const router = express.Router();

// @route       GET api/kino/:movieId
// @desc        Get Average Rating & Number of Reviews of a Movie
// @access      Public
router.get('/:id', getMovie);

module.exports = router;

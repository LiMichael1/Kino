const express = require('express');
const { check } = require('express-validator');
const { register } = require('../controller/users');

const router = express.Router();

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post(
  '/',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please Enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  register
);

// export router
module.exports = router;

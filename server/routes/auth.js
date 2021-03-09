const express = require('express');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const { login, authenticate } = require('../controller/auth');

const router = express.Router();

// @route     GET api/auth
// @desc      Get Logged In User
// @access    Private
router.get('/', auth, login);

// @route     POST api/auth
// @desc      Authenticate User & Get an Auth Token
// @access    Public
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authenticate
);

module.exports = router;

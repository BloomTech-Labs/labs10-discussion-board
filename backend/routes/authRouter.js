/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const usersDB = require('../db/models/usersDB.js');
// const bcrypt = require('bcryptjs');
const router = express.Router();
// const jwt = require('jsonwebtoken');

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
function generateToken(id, username, isAdmin) {
  const payload = {
    id: id,
    username: username,
    is_admin: isAdmin
  };

  const secret =
    process.env.JWT_SECRET ||
    'Should configure local .env file for secretString'; // hard coding this in the code is bad practice

  const options = {
    expiresIn: '24h' // 60 seconds... otherValues(20, '2 days', '10h', '7d'), a number represents seconds (not milliseconds)
  };

  return jwt.sign(payload, secret, options);
}

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/
// Gets a list of users with just the user id and display name
router.post('/register', async (req, res, next) => {
  try {
    res.status(200).json(['Success']);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    res.status(200).json(['Success']);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

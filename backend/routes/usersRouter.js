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
// None

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/

// Gets a list of users with mock data (user id, username, email, status, password, id)
router.get('/', async (req, res, next) => {
  try {
    usersDB.getUsers().then(users => res.json(users))
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    usersDB.findById(id).then(users => res.json(users))
  } catch (err) {
    next(err);
  }
});

module.exports = router;

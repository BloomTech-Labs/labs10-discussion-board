/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const usersDB = require('../db/models/usersDB.js');
const bcrypt = require('bcryptjs');
const router = express.Router();
// const jwt = require('jsonwebtoken');

// globals
const { numOfHashes } = require('../config/globals.js');

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
const { authenticate } = require('../config/middleware/authenticate.js');

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/

// Gets a list of users with mock data (user id, username, email, status, password, id)
router.get('/', (req, res, next) => {
  try {
    usersDB.getUsers().then(users => res.status(200).json(users))
  } catch (err) {
    next(err);
  }
});

// Gets a user by their ID (mock data)
router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    usersDB.findById(id).then(user => res.status(200).json(user))
  } catch (err) {
    next(err);
  }
});
    
// Updates a user
router.put('/user/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, email, status } = req.body;
    const newUser = { username, password, email, status };
    usersDB.update(id, newUser).then(user => res.status(200).json(user));
  } catch (err) {
		next(err);
	}
});

// Update the password of a user given their ID
router.put('/password/:user_id', authenticate, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || oldPassword === '') throw { code: 401 };
    if (!newPassword || newPassword === '') throw { code: 401 };
    const currentPW = await usersDB.getPassword(user_id);
    if (currentPW && bcrypt.compareSync(oldPassword, currentPW.password)) {
      const newHashedPassword = bcrypt.hashSync(newPassword, numOfHashes);
      return usersDB.updatePassword(user_id, newHashedPassword).then(() => res.status(201).json({
        message: 'Password update succesful.'
      }));
    } else {
      throw { code: 401 };
    }
  } catch (err) {
		next(err);
	}
});

// Delete a user by their ID
router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    usersDB.remove(id).then(removedUser => res.status(202).json(removedUser));
  } catch (err) {
		next(err);
	}
});

module.exports = router;

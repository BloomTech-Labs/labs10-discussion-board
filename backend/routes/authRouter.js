/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const db = require('../db/models/usersDB.js');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  safeUsrnameSqlLetters,
  safePwdSqlLetters
} = require('../config/globals.js');

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
function generateToken(id, username) {
  const payload = {
    id: id,
    username: username
  };

  const secret =
    process.env.SECURE_KEY ||
    'Should configure local .env file for secretString'; // hard coding this in the code is bad practice

  const options = {
    expiresIn: '12h' // 60 seconds... otherValues(20, '2 days', '10h', '7d'), a number represents seconds (not milliseconds)
  };

  return jwt.sign(payload, secret, options);
}

const validateNewUsername = username => {
  if (username === '') return false;

  usernameArr = username.split('');
  for (let i = 0; i < usernameArr.length; i++) {
    if (!safeUsrnameSqlLetters.includes(usernameArr[i])) {
      return false;
    }
  }
  return true;
};

const validateNewPassword = password => {
  if (password === '') return false;

  password = password.split('');
  for (let i = 0; i < password.length; i++) {
    if (!safePwdSqlLetters.includes(password[i])) {
      return false;
    }
  }
  return true;
};

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/
router.post('/register', (req, res, next) => {
  // Precondition - Username must be unique and not used in database
  let newUserCreds = req.body;
  try {
    // username and password must keep rules of syntax
    if (!validateNewUsername(newUserCreds.username)) {
      throw { code: 400 };
    } else if (!validateNewPassword(newUserCreds.password)) {
      throw { code: 400 };
    }

    // no trailing spaces for email
    if (req.body.email) newUserCreds.email = newUserCreds.email.trim();

    res.status(201).json([{ message: 'success' }]);
  } catch (err) {
    next(err);
  }

  // // only the database administrator can set this this value
  // if (newUserCreds.is_admin) {
  //   newUserCreds.is_admin = false;
  // }

  // // Creates a hash password to store in the database...
  // newUserCreds.password = bcrypt.hashSync(
  //   newUserCreds.password,
  //   12 // db.settings.pwdHashLength
  // );

  // // Adds a single user to the database
  // db.addUser(newUserCreds)
  //   .then(Ids => {
  //     try {
  //       const token = generateToken(Ids[0], newUserCreds.username);
  //       res.status(201).send({ id: Ids[0], token });
  //     } catch (err) {
  //       next(err);
  //     }
  //   })
  //   .catch(err => {
  //     if (err.errno === 19) {
  //       res
  //         .status(400)
  //         .json({ error: 'username/display_name/email already taken' });
  //     } else {
  //       next(err);
  //     }
  //   });
});

router.post('/login', async (req, res, next) => {
  // Check username exist AND client password matches hash password in db
  const userCreds = req.body;
  try {
    const user = await db.findByUsername(userCreds.username);
    // If user object was obtained AND...
    // the client password matches the db hash password
    if (user && bcrypt.compareSync(userCreds.password, user.password)) {
      const token = await generateToken(user.id, user.username);
      res.status(201).json([{ id: user.id, token }]);
    } else {
      throw { code: 401 };
    }
  } catch (err) {
    if (err.code === 401) {
      res.status(401).json([
        {
          error: 401,
          message: 'invalid username/password'
        }
      ]);
    } else {
      next(err);
    }
  }
});

module.exports = router;

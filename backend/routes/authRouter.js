/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const base64Img = require('base64-img');
const { check } = require('express-validator/check');
const db = require('../db/models/usersDB.js');
const {
  safeUsrnameSqlLetters,
  safePwdSqlLetters,
  accountStatusTypes,
  numOfHashes
} = require('../config/globals.js');

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
const {
  authenticate,
  generateToken
} = require('../config/middleware/authenticate.js');

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

const validateStatusSelected = status => {
  if (status === '') return false;

  if (accountStatusTypes.includes(status)) {
    return true;
  }
  return false;
};

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/
router.post('/register', async (req, res, next) => {
  try {
    // username and password must keep rules of syntax
    if (!req.body.username || !validateNewUsername(req.body.username)) {
      throw { code: 400 };
    } else if (!req.body.password || !validateNewPassword(req.body.password)) {
      throw { code: 400 };
    } else if (!req.body.status || !validateStatusSelected(req.body.status))
      throw { code: 400 };

    let email = null;
    // find library later to support these rules -> https://stackoverflow.com/questions/2049502/what-characters-are-allowed-in-an-email-address
    if (req.body.email && check(req.body.email).isEmail())
      email = req.body.email.trim();

    // ensure new user added is only passing the props needed into the database
    const newUserCreds = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, numOfHashes), // bcryptjs hash stored in db (not the actual password)
      email: email,
      status: req.body.status
    };

    // add user
    const userAddedResults = await db.insert(newUserCreds); // [ { id: 1, username: 'username' } ]

    // add user settings
    if (req.body.avatarUrl) {
      const url = req.body.avatarUrl;
      base64Img.requestBase64(url, async function(err, result, body) {
        const userSettings = { user_id: userAddedResults[0].id, avatar: body };
        await db.addUserSettings(userSettings);
      });
    } else {
      const userSettings = { user_id: userAddedResults[0].id };
      await db.addUserSettings(userSettings);
    }

    // refresh token (if needed)
    const token = await generateToken(
      userAddedResults[0].id,
      userAddedResults[0].username
    );

    // return to front end
    return res.status(201).json([
      {
        id: userAddedResults[0].id,
        token,
        message: 'Registration successful.',
        username: userAddedResults[0].username
      }
    ]);
  } catch (err) {
    // Postgress error code
    if (err.code === '23505') {
      res.status(409).json({ 'http error code': 409, message: err.detail });
    } else {
      next(err);
    }
  }
});

router.post('/login', async (req, res, next) => {
  try {
    if (!req.body.username || req.body.username === '') throw { code: 401 };
    if (!req.body.password || req.body.password === '') throw { code: 401 };
    const userCreds = {
      username: req.body.username,
      password: req.body.password
    };
    const user = await db.findByUsername(userCreds.username);
    // If user object was obtained AND...
    // the client password matches the db hash password
    if (user && bcrypt.compareSync(userCreds.password, user.password)) {
      const token = await generateToken(user.id, user.username);
      res.status(201).json([
        {
          id: user.id,
          token,
          message: 'Log in successful.',
          username: user.username
        }
      ]);
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

// log a user back in if their token is authenticated
router.post('/log-back-in/:user_id', authenticate, async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await db.findById(user_id);
    // if the user already exists in the DB
    // you will get back an array with an object with user info inside it
    if (user.length === 1) {
      const token = await generateToken(user[0].id, user[0].username);
      return res.status(201).json([
        {
          id: user[0].id,
          token,
          username: user[0].username,
          email: user[0].email,
          message: 'Logging back in successful.'
        }
      ]);
    } else {
      throw { code: 401 };
    }
  } catch (err) {
    if (err.code === 401) {
      res.status(401).json([
        {
          error: 401,
          message: 'invalid user_id or more than one user returned'
        }
      ]);
    } else {
      next(err);
    }
  }
});

router.post('/auth0-login', async (req, res, next) => {
  try {
    const { email, name, picture } = req.body;
    const user = await db.findByUsername(name);
    // if the user already exists in the DB
    if (user) {
      const token = await generateToken(user.id, user.username);
      return res.status(201).json([
        {
          id: user.id,
          token,
          username: user.username,
          email: user.email,
          message: 'Log in using auth0 credentials successful.'
        }
      ]);
    }
    // else, if user does not exist, register them first
    const newUserCreds = {
      username: name,
      email,
      status: 'active'
    };
    const userAddedResults = await db.insert(newUserCreds); // [ { id: 1, username: 'username' } ]
    const token = await generateToken(
      userAddedResults[0].id,
      userAddedResults[0].username
    );
    return res.status(201).json([
      {
        id: userAddedResults[0].id,
        token,
        message: 'Registration using auth0 credentials successful.',
        username: userAddedResults[0].username
      }
    ]);
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

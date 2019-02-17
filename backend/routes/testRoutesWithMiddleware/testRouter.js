/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');

const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware ********************************************
 **************************************************************************************************/
const {
  refreshTokenAsNeeded
} = require('../../config/middleware/authenticate.js');

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/

// get top (limit 10) daily discussions ordered by vote_count
router.get('/auth_refresh_token', async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const rToken = await refreshTokenAsNeeded(token);
    return res
      .status(200)
      .json({ message: 'success', old_token: token, refreshed_token: rToken });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const base64Img = require('base64-img');

const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware ********************************************
 **************************************************************************************************/
/*const {
  refreshTokenAsNeeded
} = require('../../config/middleware/authenticate.js');
*/
/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/
router.get('/', (req, res, next) => {
  res
    .status(200)
    .json({ message: 'used for directly testing endpoint/middleware logic' });
});

/*router.get('/auth_refresh_token', async (req, res, next) => {
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
*/


router.get('/url_to_base64', async (req, res, next) => {
  try {
    const url = 'https://i.imgur.com/6gMn1RD.png';
    let base64;
    // let base64;
    base64Img.requestBase64(url, function (err, result, body) {
      console.log('BODY', body.slice(0, 30));
      base64 = body.slice(0, 30);
      console.log('base64_inside_cb', body.slice(0, 30));
    });
    console.log('base64_outside_cb', typeof base64);
    res.send({ message: 'success' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

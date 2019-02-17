/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const { postsDB } = require('../db/models/index.js');
const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware ********************************************
 **************************************************************************************************/
const { authenticate } = require('../config/middleware/authenticate.js');

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/

// create a post by a given user_id to a given discussion_id
router.post('/:user_id', authenticate, async (req, res, next) => {
	try {
		const { discussion_id, body } = req.body;
		return postsDB
			.insert(user_id, discussion_id, body)
			.then(() => res.status(201).json({ message: 'Post creation successful.' }));
	} catch (err) {
		next(err);
	}
});

module.exports = router;

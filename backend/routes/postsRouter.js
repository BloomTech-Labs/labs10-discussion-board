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
		const { user_id } = req.params;
		const { discussion_id, postBody } = req.body;
		if (!postBody) return res.status(400).json({ error: 'Post body must not be empty.' });
		return postsDB
			.insert(user_id, discussion_id, postBody)
			.then(() => res.status(201).json({ message: 'Post creation successful.' }));
	} catch (err) {
		next(err);
	}
});

// edit post with given post id
router.put('/:user_id', authenticate, async (req, res, next) => {
	try {
		const { post_id, postBody } = req.body;
		const last_edited_at = Date.now();
		const post = { body: postBody, last_edited_at };
		if (!postBody) return res.status(400).json({ error: 'Post body must not be empty.' });
		if (!post_id) return res.status(400).json({ error: 'Post ID is required.' });
		return postsDB
			.update(post_id, post)
			.then(() => res.status(201).json({ message: 'Post update successful.' }));
	} catch (err) {
		next(err);
	}
});

module.exports = router;

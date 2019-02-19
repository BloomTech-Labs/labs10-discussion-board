/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const { discussionFollowsDB } = require('../db/models/index.js');

const router = express.Router();

// User can follow a discussion
router.post('/:user_id/:discussion_id', (req, res) => {
	const { discussion_id, user_id } = req.params;
	
	// check first to see if user_id is following discussion_id
	return discussionFollowsDB
		.get(discussion_id, user_id)
		.then(follow => {
			if (follow.length > 0) {
				// if user is already following this discussion, remove the follow
				return discussionFollowsDB
					.remove(discussion_id, user_id)
					.then(() => res.status(201).json({ message: 'You have unfollowed this discussion.' }))
					.catch(err => res.status(500).json({ error: `Failed to remove(): ${ err }` }));
			}
			// else if user is not following this discussion, add the follow
			return discussionFollowsDB
				.add(discussion_id, user_id)
				.then(() => res.status(201).json({message: 'You are now following this discussion.'}))
				.catch(err => res.status(500).json({ error: `Failed to add(): ${ err }` }));
		})
		.catch(err => res.status(500).json({ error: `Failed to get(): ${ err }` }));
});

module.exports = router;
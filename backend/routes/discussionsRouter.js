/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const { discussionsDB } = require('../db/models/index.js');

const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware ********************************************
 **************************************************************************************************/
// None

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/

// get top (limit 10) daily discussions ordered by vote_count
router.get('/top-daily', async (req, res, next) => {
	try {
		discussionsDB.getTopDailyDiscussions().then(topDailyDiscussions => res.json(topDailyDiscussions));
	} catch (err) {
		next(err);
	}
});

//GET All Discussions
router.get('/all', (req, res) => {
	return discussionsDB.getDiscussions()
		.then(d => {
			res.status(200).json(d)
		})
		.catch(err =>{
			res.status(500).json(err)
		})
});

//GET Discussion by Discussion ID
router.get('/:id', (req, res) => {
	const id = req.params.id
	return discussionsDB.findById(id)
	.then(d => {
		res.status(200).json(d)
	})

});

//GET Discussion by User ID (Super-Mod/Creator)
router.get('/user/:user_id', (req, res) => {
	const {user_id} = req.params
	return discussionsDB.findByUserId(user_id)
	.then(d => {
		res.status(200).json(d)
	})
});

//GET Discussion by Category ID
router.get('/category/:category_id', (req, res) => {
	const {category_id} = req.params
	return discussionsDB.findByCategoryId(category_id)
	.then(d => {
		res.status(200).json(d)
	})
});

//Add Discussion
router.post('/add', (req, res) => {
	const discussion = req.body
	return discussionsDB.insert(discussion)
	.then(d => {
		res.status(200).json({
			message: 'Discussion topic has been posted!'
		})
	})
});

//Update Discussion
//Note: add Modal for this feature
router.put('/update/:id', (req, res) => {
	const id = req.params.id
	const discussion = req.body
	return discussionsDB.update(discussion, id)
	.then(d => {
		res.status(200).json({
			message: 'Your discussion topic has been updated!'
		})
	})
});

//Delete Discussion 
//Note: add Modal for this feature
router.delete('/delete/:id', (req, res) => {
	const id = req.params.id
	return discussionsDB.remove(id)
	.then(d => {
		res.status(200).json({
			message: 'Your discussion topic has been deleted!'
		})
	})
})

module.exports = router;

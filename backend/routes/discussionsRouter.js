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
		const topDailyDiscussions = await discussionsDB.getTopDailyDiscussions();
		return res.status(200).json(topDailyDiscussions);
	} catch (err) {
		next(err);
	}
});

//GET All Discussions
router.get('/', (req, res) => {
	return discussionsDB.getDiscussions()
	.then(discussMap => {
		res.status(200).json(discussMap)
	})
	.catch(err =>{
		res.status(500).json(err)
	})
});

//GET Discussion by Discussion ID
router.get('/:id', (req, res) => {
	const { id } = req.params;
	return discussionsDB.findById(id)
		.then(discussion => res.status(200).json(discussion))
		.catch(err => res.status(500).json(err));
});

//GET Discussion by User ID (Super-Mod/Creator)

//NOTE: UX - /user should be the user's actual username

router.get('/user/:user_id', (req, res) => {
	const {user_id} = req.params
	return discussionsDB.findByUserId(user_id)
	.then(discussMap => {
		res.status(200).json(discussMap)
	})
	.catch(err => res.status(500).json(err))
});

//GET Discussion by Category ID

//NOTE: UX - /category should be the category's actual name

router.get('/category/:category_id', (req, res) => {
	const {category_id} = req.params
	return discussionsDB.findByCategoryId(category_id)
	.then(discussMap => {
		console.log(discussMap)
		res.status(200).json(discussMap)
	})
	.catch(err => res.status(500).json(err))
});

//Add Discussion
router.post('/add', (req, res) => {
	const discussion = req.body
	return discussionsDB.insert(discussion)
	.then(discussMap => {
		res.status(200).json([{
			message: 'Discussion topic has been posted!'
		}])
	.catch(err => res.status(500).json(err))
	})
});

//Update Discussion
//Note: add Modal for this feature
router.put('/update/:id', (req, res) => {
	const id = req.params.id
	const discussion = req.body
	return discussionsDB.update(discussion, id)
	.then(discussMap => {
		res.status(200).json([{
			message: 'Your discussion topic has been updated!'
		}])
	.catch(err => res.status(500).json(err))
	})
});

//Delete Discussion 
//Note: add Modal for this feature
router.delete('/delete/:id', (req, res) => {
	const id = req.params.id
	return discussionsDB.remove(id)
	.then(discussMap => {
		res.status(200).json([{
			message: 'Your discussion topic has been deleted!'
		}])
	.catch(err => res.status(500).json(err))
	})
})

module.exports = router;

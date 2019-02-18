/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const { categoriesDB } = require('../db/models/index.js');

const router = express.Router();

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/

//GET All Categories
router.get('/', (req, res) => {
	return categoriesDB.getCategories()
		.then(categoryMap => res.status(200).json(categoryMap))
		.catch(err => res.status(500).json({ error: `Failed to getCategories(): ${ err }` }));
});

//GET Category by Category ID
router.get('/:id', (req, res) => {
	const id = req.params.id
	return categoriesDB.findById(id)
		.then(categoryMap => res.status(200).json(categoryMap))
		.catch(err => res.status(500).json({ error: `Failed to findById(): ${ err }` }));
});

//GET Category by User ID (Super-Mod/Creator)
router.get('/user/:user_id', (req, res) => {
	const {user_id} = req.params
	return categoriesDB.findByUserId(user_id)
		.then(categoryMap => res.status(200).json(categoryMap))
		.catch(err => res.status(500).json({ error: `Failed to findByUserId(): ${ err }` }));
});

//Add Category
router.post('/add', (req, res) => {
	const category = req.body
	return categoriesDB.insert(category)
		.then(() => res.status(200).json([{ message: 'Category topic has been posted!' }]))
		.catch(err => res.status(500).json({ error: `Failed to insert(): ${ err }` }));
});

//Update Category
//Note: add Modal for this feature
router.put('/update/:id', (req, res) => {
	const id = req.params.id
	const category = req.body
	return categoriesDB.update(category, id)
		.then(() => res.status(200).json([{ message: 'Your category topic has been updated!' }]))
		.catch(err => res.status(500).json({ error: `Failed to update(): ${ err }` }));
});

//Delete Category 
//Note: add Modal for this feature
router.delete('/delete/:id', (req, res) => {
	const id = req.params.id
	return categoriesDB.remove(id)
		.then(() => res.status(200).json([{ message: 'Your category topic has been deleted!' }]))
		.catch(err => res.status(500).json({ error: `Failed to remove(): ${ err }` }));
})

module.exports = router;

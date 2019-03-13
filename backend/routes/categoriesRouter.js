/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const { categoriesDB } = require('../db/models/index.js');

const router = express.Router();

// globals
const { categoryIcons } = require('../config/globals.js');

/***************************************************************************************************
 ******************************************* middleware ******************************************
 **************************************************************************************************/
const { authenticate } = require('../config/middleware/authenticate.js');
const { authorizeCreateCat } = require('../config/middleware/authorization.js');

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/

//GET All Categories
router.get('/', (req, res) => {
  let order = req.get('order');
  let orderType = req.get('orderType');
  if (order === 'undefined') order = null;
  if (orderType === 'undefined') orderType = null;
  return categoriesDB.getCategories(order, orderType)
    .then(categoryMap => res.status(200).json(categoryMap))
    .catch(err => res.status(500).json({ error: `Failed to getCategories(): ${err}` }));
});

router.get('/followed/:user_id', authenticate, (req, res) => {
  const user_id = req.params.user_id;
  return categoriesDB.getFollowedCategoryNames(user_id)
    .then(categories => res.status(200).json(categories))
    .catch(err => res.status(500).json({ error: `Failed to getFollowedCategoryNames(): ${err}` }));
});

router.get('/search', (req, res) => {
  const searchText = req.get('searchText');
  let order = req.get('order');
  let orderType = req.get('orderType');
  if (order === 'undefined') order = null;
  if (orderType === 'undefined') orderType = null;
  if (!searchText) return res.status(200).json([]);
  return categoriesDB.search(searchText, order, orderType)
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).json({ error: `Failed to search(): ${err}` }));
});

router.get('/category-icons/:user_id', authenticate, (req, res) => res.status(200).json(categoryIcons));

// //GET Category by Category ID
// router.get('/:id', (req, res) => {
//   const id = req.params.id
//   return categoriesDB.findById(id)
//     .then(categoryMap => res.status(200).json(categoryMap))
//     .catch(err => res.status(500).json({ error: `Failed to findById(): ${err}` }));
// });

// //GET Category by User ID (Super-Mod/Creator)
// router.get('/user/:user_id', (req, res) => {
//   const { user_id } = req.params
//   return categoriesDB.findByUserId(user_id)
//     .then(categoryMap => res.status(200).json(categoryMap))
//     .catch(err => res.status(500).json({ error: `Failed to findByUserId(): ${err}` }));
// });

//Add Category
router.post('/:user_id', authenticate, authorizeCreateCat, (req, res) => {
  const { user_id } = req.params;
  let { newCategory } = req.body;
  newCategory.name = newCategory.name.trim();
  if (!newCategory.name) return res.status(401).json({ error: 'Category name must not be blank.' });
  newCategory.user_id = user_id;
  return categoriesDB.getCategoryByName(newCategory.name)
    .then(cats => {
      if (cats) return res.status(400).json({ error: `Category ${cats.name} already exists.` });
      newCategory.created_at = Date.now();
      return categoriesDB.insert(newCategory)
        .then(newId => res.status(201).json(newId))
        .catch(err => res.status(500).json({ error: `Failed to insert(): ${err}` }));
    })
    .catch(err => res.status(500).json({ error: `Failed to getCategoryByName(): ${err}` }));
});

// //Update Category
// //Note: add Modal for this feature
// router.put('/update/:id', (req, res) => {
//   const id = req.params.id
//   const category = req.body
//   return categoriesDB.update(category, id)
//     .then(() => res.status(200).json([{ message: 'Your category topic has been updated!' }]))
//     .catch(err => res.status(500).json({ error: `Failed to update(): ${err}` }));
// });

// //Delete Category 
// //Note: add Modal for this feature
// router.delete('/delete/:id', (req, res) => {
//   const id = req.params.id
//   return categoriesDB.remove(id)
//     .then(() => res.status(200).json([{ message: 'Your category topic has been deleted!' }]))
//     .catch(err => res.status(500).json({ error: `Failed to remove(): ${err}` }));
// })

module.exports = router;

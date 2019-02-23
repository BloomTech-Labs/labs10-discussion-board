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
const { authenticate, authenticateIfTokenExists } = require('../config/middleware/authenticate.js');

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/
// get top (limit 10) daily discussions ordered by vote_count
router.get('/top-daily/:user_id', authenticateIfTokenExists, (req, res) => {
  const order = req.get('order');
  const orderType = req.get('orderType');
  let { user_id } = req.params;
  if (user_id === 'null') user_id = 0;
  return discussionsDB
    .getTopDailyDiscussions(user_id, order, orderType)
    .then(topDailyDiscussions => {
      res.status(200).json(topDailyDiscussions);
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: `Failed to getTopDailyDiscussions(): ${err}` })
    );
});

//GET All Discussions
router.get('/', (req, res) => {
  return discussionsDB
    .getDiscussions()
    .then(discussMap => res.status(200).json(discussMap))
    .catch(err =>
      res.status(500).json({ error: `Failed to getDiscussions(): ${err}` })
    );
});

//GET Discussion by Discussion ID
router.get('/discussion/:id/:user_id', authenticateIfTokenExists, (req, res) => {
  const { id } = req.params;
  let { user_id } = req.params;
  if (user_id === 'null') user_id = 0;
  return discussionsDB
    .findById(id, user_id)
    .then(discussion => res.status(200).json(discussion))
    .catch(err =>
      res.status(500).json({ error: `Failed to findById(): ${err}` })
    );
});

//GET Discussion by User ID (Super-Mod/Creator)
router.get('/user/:user_id', (req, res) => {
  const { user_id } = req.params;
  return discussionsDB
    .findByUserId(user_id)
    .then(discussMap => res.status(200).json(discussMap))
    .catch(err =>
      res.status(500).json({ error: `Failed to findByUserId(): ${err}` })
    );
});

//GET Discussion by Category ID
router.get('/category/:category_id/:user_id', authenticateIfTokenExists, (req, res) => {
  const order = req.get('order');
  const orderType = req.get('orderType');
  const { category_id } = req.params;
  let { user_id } = req.params;
  if (user_id === 'null') user_id = 0;
  return discussionsDB
    .findByCategoryId(category_id, user_id, order, orderType)
    .then(discussMap => res.status(200).json(discussMap))
    .catch(err => res.status(500).json({ error: `Failed to findByCategoryId(): ${err}` }));
});

//Add Discussion
router.post('/:user_id', authenticate, (req, res) => {
  const { user_id } = req.params;
  const { category_id, title, dBody } = req.body;
  const created_at = Date.now();
  if (!title) return res.status(400).json({ error: 'discussion title must not be empty.' });
  if (!dBody) return res.status(400).json({ error: 'discussion body must not be empty.' });
  const newDiscussion = { user_id, category_id, title, body: dBody, created_at };
  return discussionsDB
    .insert(newDiscussion)
    .then(() => res.status(201).json({ message: 'Discussion topic has been posted!' }))
    .catch(err => res.status(500).json({ error: `Failed to insert(): ${err}` }));
});

// edit post with given post id
router.put('/:user_id', authenticate, (req, res) => {
  const { discussion_id, title, dBody } = req.body;
  const last_edited_at = Date.now();
  const discussion = { title, body: dBody, last_edited_at };
  if (!title) return res.status(400).json({ error: 'Discussion title must not be empty.' });
  if (!dBody) return res.status(400).json({ error: 'Discussion body must not be empty.' });
  if (!discussion_id) return res.status(400).json({ error: 'Discussion ID is required.' });
  return discussionsDB
    .update(discussion_id, discussion)
    .then(() => res.status(201).json({ message: 'Discussion update successful.' }))
    .catch(err => res.status(500).json({ error: `Failed to update(): ${err}` }));
});

//Delete Discussion
router.delete('/:user_id', authenticate, (req, res) => {
  const discussion_id = req.get('discussion_id');
  if (!discussion_id) return res.status(400).json({ error: 'Discussion ID is required.' });
  return discussionsDB
    .remove(discussion_id)
    .then(() => res.status(201).json({ message: 'Discussion removal successful.' }))
    .catch(err => res.status(500).json({ error: `Failed to remove(): ${err}` }));
});

module.exports = router;

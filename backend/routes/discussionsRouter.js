/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const { discussionsDB } = require('../db/models/index.js');
const { authenticate } = require('../config/middleware/authenticate.js');

const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware ********************************************
 **************************************************************************************************/
// None

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/
// get top (limit 10) daily discussions ordered by vote_count
router.get('/top-daily', (req, res) => {
  return discussionsDB
    .getTopDailyDiscussions()
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
router.get('/discussion/:id', (req, res) => {
  const { id } = req.params;
  return discussionsDB
    .findById(id)
    .then(discussion => res.status(200).json(discussion))
    .catch(err =>
      res.status(500).json({ error: `Failed to findById(): ${err}` })
    );
});

//GET Discussion by User ID (Super-Mod/Creator)

//NOTE: UX - /user should be the user's actual username

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

//NOTE: UX - /category should be the category's actual name

router.get('/category/:category_id', (req, res) => {
  const { category_id } = req.params;
  return discussionsDB
    .findByCategoryId(category_id)
    .then(discussMap => res.status(200).json(discussMap))
    .catch(err =>
      res.status(500).json({ error: `Failed to findByCategoryId(): ${err}` })
    );
});

//Add Discussion
router.post('/:user_id', (req, res, next) => {
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

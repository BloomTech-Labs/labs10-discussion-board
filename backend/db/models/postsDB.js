const db = require('../dbConfig.js');

// create a post by a given user_id to a given discussion_id
const insert = newPost => {
  return db('posts').insert(newPost);
};

// edit post with given post id
const update = (id, post) => {
  return db('posts').where({ id }).update(post);
};

// remove post with given post id
const remove = id => {
  return db('posts').where({ id }).del();
};

module.exports = {
  insert,
  update,
  remove,
};

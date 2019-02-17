const db = require('../dbConfig.js');

// create a post by a given user_id to a given discussion_id
const insert = (user_id, discussion_id, body) => {
	return db('posts as p').insert({ user_id, discussion_id, body });
};

// edit post with given post id
const update = (id, post) => {
	return db('posts as p').where({ id }).update(post);
};
module.exports = {
	insert,
	update,
};

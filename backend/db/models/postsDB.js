const db = require('../dbConfig.js');

// create a post by a given user_id to a given discussion_id
const insert = (user_id, discussion_id, body) => {
	return db('posts as p').insert({ user_id, discussion_id, body });
};

module.exports = {
	insert,
};

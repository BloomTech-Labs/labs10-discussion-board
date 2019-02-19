const db = require('../dbConfig.js');

// checks to see if user_id is following discussion_id
const get = (discussion_id, user_id) => {
	return db('discussion_follows')
		.where({ user_id })
		.andWhere({ discussion_id });
};

// adds a follow for a certain discussion by a certain user
const add = (discussion_id, user_id) => {
    return db('discussion_follows').insert({ discussion_id, user_id });
};

// remove a follow from a certin discussion by a certain user
const remove = (discussion_id, user_id) => {
	return db('discussion_follows')
		.where({ user_id })
		.andWhere({ discussion_id })
		.del();
};

module.exports = {
	add,
	get,
	remove,
};
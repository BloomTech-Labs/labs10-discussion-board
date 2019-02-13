const db = require('../dbConfig.js');

const getTopDailyPosts = () => {
	return db('posts')
		.whereRaw("created_at >= ?", [new Date(new Date().getTime() - (24 * 60 * 60 * 1000))])
		.limit(10);
};

module.exports = {
	getTopDailyPosts,
};

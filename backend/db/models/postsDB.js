const db = require('../dbConfig.js');

// get top (limit 10) daily posts ordered by vote_count
const getTopDailyPosts = () => {
	return db('posts as p')
		.select(
			'p.id',
			'p.user_id',
			'u.username',
			'p.discussion_id',
			'd.title as discussion_title',
			'd.category_id',
			'c.name as category_name',
			'p.body',
			'p.created_at',
		)
		.sum('pv.type as vote_count')
		.join('post_votes as pv', 'pv.post_id', 'p.id')
		.join('users as u', 'u.id', 'p.user_id')
		.join('discussions as d', 'd.id', 'p.discussion_id')
		.join('categories as c', 'c.id', 'd.category_id')
		// this whereRaw gets the created_at dates that are 24 hours away from the current time
		.whereRaw("created_at >= ?", [new Date(new Date().getTime() - (24 * 60 * 60 * 1000))])
		.limit(10)
		.groupBy('p.id', 'u.username', 'd.title', 'c.name', 'd.category_id')
		.orderBy('vote_count', 'desc');
};

module.exports = {
	getTopDailyPosts,
};

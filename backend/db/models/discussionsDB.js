const db = require('../dbConfig.js');

// get top (limit 10) daily discussions ordered by vote_count
const getTopDailyDiscussions = () => {
    return db('discussions as d')
        .select(
            'd.id',
			'd.user_id',
			'u.username',
			'd.category_id',
			'c.name as category_name',
            'd.title',
            'd.body',
            'd.created_at',
        )
        .sum('dv.type as vote_count')
        .join('discussion_votes as dv', 'dv.discussion_id', 'd.id')
        .join('users as u', 'u.id', 'd.user_id')
        .join('categories as c', 'c.id', 'd.category_id')
        // this whereRaw gets the created_at dates that are 24 hours away from the current time
        .whereRaw("d.created_at >= ?", [new Date(new Date().getTime() - (24 * 60 * 60 * 1000))])
        .limit(10)
        .groupBy('d.id', 'u.username', 'd.title', 'c.name', 'd.category_id')
        .orderBy('vote_count', 'desc');
};

module.exports = {
    getTopDailyDiscussions,
};

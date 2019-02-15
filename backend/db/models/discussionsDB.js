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
        .count('p.id as post_count')
        .join('discussion_votes as dv', 'dv.discussion_id', 'd.id')
        .join('users as u', 'u.id', 'd.user_id')
        .join('categories as c', 'c.id', 'd.category_id')
        .join('posts as p', 'p.discussion_id', 'd.id')
        // this whereRaw gets the created_at dates that are 24 hours away from the current time
        .whereRaw("d.created_at >= ?", [new Date(new Date().getTime() - (24 * 60 * 60 * 1000))])
        .limit(10)
        .groupBy('d.id', 'u.username', 'd.title', 'c.name', 'd.category_id')
        .orderBy('vote_count', 'desc');
};

//gets All Discussions
const getDiscussions = () => {
    return db('discussions')
};

//Find By ID (discussions own ID)
const findById = (id) => {
    return db('discussions').where('id', id)
};

//Find by User ID (Original Creator)
const findByUserId = (user_id) => {
    return db('discussions').where('user_id', user_id)
};

//Find by Associated Category (category ID)
const findByCategoryId = (category_id) => {
    return db('discussions').where('category_id', category_id)
};


//AUTHORIZED ACCESS

//Add Discussion into the Discussion table
const insert = (discussion) => {
    return db('discussions').insert(discussion)
};


//EDIT [ACCOUNT TYPE ACCESS: USER_ID]
const update = (discussion, id) => {
    return db('discussions')
            .where('id', id)
            .update(discussion)
};

//DELETE [ACCOUNT TYPE ACCESS: USER_ID, ADMIN]
const remove = (id) => {
    return db('discussions')
            .where('id', id)
            .del()
};

module.exports = {
    getTopDailyDiscussions,
    getDiscussions,
    findById,
    findByUserId,
    findByCategoryId,
    insert,
    update,
    remove
};

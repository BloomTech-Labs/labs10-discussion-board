const db = require('../dbConfig.js');

// get top (limit 10) daily discussions ordered by vote_count
const getTopDailyDiscussions = () => {
    const postCountQuery = db('posts as p')
        .select('p.discussion_id')
        .count({ post_count: 'p.id' })
        .join('discussions as d', 'd.id', 'p.discussion_id')
        .groupBy('p.discussion_id');

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
            'pc.post_count'
        )
        .sum('dv.type as vote_count')
        .join('discussion_votes as dv', 'dv.discussion_id', 'd.id')
        .join('users as u', 'u.id', 'd.user_id')
        .join('categories as c', 'c.id', 'd.category_id')
        .leftOuterJoin(postCountQuery.as('pc'), function() {
            this.on('pc.discussion_id', '=', 'd.id');
        })
        // this whereRaw gets the created_at dates that are 24 hours away from the current time
        .whereRaw("d.created_at >= ?", [new Date(new Date().getTime() - (24 * 60 * 60 * 1000))])
        .groupBy('d.id', 'u.username', 'c.name', 'pc.post_count')
        .orderBy('vote_count', 'desc')
        .limit(10);
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

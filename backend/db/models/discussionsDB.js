const db = require('../dbConfig.js');

// get top (limit 10) daily discussions
const getTopDailyDiscussions = (user_id, order, orderType) => {
  const postCountQuery = db('posts as p')
    .select('p.discussion_id')
    .count({ post_count: 'p.id' })
    .join('discussions as d', 'd.id', 'p.discussion_id')
    .groupBy('p.discussion_id');

  const userVoteQuery = db('discussion_votes as dv')
    .select('dv.type', 'dv.discussion_id')
    .where({ user_id });

  // prettier-ignore
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
      db.raw('COALESCE(pc.post_count, 0) AS post_count'),
      db.raw('SUM(COALESCE(dv.type, 0)) AS vote_count'),
      'uv.type as user_vote'
    )
    .leftOuterJoin('discussion_votes as dv', 'dv.discussion_id', 'd.id')
    .leftOuterJoin('users as u', 'u.id', 'd.user_id')
    .join('categories as c', 'c.id', 'd.category_id')
    .leftOuterJoin(postCountQuery.as('pc'), function () {
      this.on('pc.discussion_id', '=', 'd.id');
    })
    .leftOuterJoin(userVoteQuery.as('uv'), function () {
      this.on('uv.discussion_id', '=', 'd.id');
    })
    // this whereRaw gets the created_at dates that are 24 hours away from the current time
    .whereRaw("d.created_at >= ?", [Date.parse(new Date()) - (24 * 60 * 60 * 1000)])
    .groupBy('d.id', 'u.username', 'c.name', 'pc.post_count', 'uv.type')
    // order by given order and orderType
    // else default to ordering by vote_count descending
    .orderBy(`${order ? order : 'vote_count'}`, `${orderType ? orderType : 'desc'}`)
    .limit(10);
};

// get hottest (limit 10) discussions
const getHottestDiscussions = user_id => {
  const voteCountQuery = db('discussion_votes')
    .select('discussion_id')
    .sum('type as vote_count')
    .groupBy('discussion_id');

  const postCountQuery = db('posts as p')
    .select('p.discussion_id')
    .count({ post_count: 'p.id' })
    .join('discussions as d', 'd.id', 'p.discussion_id')
    .groupBy('p.discussion_id');

  const userVoteQuery = db('discussion_votes as dv')
    .select('dv.type', 'dv.discussion_id')
    .where({ user_id });

  // prettier-ignore
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
      db.raw('COALESCE(pc.post_count, 0) AS post_count'),
      'dv.vote_count',
      'uv.type as user_vote',
      db.raw('(d.created_at / (1000 * 60 * 60 * 24) + (COALESCE(dv.vote_count, 0) / 10)) AS hotness_rank'),
    )
    .leftOuterJoin('users as u', 'u.id', 'd.user_id')
    .join('categories as c', 'c.id', 'd.category_id')
    .leftOuterJoin(voteCountQuery.as('dv'), function () {
      this.on('dv.discussion_id', '=', 'd.id');
    })
    .leftOuterJoin(postCountQuery.as('pc'), function () {
      this.on('pc.discussion_id', '=', 'd.id');
    })
    .leftOuterJoin(userVoteQuery.as('uv'), function () {
      this.on('uv.discussion_id', '=', 'd.id');
    })
    .groupBy('d.id', 'u.username', 'c.name', 'pc.post_count', 'uv.type', 'dv.vote_count')
    .orderBy('hotness_rank', 'desc')
    .limit(10);
};

//gets All Discussions
const getDiscussions = () => {
  return db('discussions');
};

//Find By ID (discussions own ID)
const findById = (id, user_id, order, orderType) => {
  const postCountQuery = db('posts as p')
    .select('p.discussion_id')
    .count({ post_count: 'p.id' })
    .join('discussions as d', 'd.id', 'p.discussion_id')
    .groupBy('p.discussion_id');

  const userDiscussionVoteQuery = db('discussion_votes as dv')
    .select('dv.type', 'dv.discussion_id')
    .where({ user_id });

  const discussionQuery = db('discussions as d')
    .select(
      'd.id',
      'd.user_id',
      'u.username',
      'd.category_id',
      'c.name as category_name',
      'c.id as category_id',
      'us.avatar',
      'us.signature',
      'd.title',
      'd.body',
      'd.created_at',
      'd.last_edited_at',
      db.raw('COALESCE(pc.post_count, 0) AS post_count'),
      db.raw('SUM(COALESCE(dv.type, 0)) AS discussion_votes'),
      'uv.type as user_vote'
    )
    .leftOuterJoin('users as u', 'u.id', 'd.user_id')
    .join('categories as c', 'c.id', 'd.category_id')
    .leftOuterJoin('user_settings as us', 'us.user_id', 'u.id')
    .leftOuterJoin('discussion_votes as dv', 'dv.discussion_id', 'd.id')
    .leftOuterJoin(postCountQuery.as('pc'), function () {
      this.on('pc.discussion_id', '=', 'd.id');
    })
    .leftOuterJoin(userDiscussionVoteQuery.as('uv'), function () {
      this.on('uv.discussion_id', '=', 'd.id');
    })
    .where('d.id', id)
    .groupBy('d.id', 'u.username', 'c.name', 'c.id', 'uv.type', 'us.avatar', 'us.signature','pc.post_count');

  const userPostVoteQuery = db('post_votes as pv')
    .select('pv.type', 'pv.post_id')
    .where({ user_id });

  const postsQuery = db('posts as p')
    .select(
      'p.id',
      'p.user_id',
      'u.username',
      'us.avatar',
      'us.signature',
      'p.discussion_id',
      'p.body',
      'p.created_at',
      'p.last_edited_at',
      'p.reply_to',
      db.raw('SUM(COALESCE(pv.type, 0)) AS post_votes'),
      'uv.type as user_vote'
    )
    .join('discussions as d', 'd.id', 'p.discussion_id')
    .leftOuterJoin('users as u', 'u.id', 'p.user_id')
    .leftOuterJoin('post_votes as pv', 'pv.post_id', 'p.id')
    .leftOuterJoin('user_settings as us', 'us.user_id', 'u.id')
    .leftOuterJoin(userPostVoteQuery.as('uv'), function () {
      this.on('uv.post_id', '=', 'p.id');
    })
    .where('p.discussion_id', id)
    .groupBy('p.id', 'u.username', 'uv.type', 'us.avatar', 'us.signature')
    // order by order and orderType variables
    // else default to ordering by created_at descending
    .orderBy(`${order ? order : 'created_at'}`, `${orderType ? orderType : 'desc'}`);

  const repliesQuery = db('posts')
    .select('reply_to')
    .where('discussion_id', id);

  const promises = [discussionQuery, postsQuery, repliesQuery];

  return Promise.all(promises).then(results => {
    const [discussionResults, postsResults, repliesResults] = results;
    if (!discussionResults.length) throw `No discussion found with ID ${id}`;
    const replyIds = [];
    for (let i = 0; i < repliesResults.length; i++) {
      let replyId = repliesResults[i].reply_to;
      if (replyId && !replyIds.includes(replyId)) replyIds.push(replyId);
    }
    const replyIdsQuery = db('posts as p')
      .select(
        'p.id',
        'p.user_id',
        'u.username',
        'p.body',
        'p.created_at',
        'p.last_edited_at',
      )
      .leftOuterJoin('users as u', 'u.id', 'p.user_id')
      .whereIn('p.id', replyIds);

    return Promise.all([replyIdsQuery])
      .then(result => {
        const [replyIdsResults] = result;
        for (let j = 0; j < postsResults.length; j++) {
          let replyID = postsResults[j].reply_to;
          if (replyID) postsResults[j].reply_to = replyIdsResults.find(reply => reply.id === replyID);
        }
        discussionResults[0].posts = postsResults;
        return discussionResults;
      });
  });
};

const search = (searchText, order, orderType) => {
  return db('discussions as d')
    .select(
      'd.id',
      'd.title',
      'd.body',
      'd.user_id',
      'u.username',
      'd.created_at',
      'd.category_id',
      'c.name as category_name',
      db.raw('SUM(COALESCE(dv.type, 0)) AS votes'),
    )
    .leftOuterJoin('discussion_votes as dv', 'dv.discussion_id', 'd.id')
    .leftOuterJoin('users as u', 'u.id', 'd.user_id')
    .join('categories as c', 'c.id', 'd.category_id')
    .whereRaw('LOWER(d.title) LIKE ?', `%${searchText.toLowerCase()}%`)
    .orWhereRaw('LOWER(d.body) LIKE ?', `%${searchText.toLowerCase()}%`)
    .groupBy('d.id', 'u.username', 'c.name')
    // order by given order and orderType, else default to ordering by created_at descending
    .orderBy(`${order ? order : 'd.created_at'}`, `${orderType ? orderType : 'desc'}`);
};

//Find by User ID (Original Creator)
const findByUserId = user_id => {
  return db('discussions').where({ user_id });
};

//Find by Associated Category (category ID)
const findByCategoryId = (category_id, user_id, order, orderType) => {
  const postCountQuery = db('posts as p')
    .select('p.discussion_id')
    .count({ post_count: 'p.id' })
    .join('discussions as d', 'd.id', 'p.discussion_id')
    .groupBy('p.discussion_id');

  const userVoteQuery = db('discussion_votes as dv')
    .select('dv.type', 'dv.discussion_id')
    .where({ user_id });

  const discussionQuery = db('discussions as d')
    .select(
      'd.id',
      'd.user_id',
      'u.username',
      'd.category_id',
      'c.name as category_name',
      'd.title',
      'd.body',
      'd.created_at',
      db.raw('COALESCE(pc.post_count, 0) AS post_count'),
      db.raw('SUM(COALESCE(dv.type, 0)) AS discussion_votes'),
      'uv.type as user_vote'
    )
    // .sum('dv.type as vote_count')
    .leftOuterJoin('users as u', 'u.id', 'd.user_id')
    .join('categories as c', 'c.id', 'd.category_id')
    .leftOuterJoin('discussion_votes as dv', 'dv.discussion_id', 'd.id')
    .leftOuterJoin(postCountQuery.as('pc'), function () {
      this.on('pc.discussion_id', '=', 'd.id');
    })
    .leftOuterJoin(userVoteQuery.as('uv'), function () {
      this.on('uv.discussion_id', '=', 'd.id');
    })
    .where('c.id', category_id)
    .groupBy('d.id', 'u.username', 'c.name', 'pc.post_count', 'uv.type')
    // order by given order and orderType variables
    // else default to ordering by created_at descending
    .orderBy(`${order ? order : 'created_at'}`, `${orderType ? orderType : 'desc'}`);

  const categoryQuery = db('categories as c')
    .select(
      'c.name',
      'u.username',
      'c.created_at',
    )
    .leftOuterJoin('users as u', 'u.id', 'c.user_id')
    .where('c.id', category_id)
    .first();

  const promises = [discussionQuery, categoryQuery];
  return Promise.all(promises)
    .then(results => {
      const [discussionResults, categoryResults] = results;
      return {
        category: categoryResults,
        discussions: discussionResults,
      };
    });
};

//AUTHORIZED ACCESS

//Add Discussion into the Discussion table
const insert = discussion => {
  return db('discussions').insert(discussion).returning('id');
};

//EDIT [ACCOUNT TYPE ACCESS: USER_ID]
const update = (id, discussion) => {
  return db('discussions').where({ id }).update(discussion);
};

const remove = id => {
  return db('discussions').where({ id }).del();
};

module.exports = {
  getTopDailyDiscussions,
  getHottestDiscussions,
  getDiscussions,
  search,
  findById,
  findByUserId,
  findByCategoryId,
  insert,
  update,
  remove
};

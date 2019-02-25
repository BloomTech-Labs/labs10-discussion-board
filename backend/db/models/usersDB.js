const db = require('../dbConfig.js');

//Gets all of the users in the db
const getUsers = () => {
  return db('users').select('id', 'username', 'email', 'status');
};

//Gets a user by their id
const findById = id => {
  const getDiscussions = db('discussions').where('user_id', id);
  const getPosts = db('posts').where('user_id', id);
  const getDiscussionFollows = db('discussion_follows as df')
    .select('df.discussion_id', 'd.title')
    .join('discussions as d', 'd.id', 'df.discussion_id')
    .where('df.user_id', id);
  const getCategoryFollows = db('category_follows as cf')
    .select('cf.category_id', 'c.name')
    .join('categories as c', 'c.id', 'cf.category_id')
    .where('cf.user_id', id);
  const getUser = db('users as u')
    .select(
      'u.id',
      'u.email',
      'u.username',
      'u.status',
      'us.avatar',
      'u.password',
      'u.email_confirm'
    )
    .leftOuterJoin('user_settings as us', 'u.id', 'us.user_id')
    .where('u.id', id);
  const promises = [ getDiscussions, getPosts, getUser, getDiscussionFollows, getCategoryFollows ];
    return Promise.all(promises)
    .then(results => {
      let [ getDiscussionsResults, getPostsResults, getUserResults, getDiscussionFollowsResults, getCategoryFollowsResults ] = results;
      getUserResults[0].discussions = getDiscussionsResults;
      getUserResults[0].posts = getPostsResults;
      getUserResults[0].discussionFollows = getDiscussionFollowsResults;
      getUserResults[0].categoryFollows = getCategoryFollowsResults;
      return getUserResults;
    });
};

// gets password for user with given id
const getPassword = id => {
  return db('users')
    .select('password')
    .where({ id })
    .first();
};

//Gets a user by their username
const findByUsername = username => {
  return db('users as u')
    .select(
      'u.id',
      'u.username',
      'u.password',
      'u.email',
      'u.status',
      'us.avatar'
    )
    .leftOuterJoin('user_settings as us', 'u.id', 'us.user_id')
    .whereRaw('LOWER(username) = ?', username.toLowerCase())
    .first();
};

// search through categories, discussions and posts
const searchAll = (searchText, orderType) => {
  const categoriesQuery = db('categories as c')
    .select('c.id', 'c.name', 'c.user_id', 'u.username', 'c.created_at')
    .join('users as u', 'u.id', 'c.user_id')
    .whereRaw('LOWER(c.name) LIKE ?', `%${ searchText.toLowerCase() }%`);

  const discussionsQuery = db('discussions as d')
    .select(
      'd.id',
      'd.title',
      'd.body',
      'd.user_id',
      'u.username',
      'd.created_at',
      'd.category_id',
      'c.name as category_name',
    )
    .sum('dv.type as votes')
    .join('discussion_votes as dv', 'dv.discussion_id', 'd.id')
    .join('users as u', 'u.id', 'd.user_id')
    .join('categories as c', 'c.id', 'd.category_id')
    .whereRaw('LOWER(d.title) LIKE ?', `%${ searchText.toLowerCase() }%`)
    .orWhereRaw('LOWER(d.body) LIKE ?', `%${ searchText.toLowerCase() }%`)
    .groupBy('d.id', 'u.username', 'c.name');

  const postsQuery = db('posts as p')
    .select(
      'p.id',
      'p.discussion_id',
      'p.created_at',
      'p.body',
      'p.user_id',
      'u.username',
      'd.title as discussion_title',
      'c.id as category_id',
      'c.name as category_name',
    )
    .sum('pv.type as votes')
    .join('post_votes as pv', 'pv.post_id', 'p.id')
    .join('users as u', 'u.id', 'p.user_id')
    .join('discussions as d', 'd.id', 'p.discussion_id')
    .join('categories as c', 'c.id', 'd.category_id')
    .whereRaw('LOWER(p.body) LIKE ?', `%${ searchText.toLowerCase() }%`)
    .groupBy('p.id', 'u.username', 'd.title', 'c.name', 'c.id');

  const promises = [ categoriesQuery, discussionsQuery, postsQuery ];
  return Promise.all(promises)
    .then(results => {
      const [ categoriesResults, discussionsResults, postsResults ] = results;
      const resultArr = [];
      categoriesResults.forEach(cat => resultArr.push({ type: 'category', result: cat }));
      discussionsResults.forEach(dis => resultArr.push({ type: 'discussion', result: dis }));
      postsResults.forEach(post => resultArr.push({ type: 'post', result: post }));
      resultArr.sort((a, b) => {
        if (orderType === 'desc') return b.result.created_at - a.result.created_at;
        return a.result.created_at - b.result.created_at;
      });
      return resultArr;
    });
};

//Checks if username exists (returns nothing if no, or the user object if yes)
const isUsernameTaken = username => {
  return db('users')
    .select('username')
    .where({ username })
    .first();
};

//Checks if email exists (returns nothing if no, or the user object if yes)
const isEmailTaken = email => {
  return db('users')
    .select('email')
    .where({ email })
    .first();
};

// get user with matching email in db
const getUserByEmail = email => {
  return db('users')
    .select('username', 'email_confirm')
    .where({ email });
};

// get user from given email if it has been confirmed
const getUserFromConfirmedEmail = email => {
  return db('users')
    .select('id', 'username')
    .where({ email })
    .andWhere('email_confirm', 'true')
    .first();
};

//Create a new user
const insert = user => {
  return db('users')
    .insert(user)
    .returning(['id', 'username', 'email']);
};

//Create a new user
const addEmailConfirm = (id, email_confirm) => {
  return db('users').update({ email_confirm }).where({ id });
};

//Insert user settings (with new created user)
const addUserSettings = settings => {
  return db('user_settings').insert(settings);
};

// confirm a user's email
const confirmEmail = email_confirm => {
  return db('users')
    .where({ email_confirm })
    .update('email_confirm', 'true');
};

//Update user settings
const updateUserSettings = settings => {
  return db('user_settings')
    .update(settings)
    .where('user_id', settings.user_id);
};

//Update avatar
const updateAvatar = (user_id, avatar) => {
  return db('user_settings')
    .where({ user_id })
    .update({ avatar }, ['avatar']); // update the avatar, returning the updated avatar
};

//Update a user
const update = (id, user) => {
  return db('users')
    .where('id', Number(id))
    .update(user);
};

// update password
const updatePassword = (id, password) => {
  return db('users')
    .where({ id })
    .update({ password });
};

// udpate e-mail and add an email-confirm token
const updateEmail = (id, email, email_confirm) => {
  return db('users')
    .update({ email, email_confirm })
    .where({ id });
};

// remove a user
const remove = id => {
  return db('users')
    .where('id', Number(id))
    .del();
};

module.exports = {
  getUsers,
  getPassword,
  findById,
  findByUsername,
  searchAll,
  isUsernameTaken,
  isEmailTaken,
  getUserByEmail,
  getUserFromConfirmedEmail,
  insert,
  addEmailConfirm,
  confirmEmail,
  addUserSettings,
  updateUserSettings,
  update,
  updateAvatar,
  updatePassword,
  updateEmail,
  remove
};

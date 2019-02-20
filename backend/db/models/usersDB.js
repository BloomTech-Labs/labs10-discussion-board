const db = require('../dbConfig.js');

//Gets all of the users in the db
const getUsers = () => {
  return db('users').select('id', 'username', 'email', 'status');
};

//Gets a user by their id
const findById = id => {
  const getDiscussions = db('discussions').where('user_id', id);
  const getPosts = db('posts').where('user_id', id);
  const getDiscussionFollows = db('discussion_follows as df').select('discussion_id').where('user_id', id);
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
  const promises = [ getDiscussions, getPosts, getUser, getDiscussionFollows ];
    return Promise.all(promises)
    .then(results => {
      let [ getDiscussionsResults, getPostsResults, getUserResults, getDiscussionFollowsResults ] = results;
      getUserResults[0].discussions = getDiscussionsResults;
      getUserResults[0].posts = getPostsResults;
      getUserResults[0].discussionFollows = getDiscussionFollowsResults.map(follows => follows.discussion_id);
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
  isUsernameTaken,
  isEmailTaken,
  getUserByEmail,
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

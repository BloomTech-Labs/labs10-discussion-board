const db = require('../dbConfig.js');

//Gets all of the users in the db
const getUsers = () => {
  return db('users').select('id', 'username', 'email', 'status');
};

//Gets a user by their id
const findById = id => {
  const getDiscussions = db('discussions').where('user_id', id);
  const getPosts = db('posts').where('user_id', id);
  const getUser = db('users as u')
    .select('u.id', 'u.email', 'u.username', 'u.status', 'us.avatar')
    .leftOuterJoin('user_settings as us', 'u.id', 'us.user_id')
    .where('u.id', id);
  const promises = [getDiscussions, getPosts, getUser];
  return Promise.all(promises).then(results => {
    let [getDiscussionsResults, getPostsResults, getUserResults] = results;
    getUserResults[0].discussions = getDiscussionsResults;
    getUserResults[0].posts = getPostsResults;
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

//Create a new user
const insert = user => {
  return db('users')
    .insert(user)
    .returning(['id', 'username']);
};

//Insert user settings (with new created user)
const addUserSettings = settings => {
  return db('user_settings').insert(settings);
};

//Update user settings
const updateUserSettings = settings => {
  return db('user_settings')
    .update(settings)
    .where('user_id', settings.user_id);
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
  insert,
  addUserSettings,
  updateUserSettings,
  update,
  updatePassword,
  remove
};

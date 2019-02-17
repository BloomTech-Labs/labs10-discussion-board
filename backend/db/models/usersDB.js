const db = require('../dbConfig.js');

//Gets all of the users in the db
const getUsers = () => {
  return db('users').select('id', 'username', 'email', 'status');
};

//Gets a user by their id
const findById = id => {
  return db('users')
    .where({ id: Number(id) })
    .select('id', 'username', 'status');
};

//Gets a user by their username
const findByUsername = username => {
  return db('users')
    .whereRaw('LOWER(username) = ?', username.toLowerCase())
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
  findById,
  findByUsername,
  insert,
  addUserSettings,
  update,
  updatePassword,
  remove
};

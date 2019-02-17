const db = require('../dbConfig.js');

//Gets all of the users in the db
const getUsers = () => {
  return db('users')
    .select(
      'id',
      'username',
      'email',
      'status'
    );
};

//Gets a user by their id
const findById = id => {
  return db('users')
    .select(
      'id',
      'username',
      'email',
      'status'
    )
    .where({ id: Number(id) });
};

//Gets a user by their username
const findByUsername = username => {
  return db('users')
    .select(
      'id',
      'username',
      'email',
      'status'
    )
    .whereRaw('LOWER(username) = ?', username.toLowerCase())
    .first();
};

//Create a new user
const insert = user => {
  return db('users').insert(user).returning([ 'id', 'username' ]);
};

//Update a user
const update = (id, user) => {
  return db('users')
    .where('id', Number(id))
    .update(user);
}

// remove a user
const remove= id => {
  return db('users')
    .where('id', Number(id))
    .del();
}


module.exports = {
  getUsers,
  findById,
  findByUsername,
  insert,
  update,
  remove
};

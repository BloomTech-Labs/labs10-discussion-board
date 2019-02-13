const db = require('../dbConfig.js');

//Gets all of the users in the db
const getUsers = () => {
  return db('users');
};

//Gets a user by their id
const findById = (id) => {
  return db('users')
    .where({ id: Number(id) })
    .first();
}

module.exports = {
  getUsers,
  findById
};

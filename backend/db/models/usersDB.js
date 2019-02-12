const db = require('../dbConfig.js');

const getUsers = () => {
  return db('users');
};

module.exports = {
  getUsers
};

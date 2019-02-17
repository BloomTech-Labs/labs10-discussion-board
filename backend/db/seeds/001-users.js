// External API containing mock data for various endpoints
const faker = require('faker');
const bcrypt = require('bcryptjs');
const { numOfFakeUsers, numOfHashes } = require('../../config/globals.js');

// For loop to generate numOfFakeUsers
const generateSeeds = () => {
  let arr = [];
  for (let i = 0; i < numOfFakeUsers; i++) {
    arr.push({
      username: faker.internet.userName(),
      password: 'pass',
      email: faker.internet.email(),
      status: 'active'
    });
  }

  // our test accounts (owners) for authentication/authorization
  arr.push({
    username: 'james',
    password: bcrypt.hashSync('pass1', numOfHashes),
    email: 'james@example.com',
    status: 'active'
  });
  arr.push({
    username: 'carlos',
    password: bcrypt.hashSync('carlos', numOfHashes),
    email: null,
    status: 'active'
  });
  arr.push({
    username: 'david',
    password: bcrypt.hashSync('david', numOfHashes),
    email: null,
    status: 'active'
  });
  arr.push({
    username: 'huth',
    password: bcrypt.hashSync('huth', numOfHashes),
    email: null,
    status: 'active'
  });
  arr.push({
    username: 'lucas',
    password: bcrypt.hashSync('lucas', numOfHashes),
    email: null,
    status: 'active'
  });
  return arr;
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries for users table
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert(generateSeeds());
    });
};

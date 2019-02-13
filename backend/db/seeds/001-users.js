// External API containing mock data for various endpoints
const faker = require('faker');
const bcrypt = require('bcryptjs');
const { numOfFakeUsers, numOfHashes } = require('../../config/globals.js');

// For loop to generate numOfFakeUsers for users
const generateSeeds = () => {
  let arr = [];
  for (let i = 0; i < numOfFakeUsers; i++) {
    arr.push({
      username: faker.internet.userName(),
      password: bcrypt.hashSync('pass', numOfHashes),
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
    password: bcrypt.hashSync('pass2', numOfHashes),
    email: null,
    status: 'active'
  });
  arr.push({
    username: 'david',
    password: bcrypt.hashSync('pass3', numOfHashes),
    email: null,
    status: 'active'
  });
  arr.push({
    username: 'huth',
    password: bcrypt.hashSync('pass4', numOfHashes),
    email: null,
    status: 'active'
  });
  arr.push({
    username: 'lucas',
    password: bcrypt.hashSync('pass5', numOfHashes),
    email: null,
    status: 'active'
  });
  return arr;
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert(generateSeeds());
    });
};
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
      status: 'active',
      created_at: Date.parse(faker.date.between('2019-01-01', '2019-02-02'))
    });
  }

  // our test accounts (owners) for authentication/authorization
  arr.push({
    username: 'james',
    password: bcrypt.hashSync('pass1', numOfHashes),
    email: 'james@example.com',
    status: 'active',
    created_at: Date.parse(faker.date.between('2019-01-01', '2019-02-02'))
  });
  arr.push({
    username: 'carlos',
    password: bcrypt.hashSync('carlos', numOfHashes),
    email: null,
    status: 'active',
    created_at: Date.parse(faker.date.between('2019-01-01', '2019-01-10'))
  });
  arr.push({
    username: 'david',
    password: bcrypt.hashSync('david', numOfHashes),
    email: null,
    status: 'active',
    created_at: Date.parse(faker.date.between('2019-01-01', '2019-02-02'))
  });
  arr.push({
    username: 'huth',
    password: bcrypt.hashSync('huth', numOfHashes),
    email: null,
    status: 'active',
    created_at: Date.parse(faker.date.between('2019-01-01', '2019-02-02'))
  });
  arr.push({
    username: 'lucas',
    password: bcrypt.hashSync('lucas', numOfHashes),
    email: null,
    status: 'active',
    created_at: Date.parse(faker.date.between('2019-01-01', '2019-02-02'))
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

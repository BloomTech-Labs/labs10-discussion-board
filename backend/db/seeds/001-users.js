
// External API containing mock data for various endpoints
const faker = require('faker')

// For loop to generate 500 users
const generateSeeds = () => {
  let arr = []
  for (let i=0; i < 500; i++){
    arr.push({
        username: faker.internet.userName(),
        password: 'pass',
        email: faker.internet.email(),
        status: 'active'
    })
  }
  return arr
}


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert(generateSeeds());
    });
};

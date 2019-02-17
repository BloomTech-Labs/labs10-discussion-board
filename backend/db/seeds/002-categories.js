const faker = require('faker');

const {
  getRandomUserId,
  categoryNames
} = require('../../config/globals.js');

const generateSeeds = () => {
  let arr = [];
  for (let i = 0; i < categoryNames.length; i++) {
    arr.push({
      user_id: getRandomUserId(),
      name: categoryNames[i],
      created_at: faker.date.recent(3)
    });
  };
  return arr;
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert(generateSeeds());
    });
};

const faker = require('faker');

const { getRandomUserId, categoryNames } = require('../../config/globals.js');

const generateSeeds = () => {
  let arr = [];
  for (let i = 0; i < categoryNames.length; i++) {
    // prettier-ignore
    arr.push({
      user_id: getRandomUserId(),
      name: categoryNames[i],
      created_at: Date.parse(
        faker.date.between(
          new Date(Date.now() - (1000 * 60 * 60 * 24 * 7)),
          new Date(Date.now() - (1000 * 60 * 60 * 24 * 4))
        )
      )
    });
  }
  return arr;
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('categories').insert(generateSeeds());
    });
};

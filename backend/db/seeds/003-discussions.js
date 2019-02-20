const faker = require('faker');

const {
  numOfDiscussions,
  getRandomUserId,
  categoryNames,
  getRandomIntInclusive
} = require('../../config/globals.js');

const generateSeeds = () => {
  let arr = [];
  for (let i = 1; i <= numOfDiscussions; i++) {
    arr.push({
      user_id: getRandomUserId(),
      category_id: getRandomIntInclusive(1, categoryNames.length),
      title: faker.lorem.sentence(4),
      body: faker.lorem.sentences(3),
      created_at: Date.parse(faker.date.between('2019-01-21', '2019-01-30'))
    });
  }
  return arr;
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('discussions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('discussions').insert(generateSeeds());
    });
};

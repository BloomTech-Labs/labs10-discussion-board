const faker = require('faker');

const {
  getRandomIntInclusive,
  getRandomUserId,
  numOfDiscussions,
  numOfPosts
} = require('../../config/globals.js');

const generateSeeds = () => {
  let arr = [];
  // prettier-ignore
  for (let i = 1; i <= numOfPosts; i++) {
    arr.push({
      user_id: getRandomUserId(),
      discussion_id: getRandomIntInclusive(1, numOfDiscussions),
      body: faker.lorem.sentence(),
      created_at: Date.parse(
        faker.date.between(
          new Date(Date.now() - (1000 * 60 * 60 * 13)),
          new Date(Date.now())
        )
      )
    });
  }
  return arr;
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('posts').insert(generateSeeds());
    });
};

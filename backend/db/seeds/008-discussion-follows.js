const{
  numOfDiscussions,
} = require('../../config/globals.js');

const generateSeeds = () => {
  let arr = [];
  for (let i = 1; i <= numOfDiscussions; i++) {
    arr.push({
      discussion_id: i,
      user_id: i,
    });
  }
  // manually add 2 seeds to james fake profile
  arr.push({ discussion_id: 1, user_id: 501 });
  arr.push({ discussion_id: 2, user_id: 501 });
  return arr;
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('discussion_follows').del()
    .then(function () {
      // Inserts seed entries
      return knex('discussion_follows').insert(generateSeeds());
    });
};
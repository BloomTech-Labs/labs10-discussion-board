const{
  numOfCategories,
} = require('../../config/globals.js');

const generateSeeds = () => {
  let arr = [];
  for (let i = 1; i <= numOfCategories; i++) {
    arr.push({
      category_id: i,
      user_id: i,
    });
  }
  // manually add 2 seeds to james fake profile
  arr.push({ category_id: 1, user_id: 501 });
  arr.push({ category_id: 2, user_id: 501 });
  return arr;
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('category_follows').del()
    .then(function () {
      // Inserts seed entries
      return knex('category_follows').insert(generateSeeds());
    });
};
// const faker = require('faker');

// const { getRandomUserId, categoryNames } = require('../../config/globals.js');

// const generateSeeds = () => {
//   let arr = [];
//   for (let i = 0; i < categoryNames.length; i++) {
//     // prettier-ignore
//     arr.push({
//       user_id: getRandomUserId(),
//       name: categoryNames[i],
//       created_at: Date.parse(
//         faker.date.between(
//           new Date(Date.now() - (1000 * 60 * 60 * 24 * 7)),
//           new Date(Date.now() - (1000 * 60 * 60 * 24 * 4))
//         )
//       )
//     });
//   }
//   return arr;
// };

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('categories').insert([
        {user_id: '1', name: 'Tech Talk', created_at: Date.parse(new Date(Date.now()))},
        {user_id: '2', name: 'Sports', created_at: Date.parse(new Date(Date.now()))},
        {user_id: '3', name: 'Cars', created_at: Date.parse(new Date(Date.now()))},
        {user_id: '4', name: 'Anime', created_at: Date.parse(new Date(Date.now()))},
        {user_id: '5', name: 'TV Shows', created_at: Date.parse(new Date(Date.now()))},
        {user_id: '6', name: 'Movies', created_at: Date.parse(new Date(Date.now()))},
        {user_id: '7', name: 'Music', created_at: Date.parse(new Date(Date.now()))},
      ]);
    });
};

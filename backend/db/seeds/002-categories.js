
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {user_id: 1, name: 'Tech Talk'},
        {user_id: 4, name: 'Sports'},
        {user_id: 7, name: 'Cars'},
        {user_id: 2, name: 'Anime'},
        {user_id: 9, name: 'TV Shows'},
        {user_id: 3, name: 'Movies'},
        {user_id: 3, name: 'Music'}
      ]);
    });
};

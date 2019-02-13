
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('discussions').del()
    .then(function () {
      // Inserts seed entries
      return knex('discussions').insert([
        {user_id: 1, category_id: 1, title: 'React Hooks'},
        {user_id: 4, category_id: 1, title: 'New in Python'},
        {user_id: 5, category_id: 4, title: 'One Piece Theories'},
        {user_id: 3, category_id: 2, title: 'Kobe Bryant: GOAT or NO?'},
        {user_id: 10, category_id: 5, title: 'Simpsons: How Long Will They Go?'},
      ]);
    });
};

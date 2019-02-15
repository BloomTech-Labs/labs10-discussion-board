exports.up = function(knex, Promise) {
  return knex.schema.createTable('category_votes', function(tbl) {
    /*  Relationship
      - many user_id's can vote on many category_id's
      - many category_id's can have many user_id's vote on it
      - one vote per many relationships between user_id and category_id
    */

    // categories reference key
    tbl
      .integer('category_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('categories');

    // users reference key
    tbl
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users');

    tbl.boolean('vote', 32).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('category_votes');
};

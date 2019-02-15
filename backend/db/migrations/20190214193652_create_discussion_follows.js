exports.up = function(knex, Promise) {
  return knex.schema.createTable('create_user_settings', function(tbl) {
    /*  Relationship
      - many user_id's can have/follow many discussion_id's
      - many discussion_id's can have many user_id's/followers
    */

    // discussions reference key
    tbl
      .integer('discussion_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('discussions');

    // users reference key
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('create_user_settings');
};

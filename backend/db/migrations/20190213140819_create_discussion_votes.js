exports.up = function(knex, Promise) {
  return knex.schema.createTable('discussion_votes', function(tbl) {
    //Foreign Key 'discussion_id'
    tbl
      .integer('discussion_id')
      .references('id')
      .inTable('discussions')
      .notNullable();

    //Foreign Key 'user_id'
    tbl
      .integer('user_id')
      .references('id')
      .inTable('users')
      .notNullable();

    // 1 for upvote / -1 for downvote
    tbl.integer('type').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('discussion_votes');
};

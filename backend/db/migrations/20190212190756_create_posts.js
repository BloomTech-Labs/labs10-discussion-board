exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(tbl) {
    // Primary Key 'id'
    tbl.increments();

    //Foreign Key 'user_id'
    tbl
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');

    //Foreign Key 'discussion_id'
    tbl
      .integer('discussion_id') //6
      .references('id')
      .inTable('discussions')
      .notNullable();

    // Other Columns
    tbl.text('body').notNullable();

    tbl.string('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts');
};

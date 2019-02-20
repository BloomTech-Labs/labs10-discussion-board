exports.up = function(knex, Promise) {
  return knex.schema.createTable('discussions', function(tbl) {
    // Primary Key 'id'
    tbl.increments();

    //Foreign Key 'users_id'
    tbl
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');

    //Foreign Key 'category_id'
    tbl
      .integer('category_id')
      .references('id')
      .inTable('categories')
      .notNullable()
      .onDelete('CASCADE');

    // Other Columns
    tbl.string('title').notNullable();

    tbl.text('body', 400).notNullable();

    tbl.string('created_at').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('discussions');
};

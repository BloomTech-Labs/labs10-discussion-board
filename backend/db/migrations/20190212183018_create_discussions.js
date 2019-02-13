exports.up = function(knex, Promise) {
    return knex.schema.createTable('discussions', function(tbl) {
      // Primary Key 'id'
      tbl.increments();

      //Foreign Key 'users_id'
      tbl
        .integer('user_id')
        .references('id')
        .inTable('users')
        .notNullable();

     //Foreign Key 'category_id'
      tbl  
        .integer('category_id')
        .references('id')
        .inTable('categories')
        .notNullable();

      // Other Columns
      tbl
        .string('title')
        .notNullable();

      tbl
        .text('body', 400);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('discussions');
  };
  
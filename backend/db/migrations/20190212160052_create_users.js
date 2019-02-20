exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (tbl) {
    // Primary Key 'id'
    tbl.increments();

    // username
    tbl
      .string('username', 64)
      .notNullable()
      .unique();

    // password
    tbl.string('password', 128);

    // email
    tbl.string('email', 128).unique();

    // inactive, active, and banned
    tbl.string('status', 16).notNullable();

    // Date in milliseconds
    tbl.bigInteger('created_at').notNullable();

    tbl
      .string('email_confirm', 36) // length of uuid
      .index(); // for faster searching
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};

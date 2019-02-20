const { defaultAvatar } = require('../../config/globals.js');

exports.up = function (knex, Promise) {
  return knex.schema.createTable('user_settings', function (tbl) {
    /*  Relationship
      - One user_id to one id
    */

    // users reference key
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    // avatar: base64
    tbl.text('avatar').defaultTo(defaultAvatar);

    // Account type: user, bronze_member, silver_member, gold_member, and admin
    // Note: admin can be set only by postgress query command
    tbl.string('user_type', 32).defaultTo('user');

    // Signature
    tbl.string('signature');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('user_settings');
};

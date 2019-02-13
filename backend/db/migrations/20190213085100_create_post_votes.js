exports.up = function(knex, Promise) {
    return knex.schema.createTable('post_votes', function(tbl) {
		//Foreign Key 'post_id'
		tbl
			.integer('post_id')
			.references('id')
			.inTable('posts')
			.notNullable();

		//Foreign Key 'user_id'
		tbl
			.integer('user_id')
			.references('id')
			.inTable('users')
			.notNullable();

		// true for upvote / false for downvote
		tbl
			.boolean('type')
			.notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('post_votes');
};

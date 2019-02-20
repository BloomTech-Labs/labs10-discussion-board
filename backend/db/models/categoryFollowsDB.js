const db = require('../dbConfig.js');

// checks to see if user_id is following category_id
const get = (category_id, user_id) => {
	return db('category_follows')
		.where({ user_id })
		.andWhere({ category_id });
};

// adds a follow for a certain category by a certain user
const add = (category_id, user_id) => {
	const addCategoryFollow = db('category_follows')
	  .insert({ category_id, user_id });
	const getCategoryFollows = db('category_follows')
	  .select('category_id')
	  .where({ user_id });
	const promises = [ addCategoryFollow ];
	return Promise.all(promises)
	  .then(() => {
		return Promise.all([ getCategoryFollows ])
		  .then(results => {
			let [ getCategoryFollowsResults ] = results;
			getCategoryFollowsResults = getCategoryFollowsResults.map(follow => follow.category_id);
			return getCategoryFollowsResults;
		  });
	});
};

// remove a follow from a certin category by a certain user
const remove = (category_id, user_id) => {
	const removeCategory = db('category_follows')
		.where({ user_id })
		.andWhere({ category_id })
    .del();
  const getCategoryFollows = db('category_follows')
    .select('category_id')
    .where({ user_id });
  return Promise.all([ removeCategory])
    .then(() => {
      return Promise.all([ getCategoryFollows ])
        .then(results => {
          let [ getCategoryFollowsResults ] = results;
          getCategoryFollowsResults = getCategoryFollowsResults.map(follow => follow.category_id);
          return getCategoryFollowsResults;
        });
    });
};

module.exports = {
	add,
	get,
	remove,
};
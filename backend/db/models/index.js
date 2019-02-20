const categoriesDB = require('./categoriesDB.js')
const discussionsDB = require('./discussionsDB.js');
const discussionVotesDB = require('./discussionVotesDB.js');
const postsDB = require('./postsDB.js');
const usersDB = require('./usersDB.js');
const discussionFollowsDB = require('./discussionFollowsDB.js');
const categoryFollowsDB = require('./categoryFollowsDB.js');

module.exports = {
	categoriesDB,
	discussionsDB,
	discussionVotesDB,
	postsDB,
	usersDB,
	discussionFollowsDB,
	categoryFollowsDB,
};

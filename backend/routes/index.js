const authRouter = require('./authRouter.js');
const categoriesRouter = require('./categoriesRouter.js')
const discussionsRouter = require('./discussionsRouter.js');
const discussionVotesRouter = require('./discussionVotesRouter.js');
const postsRouter = require('./postsRouter.js');
const usersRouter = require('./usersRouter.js');

module.exports = {
  authRouter,
  categoriesRouter,
  discussionsRouter,
  discussionVotesRouter,
  postsRouter,
  usersRouter
};

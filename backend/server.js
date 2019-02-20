/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { errorHandler } = require('./config/middleware/errorHandler.js');

/***************************************************************************************************
 ******************************************** middleware ********************************************
 **************************************************************************************************/
const server = express();
server.use(helmet()); // hides your tech stack from sniffers
server.use(express.json()); // built-in
server.use(morgan('dev')); // logging middleware for console
server.use(cors()); // allows domains/ports to connect to your server

/***************************************************************************************************
 ********************************************** routes **********************************************
 **************************************************************************************************/
// Home Page
server.get('/', (req, res) => {
  res.send(`WEB APP IS RUNNING...`);
});

// Routes/Endpoints
const {
  authRouter,
  categoriesRouter,
  discussionsRouter,
  discussionVotesRouter,
  postsRouter,
  postVoteRouter,
  testRouter,
  usersRouter,
  discussionFollowsRouter,
} = require('./routes/index.js');

server.use('/auth', authRouter);
server.use('/categories', categoriesRouter);
server.use('/discussions', discussionsRouter);
server.use('/discussion-votes', discussionVotesRouter);
server.use('/posts', postsRouter);
server.use('/post-votes', postVoteRouter);
server.use('/tests', testRouter);
server.use('/users', usersRouter);
server.use('/discussion-follows', discussionFollowsRouter);

server.use(errorHandler); // This line needs to be after all routes

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = server;

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
<<<<<<< HEAD
const { usersRouter, authRouter } = require('./routes/index.js');
server.use('/users', usersRouter);
server.use('/auth', authRouter);
=======
const {
  postsRouter,
  usersRouter,
} = require('./routes/index.js');
server.use('/users', usersRouter);
server.use('/posts', postsRouter);
>>>>>>> 3166f6829f0739abf04fb977132b9c1cfcca54e2

server.use(errorHandler); // This line needs to be after all routes

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = server;

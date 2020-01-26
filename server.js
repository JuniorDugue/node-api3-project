const express = require('express');

// const userRouter = require('./users/userRouter');
// const postRouter = require('./posts/postRouter');

// built in
const server = express();
const helmet = require('helmet');
// const morgan = require('morgan');

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
server.use(helmet());
server.use(logger);
// server.use(morgan('dev'));
// server.use(userRouter);
// server.use(postRouter);

function logger(req, res, next) {
  console.log(`${req.method} Request, ${req.url}, Date.now()`)
  next();
}


module.exports = server;

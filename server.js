const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const server = express();

server.use(bodyParser.json());
server.use(logger);
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const endpoint = req.originalUrl;
  const timestamp = new Date();

  console.log(`${method} to ${endpoint} at ${timestamp}`);
  next();
}

module.exports = server;

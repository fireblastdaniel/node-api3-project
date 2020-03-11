const express = require('express');

const server = express();

server.use(logger);
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

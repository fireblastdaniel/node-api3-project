const express = require('express');

const Users = require('./userDb');
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const userId = req.body.id;
  Users.getById(userId).then(resource => {
    if (resource) {
      req.user = resource;
      next();
    } else {
      res.status(400).json({ message: 'invalid user id' });
    }
  });
}

function validateUser(req, res, next) {
  // do your magic!
  const user = req.body;
  !user ? res.status(400).json({ message: 'missing user data' }) : null;
  !user.name
    ? res.status(400).json({ message: 'missing required name field' })
    : null;
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  const post = req.body;
  !post ? res.status(400).json({ message: 'missing post data' }) : null;
  !post.text
    ? res.status(400).json({ message: 'missing required text field' })
    : null;
  next();
}

module.exports = router;

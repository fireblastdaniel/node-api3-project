const express = require('express');

const Users = require('./userDb');
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

//200
//500
//WORKING
router.get('/', (req, res) => {
  Users.get()
    .then(resources => {
      res.status(200).json({ resources });
    })
    .catch(error =>
      res
        .status(500)
        .json({ message: 'There was an error retrieving the user data' })
    );
});

//200
//400 --> validateUserId
//500 --> validateUserId
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

//200
//400 --> validateUserId
//500 --> validateUserId,
router.get('/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params;
  Users.getUserPosts(id)
    .then(resources => res.status(200).json(resources))
    .catch(error =>
      res
        .status(500)
        .json({ message: 'There was an error retrieving the posts.' })
    );
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
    .then(resource => {
      if (resource) {
        req.user = resource;
        next();
      } else {
        res.status(400).json({ message: 'invalid user id' });
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ message: 'There was an error retrieving the user' });
    });
}

function validateUser(req, res, next) {
  const user = req.body;
  !user ? res.status(400).json({ message: 'missing user data' }) : null;
  !user.name
    ? res.status(400).json({ message: 'missing required name field' })
    : null;
  next();
}

function validatePost(req, res, next) {
  const post = req.body;
  !post ? res.status(400).json({ message: 'missing post data' }) : null;
  !post.text
    ? res.status(400).json({ message: 'missing required text field' })
    : null;
  next();
}

module.exports = router;

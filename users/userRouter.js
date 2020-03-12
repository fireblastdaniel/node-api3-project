const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb');
const router = express.Router();

//201
//400 --> validateUser
//500
//WORKING
router.post('/', validateUser, (req, res) => {
  const user = req.body;
  Users.insert(user)
    .then(resource => {
      res.status(200).json(resource);
    })
    .catch(error =>
      res.status(500).json({ message: 'There was an error adding the user.' })
    );
});

//201
//400 --> validateUserId, validatePost
//500
//WORKING
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const post = req.body;
  const { id } = req.params;
  post.user_id = id;
  Posts.insert(post)
    .then(resource => res.status(200).json(resource))
    .catch(error =>
      res.status(500).json({ message: 'There was an error adding the post' })
    );
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
//WORKING
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

//200
//400 --> validateUserId
//500 --> validateUserId, getUserPosts
//WORKING
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

//200
//400 --> validateUserId
//500
//WORKING
router.delete('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(deleted => res.status(200).json({ message: 'Delete successful' }))
    .catch(error =>
      res.status(500).json({ message: 'There was an error deleting the user' })
    );
});

//200
//400 --> validateUserId
//500
//
router.put('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Users.update(id, changes)
    .then(updated => res.status(200).json({ message: 'Update successful' }))
    .catch(error =>
      res.status(500).json({ message: 'There was a problem updating the user' })
    );
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
  console.log(req.body);
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

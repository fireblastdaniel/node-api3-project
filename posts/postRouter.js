const express = require('express');

const Posts = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
  Posts.get()
    .then(resources => res.status(200).json(resources))
    .catch(error =>
      res
        .status(400)
        .json({ message: 'There was an error retrieving the posts' })
    );
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
  const { id } = req.params;
  Posts.remove(id)
    .then(deleted => {
      res.status(200).json({ message: 'Post deleted' });
    })
    .catch(error =>
      res.status(500).json({ message: 'There was an error deleting the post' })
    );
});

router.put('/:id', validatePostId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Posts.update(id, changes)
    .then(updated => res.status(200).json({ message: 'Update successful' }))
    .catch(error =>
      res.status(500).json({ message: 'There was an error updating the post' })
    );
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  Posts.getById(id)
    .then(resource => {
      if (resource) {
        req.post = resource;
        next();
      } else {
        res.status(400).json({ message: 'invalid post id' });
      }
    })
    .catch(error =>
      res
        .status(500)
        .json({ message: 'There was an error retrieving the post' })
    );
}

module.exports = router;

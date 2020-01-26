const express = require('express');

const router = express.Router();

// const dbPosts = require('../posts/postDb');

//to access postDb in posts
const posts = require('./postDb');

router.get('/', async (req, res) => {
  // do your magic!
  try{
    posts.get()
    then(data => res.json(data))
  } catch (error) {
    res.status(404).json({message: "could not find posts"})
  }
});

router.get('/:id', async, validatePostId(), (req, res) => {
  // do your magic!
  try{
    posts.getById(req.params.id)
    data => res.json(data)
  } catch (error) {
    res.status(404).json({message: "could not find id"})
  }
});

router.delete('/:id', async, validatePostId(), (req, res) => {
  // do your magic!
  try{
    // posts.remove(req.params.id)
    const count = await posts.remove(req.params.id) 
      if(count > 0) {
      res.status(200).json({message: 'post has been DELETED!'});
    } else {
      res.status(404).json({message: 'post with specified id doesnt exist'})
    }
  } catch (error) {
    res.status(500).json({message: 'couldnt delete post'})
  }
});

router.put('/:id', async, validatePostId, (req, res) => {
  // do your magic!
  // try{
    // const post = await posts.remove(req.params.id)
    posts.update(req.params.id, req.text)
    .then(data => res.json(data))
    .catch(err => res.status(404).json({message: 'could not update post'}))
  // }
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  // try{
    posts.getById(req.params.id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({message: "couldn't find post id"})
      }
    })
  // }
}

module.exports = router;

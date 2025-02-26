import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

// Get all posts
// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single post
// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

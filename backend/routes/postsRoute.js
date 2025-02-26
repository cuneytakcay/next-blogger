import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

// Get all posts
// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Could not get posts...' });
  }
});

// Get a single post
// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Could not find post...' });
  }
});

// Create a new post
// POST /api/posts
router.post('/', async (req, res) => {
  const { title, content, author } = req.body;

  const newPost = new Post({
    title,
    content,
    author,
  });

  try {
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: 'Could not create post...' });
  }
});

export default router;

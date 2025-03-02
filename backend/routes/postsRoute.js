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

// Create a new draft of a post
// POST /api/posts/draft
router.post('/draft', async (req, res) => {
  const { title, content, author, categories } = req.body;

  const newPost = new Post({
    title,
    content,
    author,
    categories,
  });

  try {
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: 'Could not create post...' });
  }
});

// Update a draft of a post
// PATCH /api/posts/:id
router.patch('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Delete a draft of a post
// DELETE /api/posts/:id
router.delete('/:id', async (req, res) => {
  try {
    // Make sure the post is a draft
    const post = await Post.findById(req.params.id);

    if (post.isPublished) {
      return res
        .status(400)
        .json({ message: 'Published posts cannot be deleted' });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

export default router;

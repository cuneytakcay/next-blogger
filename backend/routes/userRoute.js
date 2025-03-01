import express from 'express';
import isAuthenticated from '../middlewares/authenticateUser.js';

const router = express.Router();

// Get user profile
// GET /api/profile
router.get('/', isAuthenticated, (req, res) => {
  const { _id, name, email, avatar, role, bio, posts } = req.user;

  res.json({
    message: 'User profile data',
    user: {
      _id,
      name,
      email,
      avatar,
      role,
      bio,
      posts,
    },
  });
});

export default router;

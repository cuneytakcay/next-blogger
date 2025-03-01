import express from 'express';
import isAuthenticated from '../middlewares/authenticateUser.js';
import User from '../models/User.js';

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

// Update user profile
// PATCH /api/profile
router.patch('/', isAuthenticated, async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: 'User profile updated',
      user,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Delete user profile
// DELETE /api/profile
router.delete('/', isAuthenticated, async (req, res) => {
  const { _id } = req.user;

  try {
    await User.findByIdAndDelete(_id);

    res.status(200).json({
      message: 'User account deleted',
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

export default router;

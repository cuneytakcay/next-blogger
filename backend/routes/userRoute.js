import express from 'express';
import isAuthenticated from '../middlewares/authenticateUser.js';

const router = express.Router();

// Get user profile
// GET /api/profile
router.get('/', isAuthenticated, (req, res) => {
  const { name, email, avatar } = req.user;

  res.json({
    message: 'User profile data',
    user: {
      name,
      email,
      avatar,
    },
  });
});

export default router;

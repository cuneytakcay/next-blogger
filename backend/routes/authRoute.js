import express from 'express';
import passport from '../passportConfig.js';
import User from '../models/User.js';

const router = express.Router();

// Google OAuth Login
// GET /auth/google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
// GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.redirect('/api/profile');
  }
);

// Local register (email/password)
// POST /auth/register
router.post('/register', async (req, res) => {
  try {
    const user = await User.register(req.body);

    // Destructure the user object to hide the password
    const { password, ...userData } = user.toObject();

    res.status(201).json({ user: userData });
  } catch (err) {
    const message = err.code === 11000 ? 'User already exists' : err.message;

    res.status(409).json({ message });
  }
});

// Logout
// GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

export default router;

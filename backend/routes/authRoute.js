import express from 'express';
import passport from '../config/passport.js';
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

// Local register (firstName/lastName/email/password)
// POST /auth/register
router.post('/register', async (req, res) => {
  try {
    const user = await User.registerLocal(req.body);

    // Destructure the user object to hide the password
    const { password, ...userData } = user.toObject();

    res.status(201).json({ user: userData });
  } catch (err) {
    const message = err.code === 11000 ? 'User already exists' : err.message;

    res.status(409).json({ message });
  }
});

// Local login (email/password)
// POST /auth/login
router.post('/login', passport.authenticate('local'), (req, res) => {
  // Destructure the user object to hide the password
  const { password, ...user } = req.user.toObject();

  res.status(200).json({ user });
});

// Logout
// GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        message: 'An error occurred during logout. Please try again.',
      });
    }

    // Destroy the session from DB
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          message: 'Failed to clear session.',
        });
      }

      res.status(200).json({ message: 'Logout successful' });
    });
  });
});

export default router;

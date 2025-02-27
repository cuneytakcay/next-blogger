import express from 'express';
import passport from '../passportConfig.js';

const router = express.Router();

// Google OAuth
// GET /auth/google
router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
// GET /auth/google/callback
router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.redirect('/api/profile');
  }
);

export default router;

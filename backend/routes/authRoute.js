import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
};

// Login to get a JWT token
// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const user = await User.login(req.body);
    const token = createToken(user._id);

    // Destructure the user object to hide the password
    const { password, ...userData } = user.toObject();

    res.status(200).json({ token, user: userData });
  } catch (err) {
    res.status(401).json({ message: 'Invalid credentials...' });
  }
});

// Register a new user
// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const user = await User.register(req.body);
    const token = createToken(user._id);

    // Destructure the user object to hide the password
    const { password, ...userData } = user.toObject();

    res.status(201).json({ token, user: userData });
  } catch (err) {
    const message = err.code === 11000 ? 'User already exists' : err.message;

    res.status(409).json({ message });
  }
});

export default router;

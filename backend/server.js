import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from './passportConfig.js';
import postsRoute from './routes/postsRoute.js';
import googleAuthRoute from './routes/googleAuthRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

// Routes
app.use('/auth/google', googleAuthRoute);
app.use('/api/posts', postsRoute);

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
    process.exit(1);
  });

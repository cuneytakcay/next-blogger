import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import MongoStore from 'connect-mongo';
import passport from './passportConfig.js';
import postsRoute from './routes/postsRoute.js';
import googleAuthRoute from './routes/googleAuthRoute.js';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';

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
    cookie: { secure: false }, // Set secure: true in production with HTTPS
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

// Routes
app.use('/auth/google', googleAuthRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);
app.use('/api/profile', userRoute);

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

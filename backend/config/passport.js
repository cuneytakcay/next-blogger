import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.js';

// Can't get clientID without this.
// Figure out the reason and fix it then remove this import
import dotenv from 'dotenv';
dotenv.config();

// If the user chooses to login with Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.registerGoogle(profile);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// If the user chooses to login with email and password
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'Invalid credentials...' });
        }

        // Compare entered password with the one stored in the database
        const validPassword = await user.comparePassword(password);

        if (!validPassword)
          return done(null, false, { message: 'Invalid credentials...' });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize and deserialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);

  done(null, user);
});

export default passport;

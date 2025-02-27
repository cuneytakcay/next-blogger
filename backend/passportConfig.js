import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import GoogleUser from './models/GoogleUser.js';

// Can't get clientID without this.
// Figure out the reason and fix it then remove this import
import dotenv from 'dotenv';
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await GoogleUser.findOne({ googleId: profile.id });

        if (!user) {
          // Create a new user if not found
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });

          await user.save();
        }

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

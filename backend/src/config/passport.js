const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

/**
 * Passport Configuration for OAuth2 and Local Authentication
 * Handles both Google OAuth and Local email/password authentication
 */

// Configure Google OAuth 2.0 Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Extract user info from Google profile
        const { id: googleId, displayName, emails } = profile;
        const email = emails && emails[0] ? emails[0].value : null;

        // Validation: Google must provide email
        if (!email) {
          return done(null, false, {
            message: 'Email not provided by Google'
          });
        }

        // Check if user already exists by googleId
        let user = await User.findOne({ googleId });

        if (user) {
          // User exists with Google ID, login them
          return done(null, user);
        }

        // Check if user exists by email (local account)
        user = await User.findOne({ email: email.toLowerCase() });

        if (user) {
          // User exists with local account
          // Link Google account to existing user
          user.googleId = googleId;
          user.authProvider = 'google';
          await user.save();
          return done(null, user);
        }

        // User doesn't exist, create new user
        user = await User.create({
          name: displayName || 'User',
          email: email.toLowerCase(),
          googleId,
          authProvider: 'google',
          password: null // Google users don't have passwords
        });

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Serialize user ID to session (optional, mainly for traditional session auth)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session (optional, mainly for traditional session auth)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;

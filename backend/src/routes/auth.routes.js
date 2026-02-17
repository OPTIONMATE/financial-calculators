const express = require('express');
const passport = require('passport');
const { register, login, logout, getMe, googleCallback, googleErrorHandler } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * Local Authentication Routes
 */
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware, getMe);

/**
 * Google OAuth 2.0 Routes
 */

// Initiate Google OAuth login
// Redirects user to Google consent screen
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Google OAuth callback URL
// Google redirects here after user consent
// Passport validates and populates req.user
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login?error=google_auth_failed',
    session: false // We use JWT, not sessions
  }),
  googleCallback
);

module.exports = router;

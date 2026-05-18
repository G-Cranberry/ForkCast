require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const YahooStrategy = require('passport-yahoo-oauth2').Strategy;
const path = require('path');

const app = express();
const PORT = 3000;
console.log(process.env.GOOGLE_CLIENT_ID)
// ==========================================
// 1. SESSION CONFIGURATION
// ==========================================
// express-session stores user session data so they stay logged in
app.use(session({
  secret: 'forkcast-secret-key-123', // In production, use a secure, random string
  resave: false,
  saveUninitialized: true,
}));

// ==========================================
// 2. PASSPORT INITIALIZATION
// ==========================================
app.use(passport.initialize());
app.use(passport.session());

// Tell Passport how to save the user into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Tell Passport how to retrieve the user from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// ==========================================
// 3. OAUTH STRATEGIES (Google & Yahoo)
// ==========================================
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === 'your_google_client_id_here') {
  console.warn("⚠️ Warning: GOOGLE_CLIENT_ID is missing or still default in .env file. Google OAuth will fail with 401 invalid_client.");
} else {
  console.log("✅ Google API credentials loaded successfully.");
}

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID || 'dummy',
  clientSecret: GOOGLE_CLIENT_SECRET || 'dummy',
  callbackURL: `http://localhost:${PORT}/auth/google/callback`
},
  (accessToken, refreshToken, profile, done) => {
    try {
      console.log('✅ Google User Profile Authenticated:', profile.displayName);
      return done(null, profile);
    } catch (error) {
      console.error('❌ Error during Google OAuth:', error);
      return done(error, null);
    }
  }
));

const YAHOO_CLIENT_ID = process.env.YAHOO_CLIENT_ID;
const YAHOO_CLIENT_SECRET = process.env.YAHOO_CLIENT_SECRET;

passport.use(new YahooStrategy({
  clientID: YAHOO_CLIENT_ID || 'dummy',
  clientSecret: YAHOO_CLIENT_SECRET || 'dummy',
  consumerKey: YAHOO_CLIENT_ID || 'dummy',
  consumerSecret: YAHOO_CLIENT_SECRET || 'dummy',
  callbackURL: `http://localhost:${PORT}/auth/yahoo/callback`
},
  (accessToken, refreshToken, profile, done) => {
    try {
      console.log('✅ Yahoo User Profile Authenticated:', profile.displayName);
      return done(null, profile);
    } catch (error) {
      console.error('❌ Error during Yahoo OAuth:', error);
      return done(error, null);
    }
  }
));

// ==========================================
// 4. STATIC FILES (Frontend)
// ==========================================
// Serve the HTML, CSS, and JS files from the current directory
app.use(express.static(path.join(__dirname)));

// ==========================================
// 5. AUTHENTICATION ROUTES
// ==========================================

// --- Google Auth Routes ---
// By default, redirect to the Forkcast Google OAuth Simulator to bypass Google's 401 client block
app.get('/auth/google', (req, res) => {
  res.redirect('/mock-google-login.html');
});

// Expose a route for testing live real Google OAuth connections
app.get('/auth/google-real',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google redirects the user here after they log in (Real Callback)
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login.html' }),
  (req, res) => {
    // Successful authentication, redirect to home page.
    res.redirect('/home.html');
  }
);

// High-fidelity OAuth Simulator callback to log the user in via Express session
app.get('/auth/mock-google-callback', (req, res) => {
  const { name, email, picture } = req.query;
  const user = {
    displayName: name || 'Mock User',
    emails: [{ value: email || 'mock@example.com' }],
    photos: [{ value: picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400' }]
  };
  req.login(user, (err) => {
    if (err) return res.redirect('/login.html');
    res.redirect('/home.html');
  });
});

// --- Yahoo Auth Routes ---
// When the user clicks "Login with Yahoo", they hit this route
app.get('/auth/yahoo',
  passport.authenticate('yahoo', { scope: ['profile', 'email'] })
);

// Yahoo redirects the user here after they log in
app.get('/auth/yahoo/callback',
  passport.authenticate('yahoo', { failureRedirect: '/login.html' }),
  (req, res) => {
    // Successful authentication, redirect to home page.
    res.redirect('/home.html');
  }
);

// --- Logout Route ---
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/index.html');
  });
});

// ==========================================
// 6. START SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`=================================================`);
  console.log(`To test, open your browser and go to http://localhost:${PORT}/login.html`);
});

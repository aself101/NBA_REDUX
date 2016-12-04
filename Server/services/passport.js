const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const jwt = require('jwt-simple');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  const user = new User();
  // Verify email & passport, call done with user if correct
  // Else call done with false
  user.selectUser(email)
    .then((user) => {
      if (!user) return done(null, false);
    }).catch((err) => { return done(err); });


  user.getPasswordAndCompare(email, password)
    .then((isMatch) => {
      if (!isMatch) return done(null, false);
      return done(null, user);
    }).catch((err) => { return done(err); });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const googleOptions = {
  clientID: config.clientID,
  clientSecret: config.clientSecret,
  callbackURL: config.callbackURL
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  const user = new User();
  // See if the user ID in the payload exists in our database
  // If it does, call done with the user
  // Else, call without user object
  user.selectUser(payload.sub)
    .then((user) => {
      if (user.length > 0) return done(null, user);
      else return done(null, false);
    }).catch((err) => { return done(err, false); });

});

const googleLogin = new GoogleStrategy(googleOptions, function(token, refreshToken, profile, done) {
  process.nextTick(function() {
    User.findById({ 'google.id': profile.id }, function(err, user) {
      if (err) return done(err, false);
      if (user) done(null, user);
      else {
        // If a user does not exist, create and save to database
        const newUser = new User();

        // set all of the relevant information
        newUser.google.id    = profile.id;
        newUser.google.token = token;
        newUser.google.name  = profile.displayName;
        newUser.google.email = profile.emails[0].value;

        newUser.save((err) => {
          if (err) return next(err);
          // Respond to request that user was created
          return done(null, user);
        });
      }
    });
  });
});

// Tell passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(googleLogin);




















/* END */

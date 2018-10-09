const passport = require("passport");
const {
  googleClientID,
  googleClientSecret,
  facebookID,
  facebookSecret
} = require("../config/keys");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Another alternative for the mismatch redirect would be to create a specif path
// For example instead of using /auth/facebook/callback we would use => http://localhost:5000/auth/facebook/callback for Dev mode
// and https://mydomain/auth/facebook/callback for Prod mode
// We could add those in our .env file as environment variables

passport.use(
  new FacebookStrategy(
    {
      clientID: facebookID,
      clientSecret: facebookSecret,
      callbackURL: "/auth/facebook/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ facebookID: profile.id });
      if (!user) user = await new User({ facebookID: profile.id }).save();
      done(null, user);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleID: profile.id });
      if (!user) user = await new User({ googleID: profile.id }).save();
      done(null, user);
    }
  )
);

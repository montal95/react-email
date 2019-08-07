const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//setup passport with google OAuth Strategy.
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    //response information
    async (accessToken, refreshToken, profile, done) => {
      //find out if user exists. The promise then creates the user if non-existent, passport strategy
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        //user already exists in collection. Finished passport strategy and returns existing user
        return done(null, existingUser);
      }
      //create new user in collection
      //save new user then finish passport strategy
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);

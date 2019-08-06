const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

//mongoose setup
mongoose.connect(keys.mongoURI);

// setup express
const app = express();

//sets up express and passport to use cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

//calls function from authRoutes while passing express app
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./models/Survey");
require("./services/passport");

//mongoose setup
mongoose.connect(keys.mongoURI);

// setup express
const app = express();

app.use(bodyParser.json());
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
require("./routes/billingRoutes")(app);

//
if (process.env.NODE_ENV === "production") {
  // Express will serve production assets
  //like main.js file
  app.use(express.static("client/build"));

  //Express will serve index.html if route not recognized
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

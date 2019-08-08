const passport = require("passport");

module.exports = app => {
  //routes
  app.get(
    "/auth/google/",
    passport.authenticate("google", {
      // scope: what we want to access from google
      scope: ["profile", "email"]
    })
  );

  //successful google login
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get("/api/current_user/", (req, res) => {
    res.send(req.user);
  });
};

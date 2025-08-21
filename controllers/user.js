const User = require("../models/userSchema");

module.exports.getReqForSignUp = (req, res) => {
  res.render("users/signup");
};

module.exports.postReqForSignUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (error) => {
      if (error) return next(error);
      else {
        req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listings");
      }
    });
  } catch (error) {
    req.flash("error", error.message || "Something went wrong");
    res.redirect("/signup");
  }
};

module.exports.getLogin = (req, res) => {
  res.render("users/login");
};

module.exports.postModule = async (req, res) => {
  req.flash("success", "Welcome to Wanderlust! You are logged in!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.getLogout = (req, res) => {
  req.logout((error) => {
    if (error) return next(error);
    req.flash("success", "You are Logged Out!");
    res.redirect("/listings");
  });
};

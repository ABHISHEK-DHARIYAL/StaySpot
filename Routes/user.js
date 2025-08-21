const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user");

router
  .route("/signup")
  .get(userController.getReqForSignUp)
  .post(saveRedirectUrl, wrapasync(userController.postReqForSignUp));

router.get("/login", userController.getLogin);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.postModule
);

router.get("/logout", userController.getLogout);

module.exports = router;

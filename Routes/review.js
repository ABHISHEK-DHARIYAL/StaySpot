const express = require("express");
const router = express.Router({ mergeParams: true });
const methodOverride = require("method-override");
const wrapAsync = require("../utils/wrapAsync");
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(methodOverride("_method"));
const listingReviewController = require("../controllers/review.js");

const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(listingReviewController.reviewPost)
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(listingReviewController.destroyReviewRoute)
);

module.exports = router;

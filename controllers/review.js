const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listingSchema.js");
const methodOverride = require("method-override");
const ExpressError = require("../utils/ExpressError");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(methodOverride("_method"));

const Review = require("../models/reviewSchema.js");

module.exports.reviewPost = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(new ExpressError(404, "Listing not found"));
  }
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReviewRoute = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted");
  res.redirect(`/listings/${id}`);
};

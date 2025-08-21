const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const wrapAsync = require("../utils/wrapAsync");
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(methodOverride("_method"));
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const {
  Types: { ObjectId },
} = mongoose;

router
  .route("/")
  .get(wrapAsync(listingController.indexRoute))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createRoute)
  );

router.get("/search", wrapAsync(listingController.search));

router.get("/filter/:category", wrapAsync(listingController.filterListings));

router.get("/weather", listingController.weatherRoute);

router.post("/delete", isLoggedIn, listingController.deleteUser);

router.get("/new", isLoggedIn, listingController.newRoute);

router
  .route("/:id")
  .get(wrapAsync(listingController.showRoute))
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.updateRoute)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyRoute));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editRoute)
);

module.exports = router;

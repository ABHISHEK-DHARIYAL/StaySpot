const Listing = require("../models/listingSchema.js");
const express = require("express");
const axios = require("axios");
const router = express.Router();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(methodOverride("_method"));
const { cloudinary } = require("../cloudConfig.js");
const Review = require("../models/reviewSchema.js");
const User = require("../models/userSchema.js");

module.exports.indexRoute = async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  } catch (error) {
    console.log(error);
  }
};

module.exports.newRoute = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showRoute = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash("error", `Listing You requested {${id}} does not exist`);
      return res.redirect("/listings");
    }
    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
    res.render("listings/show.ejs", { listing });
  } catch (error) {
    console.error(error);
  }
};

module.exports.createRoute = async (req, res, next) => {
  try {
    let place = req.body.listing.location + ", " + req.body.listing.country;
    const geoRes = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: place,
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "MyMapProject/1.0 (your-email@example.com)",
          "Accept-Language": "en",
        },
      }
    );

    const data = await geoRes.data;
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);

    if (data.length > 0) {
      newListing.geometry = {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    } else {
      newListing.geometry = {
        lat: 0,
        lon: 0,
      };
    }
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  } catch (error) {
    next(error);
  }
};

module.exports.editRoute = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", `Listing You requested {${id}} does not exist`);
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateRoute = async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", `Listing You requested {${id}} does not exist`);
    return res.redirect("/listings");
  }
  let updatedData = { ...req.body.listing };
  if (req.file) {
    updatedData.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }
  if (updatedData.location && updatedData.country) {
    try {
      const geoRes = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: `${updatedData.location}, ${updatedData.country}`,
            format: "json",
            limit: 1,
          },
        }
      );
      if (geoRes.data.length > 0) {
        updatedData.geometry = {
          lat: parseFloat(geoRes.data[0].lat),
          lon: parseFloat(geoRes.data[0].lon),
        };
      } else {
        updatedData.geometry = { lat: 0, lon: 0 };
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      updatedData.geometry = { lat: 0, lon: 0 };
    }
  }
  const listing = await Listing.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyRoute = async (req, res) => {
  try {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }
    if (listing.image && listing.image.filename) {
      await cloudinary.uploader.destroy(listing.image.filename);
    }
    let deleteListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
  } catch (error) {
    console.log(error);
  }
};

module.exports.filterListings = async (req, res, next) => {
  const category = req.params.category.replace(/-/g, " ");
  const listings = await Listing.find({ category });
  res.render("listings/index", {
    allListings: listings,
    selectedCategory: category,
  });
};

module.exports.weatherRoute = (req, res) => {
  const location = req.query.location || "Jaipur,Rajasthan";
  res.render("weather-app/index", { location });
};

module.exports.deleteUser = async (req, res) => {
  const userId = req.user._id;
  const listings = await Listing.find({ owner: userId });
  for (let listing of listings) {
    if (listing.image && listing.image.filename) {
      await cloudinary.uploader.destroy(listing.image.filename);
    }
  }

  await Listing.deleteMany({ owner: userId });
  await Review.deleteMany({ author: userId });
  await User.findByIdAndDelete(userId);

  req.logout((err) => {
    if (err) return next(err);
    req.flash(
      "success",
      "Your account and all related data have been deleted."
    );
    res.redirect("/");
  });
};

module.exports.search = async (req, res) => {
  let input = (req.query.q || "").trim().replace(/\s+/g, " ");
  if (!input) {
    req.flash("error", "Search value empty!!!");
    return res.redirect("/listings");
  }

  const element = input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const searchFields = [
    { field: "title", msg: "Listings searched by title" },
    { field: "category", msg: "Listings searched by category" },
    { field: "country", msg: "Listings searched by country" },
    { field: "location", msg: "Listings searched by location" },
  ];

  for (let { field, msg } of searchFields) {
    let allListings = await Listing.find({
      [field]: { $regex: element, $options: "i" },
    }).sort({ _id: -1 });
    if (allListings.length) {
      res.locals.success = msg;
      return res.render("listings/index.ejs", { allListings });
    }
  }

  const num = parseInt(element, 10);
  if (!isNaN(num)) {
    let allListings = await Listing.find({ price: { $lte: num } }).sort({
      price: 1,
    });
    if (allListings.length) {
      res.locals.success = `Listings searched for less than Rs ${num}`;
      return res.render("listings/index.ejs", { allListings });
    }
  }

  req.flash("error", "Listings is not here !!!");
  res.redirect("/listings");
};

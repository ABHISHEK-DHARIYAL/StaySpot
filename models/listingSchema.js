const mongoose = require("mongoose");
const Review = require("./reviewSchema");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: "Forget to Put in DataBase the Title",
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    default: 1200,
  },
  location: {
    type: String,
    default: "Jaipur, Rajasthan",
  },
  country: {
    type: String,
    default: "INDIA",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    lat: { type: Number, required: true, default: 0 },
    lon: { type: Number, required: true, default: 0 },
  },
  category: {
    type: String,
    enum: [
      "Rooms",
      "Iconic cities",
      "Mountains",
      "Castles",
      "Amazing pools",
      "Camping",
      "Farms",
      "Arctic",
      "Domes",
      "Boats",
      "Beaches",
      "Deserts",
      "Forests",
    ],
    default: "All",
    required: true,
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

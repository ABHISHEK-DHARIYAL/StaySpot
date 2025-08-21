const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listingSchema.js");
require("dotenv").config();
const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68a6b74ae91f875df2a38369",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data Was Initialized");
};
initDB();

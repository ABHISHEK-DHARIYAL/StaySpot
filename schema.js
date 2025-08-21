const Joi = require("joi");

module.exports.reviewSchemaForJoi = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
  }).required(),
});

module.exports.listingSchemaForJoi = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.string().required().min(0),
    category: Joi.string()
      .valid(
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
        "Forests"
      )
      .required(),
    image: Joi.object({
      URL: Joi.string().allow("", null),
    }),
  }).required(),
});

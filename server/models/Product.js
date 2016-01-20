'use strict';

/* Require mongoose to interact with mongoDB */
var mongoose = require('mongoose');

/*
 * The Product Review schema
 */
var reviewSchema = mongoose.Schema({
  author: String,
  stars: {type: Number, min: 1, max: 5},
  body: String
});


/*
 * This will be the Schema for Product documents
 */
var productSchema = mongoose.Schema({
  name: String,
  color: String,
  description: String,
  faces: Number,
  price: Number,
  rarity: Number,
  images: [String],
  reviews: [reviewSchema]
});

module.exports = mongoose.model('product', productSchema);

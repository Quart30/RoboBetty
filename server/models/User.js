'use strict';

/* Require mongoose to interact with mongoDB */
var mongoose = require('mongoose');

/**
 * This will be the Schema for Product documents
 **/
var userSchema = mongoose.Schema({
  userName: String,
  userEmail: String
});

module.exports = mongoose.model('user', userSchema);

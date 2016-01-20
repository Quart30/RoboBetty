'use strict';

/* Require mongoose to interact with mongoDB */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

/*
 * Employee schema
 */
var employeeSchema = mongoose.Schema({
  name: String,
  email: {type: String, unique: true, index: true, required: true},
  //password: String, // Employee login feature
  phone_number: String,
  _admin_id: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  token: String
});

module.exports = mongoose.model('employee', employeeSchema);

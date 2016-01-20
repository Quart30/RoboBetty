// /models/Authmodel.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var adminSchema = mongoose.Schema({
  email: {type: String, unique: true, index: true, required: true},
  password: String,
  token: String,
  company_name: String,
  company_phone_number: String
});

// methods ======================


// checking if password is valid
adminSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
// generating a hash
adminSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Admin', adminSchema);

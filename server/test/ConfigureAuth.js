var request = require('supertest');

var config = require('../config/config');

var AdminUser = require('../models/Authmodel');
var Employee = require('../models/Employee');

// Employee login feature
function setupEmployee(done) {
  setupAdmin(done, true);
}

function setupAdmin(done) {
  setupUser(done, false);
}

function setupUser(done, isEmployee) {
  var path = isEmployee ? '/employee' : '/auth';
  var UserModel = isEmployee ? Employee : AdminUser;

  var token;
  var admin;

  // Add random number to email to reduce concurrency issue chances on 
  // duplicate unique key errors.
  var email = "test" + Math.floor(Math.random() * 100000) + "@test.com";
  var password = "test_password";

  var url = "localhost:" + config.port;
  request(url)
    .post(path+'/signup')
    .send({
      email: email,
      password: password
    })
    //.expect(200)
    .end(function(err){
      if(err)
        throw(err);
      login();
    }); 

  function login() {
    request(url)
      .post(path+'/login')
      .send({
        email: email,
        password: password
      })
      .expect(200)
      .end(function(err,res){
        if(err)
          throw(err);
        res.body.should.have.property('token');
        token = res.body.token;
        retrieveAdmin();
      });
  }

  function retrieveAdmin() {
    AdminUser.findOne({email: email}, function(err, dbAdmin) {
      if(err)
        throw(err);
      admin = dbAdmin;
      done({
        admin: admin,
        email: email,
        password: password,
        token: token
      });
    });
  }
}

function cleanupAuth(email, callback) {
    AdminUser.remove({email: email}, function(err) {
        if(err)
            throw(err);
        callback();
    });
}

// Employee login feature
function cleanupEmployee(email, callback) {
  Employee.remove({email: email}, function(err) {
    if(err)
      throw(err);
    callback();
  });
}

module.exports.setupAdmin = setupAdmin;
module.exports.setupEmployee = setupEmployee;
module.exports.cleanupAuth = cleanupAuth;
module.exports.cleanupEmployee = cleanupEmployee;
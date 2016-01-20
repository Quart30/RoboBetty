var request = require('supertest');
var config = require('../config/config');
var ConfigureAuth = require('./ConfigureAuth');
var AdminUser = require('../models/Authmodel');

describe('Authentication Test', function() {
  var url = "localhost:" + config.port;
  var token;
  var admin;
  var email = "test@test.edu";
  var password = "test";

  var mynewemail = "test2@test.edu";
  var mynewpassword = "test2";

  var userID = null;

  before(function(done) {
    request(url)
    .post('/auth/signup')
    .send({
      email: email,
      password: password
    })
    .expect(200)
    .end(function(err,res){
      if(err)
        throw(err);
      res.body.should.have.property('token');
      AdminUser.findOne({email:email}, function(err, dbAdmin) {
        if(err)
          throw(err);
        dbAdmin.should.have.property('_id');
        admin = dbAdmin;
        credentials = {
          admin: admin,
          email: email,
          password: password,
          token: res.body.token
        };
      });
    });
    done();
  });


  it("should login the user", function(done) {
    request(url)
      .post('/auth/login')
      .send({
        email: email,
        password: password
      })
      .expect(200)
      .end(function(err,res){
        if(err)
          throw(err);
      done();
      });
  });

  it('should update user\'s password', function(done) {
    request(url)
      .put('/auth/setting/' + credentials.email)
      .send({
        email: credentials.email,
        password: credentials.password,
        newpassword: mynewpassword
      })
      .expect(200)
      .end(function(err,res){
        if(err)
          throw(err);
        done();
      });
  });

  it('should update user\'s email', function(done) {
    request(url)
      .put('/auth/setting/' + credentials.email)
      .send({
        email: credentials.email,
        password: mynewpassword,
        newemail: mynewemail
      })
      .expect(200)
      .end(function(err,res){
        if(err)
          throw(err);
        done();
      });
  });

  it("should login the user using new credentials", function(done) {
    request(url)
      .post('/auth/login')
      .send({
        email: mynewemail,
        password: mynewpassword
      })
      .expect(200)
      .end(function(err,res){
        if(err)
          throw(err);
        res.body.should.have.property('token');
        done();
      });
  });

  it('should restore user\'s credentials', function(done) {
    request(url)
      .put('/auth/setting/' + mynewemail)
      .send({
        email: mynewemail,
        password: mynewpassword,
        newemail: credentials.email,
        newpassword: credentials.password
      })
      .expect(200)
      .end(function(err,res){
        if(err)
          throw(err);
        done();
      });
  });

  it("should login the user using original credentials", function(done) {
    request(url)
      .post('/auth/login')
      .send({
        email: credentials.email,
        password: credentials.password
      })
      .expect(200)
      .end(function(err,res){
        if(err)
          throw(err);
        res.body.should.have.property('token');
        done();
      });
  });

  after(function(done) {
    AdminUser.remove({email: email}, function(err) {
      if(err)
        throw(err);
    });
    done();
  });
});

var chai = require('chai');
var should = chai.should();
var User = require('../models/User');

describe('User Model', function() {
  it('should create a new user', function(done) {
    var user = new User({
      userName: 'test',
      userEmail: 'email@domain.com'
    });
    user.save(function(err) {
      if (err) return done(err);
      done();
    });
  });
  it('should find user by email', function(done) {
    User.findOne({ userEmail: 'email@domain.com' }, function(err, user) {
      if (err) return done(err);
        user.userEmail.should.equal('email@domain.com');
        done();
      });
  });

});

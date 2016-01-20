'use strict';

/* This module is meant to house all of the API 
 * routes that pertain to users
 */
var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlparser = bodyparser.urlencoded({extended: false});

var User = require('../models/User');

router.get('/users', function(req, res) {
  User.find({}, function(err, result) {
    if(err){
      res.status(400).send('There was a problem fetching all of the users');
      return;
    }
    res.json(result);
  });
});

/* Return user with the specifed user_id */
router.get('/user/:id', function(req, res) {
  /* Get id param from request */
  var userId = req.params.id;

  if(!userId) {
    res.status(400).send('need a user id');
    return;
  }

  User.find({_id: userId}, function(err, result) {
    if(err) {
      res.status(500).send('There was problem fetching the user'); 
      return;
    }
    res.json(result);
  });
});

/* Inserts a new user into the databse */
router.post('/user', urlparser, function(req, res) {
  if(!req.body){
    return res.status(500).send('there was a problem saving the user');
  }

  /* Get requet's forms post params */
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;

  /* create new user from database model*/
  var newUser = new User({
      userName: userName,
      userEmail: userEmail
  });

  /* make new user persistant */
  newUser.save(function(err) {
    if(err){
      res.status(400).send('there was a problem saving the user');
      return;
    }
    res.send('created user: ' + JSON.stringify(newUser));
  });
}); 

/* Delete a new user into the databse */
router.delete('/user/:id', urlparser, function(req, res) {
  /* Get id param from request */
  var userId = req.params.id;

  if(!userId) {
    res.status(400).send('need a user id');
    return;
  }

  User.findOneAndRemove({_id: userId}, function(err, result) {
    if(err) {
      res.status(500).send('There was problem removing the user'); 
      return;
    }
    res.send('removed user: ' + JSON.stringify(result));
  });
}); 

module.exports = router;

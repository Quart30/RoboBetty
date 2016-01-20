'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to users
 */
var express = require('express');
var router = express.Router();

var Product = require('../models/Product');

router.get('/products', function(req, res) {
  Product.find({}, function(err, result) {
    if(err){
      res.status(400).send('There was a problem fetching all of the users');
      return;
    }
    res.json(result);
  });
});

module.exports = router;
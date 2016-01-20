'use strict';

var express = require('express');
var controller = require('./patientqueue.controller');

var router = express.Router();

var bodyparser = require('body-parser');
var urlparser = bodyparser.urlencoded({extended: false});

router.post("/checkin", controller.checkin);

module.exports = router;
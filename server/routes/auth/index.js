'use strict';

var express = require('express');
var controller = require('./auth.controller');

var router = express.Router();

router.post('/signup', 			controller.template.authSignup);
router.post('/login', 			controller.template.authLogin);
router.put("/setting/:user", 	controller.template.authResetCredentials);

module.exports = router;
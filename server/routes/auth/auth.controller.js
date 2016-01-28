'use strict';

/* for sean */

/*This module is meant to house the functions
* used by the authorization (auth) API. The
* actual API is set up in index.js

Functions:
	authSignup()
	authLogin()
	authResetCredentials()
*/


var express = require('express');
var config = require('../../config/config');
var router = express.Router();

/* need this to enable cross origin resource sharing.If disabled, we might
* not need this later. This is just to get the example to work
* when front end is served from a something other than our app server.
*/
var Authmodel = require('../../models/Authmodel');
var jwt = require('jwt-simple');

/****** AUTH TEMPLATE ROUTES ******/
module.exports.template = {};

/**authSignup- Used to sign up a user.*/
module.exports.template.authSignup = function(req, res) {
	//Put them into the database
	var admin = new Authmodel();
	admin.email = req.body.email;
	admin.password = admin.generateHash(req.body.password);
	admin.token = jwt.encode(req.body.email, config.secret);
    admin.company_name = req.body.company_name;
    admin.company_phone_number = req.body.company_phone_number;
    // save the user
    admin.save(function(err) {
      if(err)
        return res.status(400).send(err);
      return res.status(200).json({token: admin.token, admin_id: admin._id, company_name: admin.company_name, company_phone_number: admin.company_phone_number});
	});
};

/**authLogin- logs in a user*/
module.exports.template.authLogin = function(req, res) {
	//Give them a token
	// find a user whose email is the same as the forms email
	// we are checking to see if the user trying to login already exists
	Authmodel.findOne({email: req.body.email}, function(err, user) {
		// if there are any errors, return the error before anything else
		if(err || !user)
			return res.status(400).send(err);
		// if the user is found but the password is wrong
		if(!user.validPassword(req.body.password))
			return res.status(401).send('loginMessage', 'Oops! Wrong password');
		var newToken = jwt.encode(req.body.email, config.secret);
		user.token = newToken;
		user.save(function(err, admin) {
			if(err)
				return res.status(400);
			return res.status(200).json({token: newToken, admin_id: admin._id, company_name: admin.company_name, company_phone_number: admin.company_phone_number});
		});
	});
};

/**authResetCredentials- resets a user's credentials*/
module.exports.template.authResetCredentials = function(req, res) {
	Authmodel.findOne({email: req.params.user}, function (err, admin) {
    if(err || !admin)
      res.json(err);
 	
     
    // if the user is found but the password is wrong
    if(!admin.validPassword(req.body.password))
      return res.status(401).send('loginMessage', 'Oops! Wrong password');
	  //update password
	
	  //upadate password
    if (req.body.newpassword !== undefined)
	 	 admin.password = admin.generateHash(req.body.newpassword);
	
    //update email
    if (req.body.newemail !== undefined)
  	 admin.email = req.body.newemail;
	
	//update company name
    if (req.body.new_company_name !== undefined)
  	 admin.company_name = req.body.new_company_name;
	
	//update company's phone number
    if (req.body.new_company_phone_number !== undefined)
  	 admin.company_phone_number = req.body.new_company_phone_number;
	
    admin.save(function(err) {
      if(err) {
        res.status(400).send(err);
      }
    });
    return res.status(200).json(admin);;
  });
};

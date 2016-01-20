'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to users
 */
var express = require('express');
var router = express.Router();
var exports = module.exports;

var Employee = require('../../models/Employee');

exports.getAllEmployees = function(req, res) {
  Employee.find({_admin_id : req.params.id}, function(err, result) {
    if(err){
      return res.status(400).send('There was a problem fetching all of the users');
    }
    return res.status(200).json(result);
  });
};

exports.getById = function(req, res) {
   Employee.findById(req.params.id, function(err, employee) {
      if(err) {
        return res.status(400).json(err);
      } else {
        return res.status(200).json(employee);
      }
    });
};

exports.insert = function(req, res) {
  var employee;
  if(!req.body.name || !req.body.email || !req.body.phone_number || !req.body._admin_id)
    return res.status(400).json({error: "Please specify name, email, phone_number, and _admin_id"});
  employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    _admin_id: req.body._admin_id
  });

  employee.save(function(err) {
    if(err) {
      return res.status(400).json(err);
    }
    return res.status(200).send(employee);
  });
};

exports.update = function(req, res) {
    Employee.findById(req.params.id, function (err, employee) {
      if(err)
         return res.status(400).json(err);
 
      employee.name = req.body.name || employee.name;
      employee.email = req.body.email || employee.email;
      employee.phone_number = req.body.phone_number || employee.email;
      employee._admin_id = req.body._admin_id || employee._admin_id;

      employee.save(function(err) {
        if(err)
          return res.status(400).json(err);
      });
      return res.status(200).send(employee);
   });
};

exports.delete = function(req, res) {
  return Employee.findById(req.params.id, function(err, employee) {
    return employee.remove(function(err) {
      if(err) {
        res.status(400).json(err);
      } else {
        return res.status(200).send('deleted ' + req.params.id);
      }
    });
  });
};

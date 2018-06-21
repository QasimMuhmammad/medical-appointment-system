// For database
const connection = require('./database/connection.js');
const util = require('util');

// Next three for form validation
const validator = require("express-validator");
const {
  check,
  validationResult
} = require('express-validator/check');
const {
  matchedData,
  sanitize
} = require('express-validator/filter');


exports.checkSession = function(req, res, next) {
  res.locals.user = req.session.user;
  if (req.session && req.session.user) {
    findUser({
      username: req.body.username
    }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password;
        req.session.user = user;
        req.locals.user = user;
      }
    });
  }
  next();
};

exports.login = function(req, res) {
  console.log("BODY: " + req);
  findUser({
    username: req.body.username
  }, function(err, user) {

    if (!user) {
      message = 'Wrong Credentials.';
      res.render('pages/login', {
        message: message
      });
    } else {
      if (req.body.password === user.password) {
        req.user = user;
        req.session.user = user;
        res.locals.user = user;
        res.redirect('/dashboard');
        console.log("SUCCESSFUL LOGIN:");

        console.log("GOOD SESSION: " + util.inspect(req.session, false, null));
      } else {
        message = 'Wrong Credentials.';
        res.render('pages/login', {
          message: message
        });
      }
    }
  });
}


function findUser(req, next) {
  var message = '';
  console.log("IM HERE");
  console.log(util.inspect(req, false, null));
  const name = req.username;
  const sql = "SELECT employeeid, password FROM `receptionist` WHERE `employeeid`='" + name + "'";
  console.log(sql);
  return connection.query(sql, function(err, results) {
    if (err) {
      console.log(err);
    }
    console.log("RESULTS: " + util.inspect(results, false, null));


    if (results.length) {
      var user = {
        username: results[0].employeeid,
        password: results[0].password
      };

      console.log("VALIDATE USER IS HERE: ");

      next(null, user);
    } else {
      next(err, null);
    }
  });
};

exports.showPatient = function(req, res) {
  var sql = "SELECT * FROM patient";
  connection.query(sql, function(err, results) {
    if (results) {
      console.log(results);
      res.render('pages/allPatients', {
        results: results
      })
      console.log(results)
    }
  });
};

exports.getDoctors = function(callback) {
  var sql = "SELECT * FROM doctor";
  connection.query(sql, function(err, results) {

    if (err) return callback(err);
    else {
      callback(null, results);
    }
  });

}

exports.getHoursForDoctor = function(callback) {
  var sql = "SELECT * FROM appointment";
  connection.query(sql, function(err, results) {

    if (err) return callback(err);
    else {
      callback(null, results);
    }
  });
}
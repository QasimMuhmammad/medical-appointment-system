// Database Connection
const connection = require('./database/connection.js');

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
  const name = req.username;
  const sql = "SELECT employeeid, password FROM `receptionist` WHERE `employeeid`='" + name + "'";
  console.log(sql);
  return connection.query(sql, function(err, results) {
    if (err) {
      console.log(err);
    }

    if (results.length) {
      var user = {
        username: results[0].employeeid,
        password: results[0].password
      };

      next(null, user);
    } else {
      next(err, null);
    }
  });
};

function query(sql, callback) {
  connection.query(sql, function(err, results) {
    if (err) {
      console.log("QUERY ERROR: " + require('util')
        .inspect(err, {
          depth: null
        }));
    }

    if (results.length == 0) {
      console.log("ERROR: No results were found for query");
      console.log(sql);
      console.log("Try rebuilding your database?");
    }
    console.log(sql + " RESULT: " +
      require('util')
      .inspect(results, {
        depth: null
      }));
    callback(results);
  });
};

exports.getPatients = function(callback) {
  var sql = "SELECT * FROM patient";
  query(sql, callback);
};

exports.getDoctors = function(callback) {
  var sql = "SELECT * FROM doctor";
  query(sql, callback);
};

exports.getHoursForDoctor = function(callback) {
  var sql = "SELECT * FROM appointment";
  query(sql, callback);
};
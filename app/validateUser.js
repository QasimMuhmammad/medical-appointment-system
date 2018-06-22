// Database Connection
const connection = require('./database/connection.js');
const sendEmail = require('./sendEmail.js')


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
    callback(results);
  });
};

function update(sql){

  connection.query(sql, function(err, results) {
    if (err) {
      console.log("QUERY ERROR: " + require('util')
        .inspect(err, {
          depth: null
        }));
    }})
  };

exports.getPatients = function(callback) {
  var sql = "SELECT * FROM patient";
  query(sql, callback);
};

exports.getDoctors = function(callback) {
  var sql = "SELECT * FROM doctor";
  query(sql, callback);
};

exports.getHoursForDoctor = function(doctor, callback) {
  var sql = "SELECT * FROM appointment";
  query(sql, callback);
};

exports.updateAppointment = function(data){
  console.log(data);
  var sql = "INSERT INTO patient (healthcarenum, fname,lname, sex, email) VALUES ( '" + parseInt(data.healthcarenum)
  + "', '" + data.fname + "', '" + data.lname + "', '" + data.sex + "', '" + data.email + "')";

  update(sql);

  sql = "INSERT INTO appointment (weekday, hour, healthcarenum, doctorfName) VALUES ( '"
   + data.AppointmentDate[0] + "', '" + data.AppointmentDate[1] + "', '" + parseInt(data.healthcarenum) + "', '" + data.chosenDoc + "') ";

 connection.query(sql, function(err, results) {
   if(err)
   {
     console.log("Error inserting a new appointment");
   }
   console.log("The insertID is " + results.insertId);

   var emailInfo = {
     email: data.email,
     id: results.insertId
   }
   sendEmail.sendingEmail(emailInfo);
 })

};

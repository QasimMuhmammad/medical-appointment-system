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

exports.getHoursForDoctor = function(doctorInfo, callback) {
  var sql = "SELECT * FROM appointment WHERE doctorid= '" + doctorInfo[1] + "'";
  query(sql, callback);

};

// Patient profile includes
// patient info, patient prescriptions, and patient notes
exports.getPatientProfile = function(patientId, callback) {
  var sql = "SELECT * FROM patient WHERE patientid= '" + patientId + "'";
  query(sql, callback);
};

exports.getPatientDrugs = function(doctorInfo, callback) {

};

exports.updateAppointment = function(data){
  var sql = "INSERT INTO patient (healthcarenum, fname,lname, sex, email) VALUES ( '" + parseInt(data.healthcarenum)
  + "', '" + data.fname + "', '" + data.lname + "', '" + data.sex + "', '" + data.email + "')";

  update(sql);
  sql = "INSERT INTO appointment (weekday, hour, healthcarenum, doctorid, state) VALUES ( '"
   + data.AppointmentDate[0] + "', '" + data.AppointmentDate[1] + "', '" + parseInt(data.healthcarenum) + "', '" + data.chosenDoc[1] + "', 'booked') ";

 connection.query(sql, function(err, results) {
   if(err)
   {
     console.log("QUERY ERROR: " + require('util')
       .inspect(err, {
         depth: null
       }));
   }

   var emailInfo = {
     email: data.email,
     id: results.insertId
   }
   //sendEmail.sendingEmail(emailInfo);
 })

};

exports.changeAppointmentState= function(newstate,appointmentInfo){
      var sql = "UPDATE appointment SET state='"+ newstate +"' WHERE doctorid='" + appointmentInfo.chosenDoc[1] +"' AND weekday='"
       + appointmentInfo.AppointmentDate[0] + "' AND hour='" + appointmentInfo.AppointmentDate[1] + "'";;
      update(sql)
}

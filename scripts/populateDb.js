const doctor = require('../app/database/data/doctor.json');
const receptionist = require('../app/database/data/receptionist.json');
const patient = require('../app/database/data/patient.json');
const appointment = require('../app/database/data/appointment.json');
const doctorsNote = require('../app/database/data/doctorsNote.json');
const doctorsPhoneNumber = require('../app/database/data/doctorsPhoneNumber.json');
const prescription = require('../app/database/data/prescription.json');
const drug = require('../app/database/data/drug.json');

const mysql = require('mysql');
const login = require('../credidentials.json');

var con = mysql.createConnection({
  host: "localhost",
  user: login.username,
  password: login.password
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

});

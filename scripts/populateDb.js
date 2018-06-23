const doctor = require('../app/database/data/doctor.json');
const receptionist = require('../app/database/data/receptionist.json');
const patient = require('../app/database/data/patient.json');
const appointment = require('../app/database/data/appointment.json');
const doctorsNote = require('../app/database/data/doctorsNote.json');
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
  populateAll();
});

function populateAll() {
  populate(doctor);
  populate(receptionist);
  populate(patient);
  populate(appointment);
  populate(doctorsNote);
  populate(prescription);
  populate(drug);
}
//   var sql = "INSERT INTO patient (healthcarenum, fname,lname, sex, email) VALUES ('123456787', 'qasim2', 'muhammad','male', 'qasim.muhamad@ucalgary.ca')";
populate(jsonData) {
  var data = jsonData;
  data.forEach(
    var sql =
  )
}

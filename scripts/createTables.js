const doctor = require('../app/database/schema/doctor.json');
const receptionist = require('../app/database/schema/receptionist.json');
const patient = require('../app/database/schema/patient.json');
const appointment = require('../app/database/schema/appointment.json');
const doctorsNote = require('../app/database/schema/doctorsNote.json');
const prescription = require('../app/database/schema/prescription.json');
const drug = require('../app/database/schema/drug.json');

const mysql = require('mysql');
const login = require('../credidentials.json');

var con = mysql.createConnection({
  host: "localhost",
  user: login.username,
  password: login.password,
  database: "MedicalCenter"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  addAll();
});

function addAll() {
  generateTable(doctor);
  generateTable(receptionist);
  generateTable(patient);
  generateTable(appointment);
  generateTable(doctorsNote);
  generateTable(prescription);
  generateTable(drug);
}

function generateTable(tableJson) {
  var name = tableJson.name;
  var attr = tableJson.attributes;
  var props = tableJson.properties;

  var sql = "CREATE TABLE " + name + " (";

  var k = 0;
  for (var i = 0; i < attr.length; i++) {
    sql += attr[i] + ", ";
    k++;
  }
  for (var i = 0; i < props.length - 1; i++) {
    sql += props[i] + ", ";
    k++;
  }
  sql += props[props.length - 1] + ")";

  con.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log("Table for "+name+" created");
  });
}

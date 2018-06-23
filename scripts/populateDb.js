const doctor = require('../app/database/data/doctor.json');
const receptionist = require('../app/database/data/receptionist.json');
const patient = require('../app/database/data/patient.json');
const appointment = require('../app/database/data/appointment.json');
const doctorsNote = require('../app/database/data/doctorsNote.json');
const prescription = require('../app/database/data/prescription.json');
const drug = require('../app/database/data/drug.json');

const doctorTable = require('../app/database/schema/doctor.json');
const receptionistTable = require('../app/database/schema/receptionist.json');
const patientTable = require('../app/database/schema/patient.json');
const appointmentTable = require('../app/database/schema/appointment.json');
const doctorsNoteTable = require('../app/database/schema/doctorsNote.json');
const prescriptionTable = require('../app/database/schema/prescription.json');
const drugTable = require('../app/database/schema/drug.json');

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
  process.exit();
});

function populateAll() {
  populate(doctor, doctorTable);
  // populate(receptionist, receptionistTable);
  // populate(patient);
  // populate(appointment);
  // populate(doctorsNote);
  // populate(prescription);
  // populate(drug);
}
var sql = "INSERT INTO patient (healthcarenum, fname, lname, sex, email) VALUES ('123456787', 'qasim2', 'muhammad','male', 'qasim.muhamad@ucalgary.ca')";

function populate(jsonData, tableData) {
  var data = jsonData.data;
  var attr = tableData.attributes;
  var tableName = tableData.name;

  var colStrings = "";

  var colStringArr = new Array();
  for (var i = 0; i < attr.length - 1; i++) {
    var column = attr[i].split(' ')[0];
    colStrings += column + ", ";
    colStringArr.push(column);
  }
  colStrings += attr[attr.length - 1].split(' ')[0];
  colStringArr.push(attr[attr.length - 1].split(' ')[0]);

  for (var i = 0; i < data.length; i++) {
    var colValues = "";
    for (var j = 0; j < attr.length - 1; j++) {
      colValues += "'" + data[i][colStringArr[j]] + "', ";
    }
    colValues += "'" + data[i][colStringArr[attr.length - 1]] + "')";


    var sql = "INSERT INTO " + tableName + " (";
    sql += colStrings + ") VALUES (" + colValues;

    con.query(sql, function(err, result) {
      if (err) {
        console.log(err);
        throw err;
      }
    });
  }
  console.log("Data for table " + tableName + " added. " + data.length +
    " records inserted.");
}

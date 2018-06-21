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
  var sql = "INSERT INTO receptionist (employeeid, name, password) VALUES ('1', 'qasim', '1')";
  inputReceptionist()
  inputPatient()
  inputDoctor()
  inputAppointment()
});


function inputReceptionist(){
  var sql = "INSERT INTO receptionist (employeeid, name, password) VALUES ('1', 'qasim', '1')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

}


function inputPatient() {

  var sql = "INSERT INTO patient (healthcarenum, fname,lname, sex, email) VALUES ('123456787', 'qasim2', 'muhammad','male', 'qasim.muhamad@ucalgary.ca')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 patient record inserted");
  });
}

function inputDoctor() {

  var sql = "INSERT INTO doctor (doctorid, fname, mname, lname, specialization) VALUES ('1', 'armaan', 'm','seekhon', 'physician')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 doctor record inserted");
  });
}

function inputAppointment() {

  var sql = "INSERT INTO appointment (bookingid, description, duration, weekday, hour, quantity, healthcarenum, doctorfName) VALUES ('1', 'test', '30','Monday','12:00','5', '123456789','armaan')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 appointment record inserted");
  });
}

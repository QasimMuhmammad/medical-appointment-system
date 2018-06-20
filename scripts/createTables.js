const mysql = require('mysql');
const login = require('../credidentials.json');

var con = mysql.createConnection({
  host: "localhost",
  user: login.username,
  password: login.password,
  database: "MedicalCenter"
});

//Table for receptionist

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  addAll();
  //dropAll();
});

function addAll(){
  doctor();
  receptionist();
  doctor_phone_number();
  written_prescription();
  prescription()
  appointment();
  patient();
}


function receptionist(err)
{
  var sql = "CREATE TABLE receptionist (employeeid Int(8) NOT NULL, name VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table for receptionist created");
  });
}


function doctor(err) {
  var sql = "CREATE TABLE doctor (doctorid Int(8) NOT NULL, fname VARCHAR(255) NOT NULL, mname VARCHAR(255) NOT NULL, lname VARCHAR(255), specialization VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table for doctor created");
  });
}

function doctor_phone_number(err) {
  var sql = "CREATE TABLE doctor_phone_number (doctorid Int(8) NOT NULL, doctor_phone_number Int(8) NOT NULL, type VARCHAR(255) NOT NULL, time_preference VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table for doctor_phone_number created");
  });
}


function written_prescription(err){
  var sql = "CREATE TABLE written_prescription (doctorid Int(8) NOT NULL, prescriptionid Int(8) NOT NULL, healthcarenum Int(8) NOT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table for written_prescription created");
  });
}


function prescription(err) {
  var sql = "CREATE TABLE prescription (doctorid Int(8) NOT NULL, prescriptionid Int(8) NOT NULL, drugid Int(8) NOT NULL, usagedate DATE, quantity Int(8), is_refillable int(8))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table for prescription created");
  });
}

function appointment(err) {
  var sql = "CREATE TABLE appointment (bookingid Int(8) NOT NULL, description VARCHAR(255) NOT NULL, duration Int(8) NOT NULL, weekday VARCHAR(255),hour VARCHAR(255), quantity Int(8) NOT NULL, receptionistid int(8), healthcarenum Int(8), doctorfName VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table for appointment created");
  });
}

function patient(err){
  var sql = "CREATE TABLE patient (healthcarenum Int(8) NOT NULl, fname VARCHAR(255) NOT NULL, mname VARCHAR(255), lname VARCHAR(255) NOT NULL,sex VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table for patient created");
  });
}

function dropAll(err){
  var sql = "DROP TABLE patient, appointment, prescription, written_prescription, doctor_phone_number, doctor, receptionist";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Dropped all tables");
  });
}

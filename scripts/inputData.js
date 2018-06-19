var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qazxsw123",
  database: "MedicalCenter"
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO receptionist (employeeid, name, password) VALUES ('1', 'qasim', '1')";

  inputPatient()
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

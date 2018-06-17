var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qazxsw123",
  database: "MedicalCenter"
});

//Table for receptionist

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE receptionist (employeeid Int(8) NOT NULL, name VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table for receptionist created");
  });
});

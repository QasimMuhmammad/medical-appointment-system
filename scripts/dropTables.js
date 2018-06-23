const mysql = require('mysql');
const login = require('../credidentials.json');

var con = mysql.createConnection({
  host: "localhost",
  user: login.username,
  password: login.password,
  database: "MedicalCenter"
});

function dropAll(err) {
  var sql = "DROP TABLE patient, appointment, prescription, doctor, receptionist";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Dropped all tables");
    process.exit();
  });
}
dropAll();

const mysql = require('mysql');
const login = require('../credidentials.json');

var con = mysql.createConnection({
  host: "localhost",
  user: login.username,
  password: login.password
});

function dropDb(err) {
  var sql = "DROP DATABASE MedicalCenter";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Dropped database");
    process.exit();
  });
}
dropDb();

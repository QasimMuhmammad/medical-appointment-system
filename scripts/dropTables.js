const con = require('../credidentials.json');

function dropAll(err) {
  var sql = "DROP TABLE patient, appointment, prescription, doctor, receptionist";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Dropped all tables");
    process.exit();
  });
}
dropAll();

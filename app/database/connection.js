const mysql = require('mysql');
const login = require('../../credidentials.json');

module.exports = mysql.createConnection({
  host: "localhost",
  user: login.username,
  password: login.password,
  database: "MedicalCenter"
});

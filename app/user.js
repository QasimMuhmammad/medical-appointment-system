// For database
const mysql = require('mysql');
const connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : 'qazxsw123',
              database : 'MedicalCenter'
            });

// Next three for form validation
const validator = require("express-validator");
const {check, validationResult} = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter');



exports.login = function(req, res){
   var message = '';
   const sess = req.session;
   console.log("IM HERE");
   if(req.method == "POST"){
      const post  = req.body;
      const name= post.username;
      const pass= post.password;
      console.log('Username is ' + name + 'Password is ' + pass);

      const sql="SELECT employeeid, password FROM `receptionist` WHERE `employeeid`='"+name+"' and password = '"+pass+"'";
      connection.query(sql, function(err, results){
         if(results.length){
           // Need to put contents somewhere
              req.session.userId = results[0].employeeid;
              req.session.userName = results[0].name;
            console.log(results[0].name);
            res.redirect('/dashboard')
         }
         else{
            message = 'Wrong Credentials.';
            res.render('pages/login',{message: message});
            console.log('Wrong Credentials');
         }

      });
   } else {
      message = 'Wrong Credentials';
      res.render('pages/login', {message:message});
   }
};


exports.showPatient = function(req,res)
{
    res.render('pages/allPatients')
}

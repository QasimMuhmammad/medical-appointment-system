// For database
const mysql = require('mysql');
const login = require('../credidentials.json');

var con = mysql.createConnection({
  host: "localhost",
  user: login.username,
  password: login.password
});

// Next three for form validation
const validator = require("express-validator");
const {check, validationResult} = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


exports.login = function(req, res, next){
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
           delete post.password; // delete password from session
              req.session.userId = results[0].employeeid;
              req.session.userName = results[0].name;
              res.locals.user = userId; // store the user session
            console.log(results[0].name);
            res.redirect('/dashboard')
         }
         else{
            message = 'Wrong Credentials.';
            res.render('pages/login',{message: message});
            console.log('Wrong Credentials');
         }
         next();
      });
   } else {
      message = 'Wrong Credentials';
      res.render('pages/login', {message:message});
      next();
   }
};


exports.showPatient = function(req,res)
{
  var sql = "SELECT * FROM patient";
  connection.query(sql, function(err,results){

    res.render('pages/allPatients',{results: results})
    console.log(results)
  });
};

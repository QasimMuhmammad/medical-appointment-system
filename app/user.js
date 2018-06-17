// For database
const mysql = require('mysql');
const connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : 'qazxsw123',
              database : 'MedicalCenter'
            });


exports.login = function(req, res){
   var message = '';
   var sess = req.session;

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.username;
      var pass= post.password;
      console.log('Username is ' + name + 'Password is ' + pass);

      var sql="SELECT employeeid, password FROM `receptionist` WHERE `employeeid`='"+name+"' and password = '"+pass+"'";
      connection.query(sql, function(err, results){
         if(results.length){
           // Need to put contents somewhere
              //req.session.userId = results[0].id;
              //req.session.user = results[0];
            //console.log(results[0].id);
            let data = require(__dirname + '/calendar-weekly-data.json');
            res.render('pages/calendar-weekly', data);
         }
         else{
            message = 'Wrong Credentials.';
            res.render('pages/login');
            console.log('Wrong Credentials');
         }

      });
   } else {
      res.render('pages/login');
   }
};

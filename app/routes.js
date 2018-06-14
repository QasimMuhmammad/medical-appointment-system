// require express
const express = require('express');
const path = require('path');

// create our router object
const router = express.Router();

// export our router
module.exports = router;

router.get('/', function(req, res) {
  res.render('pages/home');
<<<<<<< Updated upstream
});

router.get('/login', function(req, res) {
  res.render('pages/login');
});

router.get('/about', function(req, res) {
  res.render('pages/about');
});

router.get('/appointments', function(req, res) {
  res.render('pages/appointments');
});

router.post('appointment_submit.js' , function(req,res){
      //res.sendFile(path.join(__dirname + ''))
=======
});

router.get('/login', function(req, res) {
  res.render('pages/login');
});

router.get('/about', function(req, res){
  res.render('pages/about');
});

router.get('/appointments', function(req,res){
  res.render('pages/appointments');
});

router.get('/loggediin_header.html', function(req, res){
  res.sendFile(path.join(__dirname + '/pages/navigation/loggediin_header.html'))
});

router.get('/home.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/css/home.css'))
});

router.get('/signin.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/signin.css'))
});

router.get('/footer.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/footer.css'))
>>>>>>> Stashed changes
});

// require express
const express = require('express');
const path = require('path');

// create our router object
const router = express.Router();

// export our router
module.exports = router;

router.get('/', function(req, res) {
  res.render('pages/home');
});

router.get('/login', function(req, res) {
  res.render('pages/login');
});

router.get('/about', function(req, res) {
  res.render('pages/about');
});

router.get('/appointments', function(req, res){
  res.render('pages/appointments');
});

router.get('/book-appointments', function(req, res) {
  res.render('pages/book-appointment');
});

router.post('appointment_submit.js' , function(req,res){
      //res.sendFile(path.join(__dirname + ''))
});

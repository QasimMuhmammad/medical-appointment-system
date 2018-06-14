// require express
const express = require('express')

// create our router object
const router = express.Router()

const path = require('path')

// export our router
module.exports = router

router.get('/', function(req, res) {
  res.render('pages/home');
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

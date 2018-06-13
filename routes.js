// require express
const express = require('express')

// create our router object
const router = express.Router()


const path = require('path')

// export our router
module.exports = router

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/home/home.html'))
});

router.get('/header.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/header.html'))
});

router.get('/loggediin_header.html', function(req, res){
  res.sendFile(path.join(__dirname + '/pages/navigation/loggediin_header.html'))
});

router.get('/home.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/css/home.css'))
});

router.get('/footer.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/footer.html'))
});

router.get('/signin.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/signin.css'))
});

router.get('/footer.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/footer.css'))
});

router.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/index.html'))
});

router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/login.html'))
});

router.get('/about', function(req, res){
  res.sendFile(path.join(__dirname + '/pages/about.html'))
});

router.get('/appointments', function(req,res){
  res.sendFile(path.joint(__dirname + 'pages/appointments.html'))
});

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

router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/login.html'))
})

router.get('/dashboard', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/dashboard.html'))
})

router.get('/header.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/header.html'))
})

router.get('/loggedin_header.html', function(req, res){
  res.sendFile(path.join(__dirname + '/pages/navigation/loggedin_header.html'))
});

router.get('/footer.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/footer.html'))
});

router.get('/appointments.html', function(req,res){
  res.sendFile(path.joint(__dirname + '/pages/appointments.html'))
});

router.get('/home.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/css/home.css'))
})

router.get('/signin.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/css/signin.css'))
})

router.get('/footer.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/css/footer.css'))
})

router.get('/dashboard.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/css/dashboard.css'))
})

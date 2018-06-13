const express = require('express')
const router = express.Router()
const path = require('path')

module.exports = router

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/home/home.html'))
})

router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/login.html'))
})

router.get('/dashboard', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/dashboard.html'))
})

router.get('/header.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/header.html'))
})

router.get('/footer.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/footer.html'))
})

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
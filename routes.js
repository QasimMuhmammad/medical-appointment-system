const express = require('express')
const router = express.Router()
const path = require('path')

module.exports = router

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/home/home.html'))
})

router.get('/header.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/header.html'))
})

router.get('/home.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/static/home.css'))
})

router.get('/footer.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/footer.html'))
})

router.get('/signin.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/signin.css'))
})

router.get('/footer.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/footer.css'))
})

router.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/index.html'))
})

router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/login.html'))
})
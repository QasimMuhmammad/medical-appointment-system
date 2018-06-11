// index.js

const express = require('express')
const path = require('path')
const app = express()

app.use('/static', express.static('public'))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/home/home.html'))
})

app.get('/header.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/header.html'))
})

app.get('/home.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/static/home.css'))
})

app.get('/footer.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/footer.html'))
})

app.get('/signin.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/signin.css'))
})

app.get('/footer.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/footer.css'))
})

app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/index.html'))
})

app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/login.html'))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

console.log("HELLO");

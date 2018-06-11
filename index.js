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

app.listen(3000, () => console.log('Example app listening on port 3000!'))

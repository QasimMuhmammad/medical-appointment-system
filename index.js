// index.js

const express = require('express')
const path = require('path')
const app = express()


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/index.html'))
})

app.get('/header.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/pages/navigation/header.html'))
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))

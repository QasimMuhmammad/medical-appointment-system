// index.js

const express = require('express')
const app = express()
const port = 3000;

// route our app
const router = require('./routes.js')
app.use('/', router)

// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'))


app.listen(port, function(){
	console.log("app started on port 3000")
})

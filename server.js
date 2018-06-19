// server.js

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);

// route our app
const router = require('./app/routes.js');
app.use('/', router);

// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'));

app.listen(port, function(){
	console.log("app started on port " + port);
});

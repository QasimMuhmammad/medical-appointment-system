// require express
const express = require('express');
const path = require('path');

const bodyParser = require("body-parser");
const validator = require("express-validator");
const {check, validationResult} = require('express-validator/check')

// create our router object
const router = express.Router();


// export our router
module.exports = router;

const middleware= [
  validator(),
  bodyParser.urlencoded({
      extended: true
  })

]

router.use(middleware)
/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
router.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(bodyParser.json());

router.get('/', function(req, res) {
  res.render('pages/home');
});

router.get('/login', function(req, res) {
  res.render('pages/login');
});

router.get('/about', function(req, res) {
  res.render('pages/about');
});

router.get('/appointments', function(req, res){
  res.render('pages/appointments');
});

router.get('/book-appointments', function(req, res) {
  res.render('pages/book-appointment', {
    data: {},
    errors: {}
  });
});

router.post('/book_appointments', function(req,res){
  res.render('pages/book-appointment', {
    data: req.body, // {FirstName, LastName, HealthCarNum, EmailAddress, PhoneNumber InsuranceName, InsuranceAccount}
    errors: {
      FirstName: {msg: "Your First Name is required"},
      LastName: {msg: "Your Last Name is required"},
      HealthCarNum: {msg: "Your Health Care num is required or wrong"},
      EmailAddress: {msg: "The email address is required"},
      PhoneNumber: {msg: "The phone number is incorrect"},
      InsuranceName: {msg: "The Insurance name was incorrect"},
      InsuranceAccount: {msg: "The entered value makes no sense"}
    }
  });
});

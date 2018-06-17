// require express
const express = require('express');
const path = require('path');


const bodyParser = require("body-parser");

const user = require('./user.js')


// Next three for form validation
const validator = require("express-validator");
const {check, validationResult} = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter');

// create our router object
const router = express.Router();

// export our router
module.exports = router;

//For a session
const session = require('express-session')
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
const middleware= [
  validator(),
  bodyParser.urlencoded({
      extended: true
  })
]

router.use(middleware)


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

router.get('/allPatients', function(req,res){
  res.render('pages/allPatients')

});

router.get('/calendar-weekly', function(req, res) {
  let data = require(path.join(__dirname, 'calendar-weekly-data.json'));
  res.render('pages/calendar-weekly',  data);
})


// Attempts to log in a user
router.post('/login_attempt', user.login)

//  POST REQUESTS
router.post('/book_appointments', [
  check('FirstName')
      .isLength({min: 1})
      .withMessage('Your first name is required')
      .trim(),
  check('LastName')
      .isLength({min: 1})
      .withMessage('Your last name is required')
      .trim(),
  check('HealthCareNum')
      .isLength({min: 9, max:9})
      .isInt()
      .withMessage('Your healthcare is required and must be 9 numbers')
      .trim(),
  check('EmailAddress')
      .isEmail()
      .withMessage('Must be an email')
      .trim()
      .normalizeEmail(),
  check('PhoneNumber')
      .isInt()
      .isLength({min:10,max:10})
      .withMessage("Invalid Phone Number Entered"),
  check('Sex')

],

  function(req,res) {
  const errors = validationResult(req)

  if(!errors.isEmpty())
  {
    res.render('pages/book-appointment', {
      data: req.body, // {FirstName, LastName, HealthCarNum, EmailAddress, PhoneNumber, sex}
      errors: errors.mapped()
    });
  }
  //If validation is successful, data has the real data.
  const data = matchedData(req)
  console.log('Sanitized: ', data)
});

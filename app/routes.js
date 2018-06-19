// require express
const express = require('express');
const path = require('path');

const bodyParser = require("body-parser");


const validate = require('./validateUser.js');

// Next three for form validation
const validator = require("express-validator");
const {check, validationResult} = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

//For a session
const session = require('express-session');

// create our router object
const router = express.Router();

router.use(session({
  cookieName: 'session',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

function requireLogin(req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

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

router.use(middleware);

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(bodyParser.json());

// use login validator
router.use(validate.login);

router.get('/', function(req, res) {
  res.render('pages/home', { user: res.locals.userId });
});

router.get('/login', function(req, res) {
  var message = '';
  res.render('pages/login',{message:message, user: res.locals.userId });
});

router.get('/about', function(req, res) {
  res.render('pages/about', { user: res.locals.userId });
});

router.get('/dashboard', requireLogin, function(req, res) {
  res.render('pages/dashboard', { user: res.locals.userId });
});

router.get('/book-appointment', function(req, res) {
  res.render('pages/book-appointment', { user: res.locals.userId });
});

router.get('/appointments', function(req, res){
  res.render('pages/appointments', { user: res.locals.userId });
});

router.get('/book-appointments', function(req, res) {
  res.render('pages/book-appointment', {
    data: {},
    errors: {},
    user: res.locals.userId
  });
});

router.get('/allPatients', validate.showPatient);

router.get('/calendar-weekly', function(req, res) {
  let info = require(path.join(__dirname, 'calendar-weekly-data.json'));
  res.render('pages/calendar-weekly', { data: info, user: res.locals.userId } );
})

// Attempts to log in a user
//router.post('/login_attempt', validate.login);


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
  res.redirect('/calendar-weekly')
});

// export our router
module.exports = router;

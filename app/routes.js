const path = require('path');
const express = require('express');

// Parses HTML data and store in req.body
const bodyParser = require("body-parser");

// Async Object Inspector
const util = require('util');

// Sessions
const session = require('express-session');

// Form Validation
const validator = require("express-validator");

// Form Validation
const {
  check,
  validationResult
} = require('express-validator/check');

// Form Validation
const {
  matchedData,
  sanitize
} = require('express-validator/filter');

// Login Validation
const validate = require('./validateUser.js');

// Router
const router = express.Router();


/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(bodyParser.json());


router.use(session({
  cookieName: 'session',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000 // 30 minute cookies
  }
}));

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
const middleware = [
  validator(),
  bodyParser.urlencoded({
    extended: true
  })
]

router.use(middleware);

function requireLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

// Verifies a user session
router.use(validate.checkSession);

router.get('/', function(req, res) {
  res.render('pages/home');
});

// use login validator
router.get('/login', function(req, res) {
  var message = '';
  res.render('pages/login', {
    message: message
  });
});

router.get('/about', function(req, res) {
  res.render('pages/about');
});

router.get('/profile', requireLogin, function(req, res) {
  console.log(req.session.profile);
  res.render('pages/profile', {patient: req.session.profile});
});

router.get('/dashboard', requireLogin, function(req, res) {
  res.render('pages/dashboard');
});

router.get('/appointments', function(req, res) {
  res.render('pages/appointments');
});

router.get('/book-appointments', function(req, res) {
  validate.getDoctors(function(results) {
    res.render('pages/book-appointment', {
      data: {},
      errors: {},
      doctor: results
    });
  });
});



router.get('/allPatients', requireLogin, function(req, res) {
  validate.getPatients(function(results) {
    res.render('pages/allPatients', {
      results: results
    });
  });
});

router.get('/calendar-weekly', function(req, res) {
  renderCalendarWeekly(req.session.chosenDoc ,res, 'view');
});

function renderCalendarWeekly(doctor,res, perspective) {
    let appointmentsConfig = require(path.join(__dirname, 'calendar-weekly-data.json'));
    getCalendarData(doctor, appointmentsConfig, function(calendarData) {
      res.render('pages/calendar/calendar-weekly', {
        data: appointmentsConfig,
        calendarData: calendarData,
        intent: perspective
      });
    });

};

router.get('/calendar-weekly-user-create', requireLogin, function(req, res) {
  renderCalendarWeekly(res, 'create');
});

router.get('/calendar-weekly-user-check-in', requireLogin, function(req, res) {
  renderCalendarWeekly(res, 'check-in');
});

router.get('/calendar-weekly-user-manage-missed', requireLogin, function(req, res) {
  renderCalendarWeekly(res, 'manage-missed');
});

function getCalendarData(doctor, appointmentsConfig, next) {
  var calendarData = new Array();
  validate.getHoursForDoctor(doctor, function(results) {
    console.log("the results of query are " + results);
    for (var k = 0; k < appointmentsConfig.days.length; k++) {
      var toAdd = appointmentsConfig.time.map(a => Object.assign({}, a));
      for (var i = 0; i < appointmentsConfig.time.length; i++) {
        for (var j = 0; j < results.length; j++) {
          if ((appointmentsConfig.days[k] === results[j].weekday) && (appointmentsConfig.time[i][0] === results[j].hour)) {
            toAdd[i][1] = false;
          }
        }
      }
      calendarData.push(toAdd);
    }
    next(calendarData);
  });
};

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

router.get('/finalize_appointment', function(req,res){
    validate.updateAppointment(req.session);
})

// Attempts to log in a user
router.post('/login', validate.login);

router.post('/allPatients', requireLogin, function (req, res) {
  console.log(require('util').inspect(req.body, { depth: null }));
  validate.getPatientProfile(req.body.pid, function (patient) {
    req.session.profile = patient;
    res.redirect('/profile');
  });
});

router.post('/calendar-weekly-action', function (req, res) {
  req.session.AppointmentDate = req.body.id.split(" ");
  console.log("The appointment information is " + req.session.AppointmentDate);
  if(req.body.action == "book-patient")
  {
    console.log("Booking patient");
    res.redirect('finalize_time');
  }

  else if(req.body.action == "book-receptionist")
  {
    console.log("Booking receptionist");
    res.redirect("finalize information");
  }

  else if(req.body.action == "check-in")
  {
    console.log("Checking in a appointment");
  }

  else if(req.body.action == "cancel")
  {
    console.log("Cancelling an appointment");
  }
});

router.get('/finalize_time', function(req, res) {
  console.log("Make it here");
  res.render('pages/confirmAppointment', {data: req.session});

})

//  POST REQUESTS
router.post('/book_appointments', [
    check('FirstName')
    .isLength({
      min: 1
    })
    .withMessage('Your first name is required')
    .trim(),
    check('LastName')
    .isLength({
      min: 1
    })
    .withMessage('Your last name is required')
    .trim(),
    check('HealthCareNum')
    .isLength({
      min: 9,
      max: 9
    })
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
    .isLength({
      min: 10,
      max: 10
    })
    .withMessage("Invalid Phone Number Entered"),
    check('Sex'),
    check('Doctor')
  ],

  function(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('pages/book-appointment', {
        data: req.body, // {FirstName, LastName, HealthCarNum, EmailAddress, PhoneNumber, sex}
        errors: errors.mapped(),
        doctor: doctor
      });
    }
    //If validation is successful, data has the real data.
    const data = matchedData(req)
    console.log('Sanitized: ', data)

    // lol leave me alone
    req.session.chosenDoc = req.body.Doctor.split(" ");
    req.session.healthcarenum = req.body.HealthCareNum
    req.session.fname = req.body.FirstName
    req.session.lname = req.body.LastName
    req.session.email = req.body.EmailAddress
    req.session.phonenum = req.body.PhoneNumber
    req.session.sex = req.body.Sex
    res.redirect('/calendar-weekly');
  });

// export our router
module.exports = router;

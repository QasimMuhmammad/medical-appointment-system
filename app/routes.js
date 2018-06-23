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

router.get('/dashboard', requireLogin, function(req, res) {
  res.render('pages/dashboard');
});

router.get('/appointments', function(req, res) {
  res.render('pages/appointments');
});

router.get('/book-appointments', function(req, res) {
  validate.getDoctors(function(results) {
    req.session.allDocs = results;
    res.render('pages/book-appointment', {
      data: {},
      errors: {},
      doctor: results
    });
  });
});

router.get('/profile', function(req, res) {
  res.render('pages/profile');
});

router.get('/allPatients', function(req, res) {
  validate.getPatients(function(results) {
    res.render('pages/allPatients', {
      results: results
    });
  });
});

router.get('/calendar-weekly', function(req, res) {
  renderCalendarWeekly(req.session.chosenDoc ,res);
});

function renderCalendarWeekly(doctor,res) {
    let appointmentsConfig = require(path.join(__dirname, 'calendar-weekly-data.json'));
    getCalendarData(doctor, appointmentsConfig, function(calendarData) {
      res.render('pages/calendar/calendar-weekly', {
        data: appointmentsConfig,
        calendarData: calendarData
      });
    });

};

router.get('/calendar-select-doctor', requireLogin, function(req, res) {
  validate.getDoctors(function (results) {
    res.render('pages/calendar/calendar-select-doctor.ejs', {
      doctors: results
    });
  });
});

router.post('/calendar-select-doctor', requireLogin, function(req, res) {
  req.session.chosenDoc = req.body.Doctor.split(" ");
  renderCalendarWeekly(req.session.chosenDoc, res)

});

function getCalendarData(doctor, appointmentsConfig, next) {
  var calendarData = new Array();
  validate.getHoursForDoctor(doctor, function(results) {
    console.log(require('util').inspect(results, { depth: null }));
    for (var k = 0; k < appointmentsConfig.days.length; k++) {
      var toAdd = appointmentsConfig.time.map(a => Object.assign({}, a));
      for (var i = 0; i < appointmentsConfig.time.length; i++) {
        for (var j = 0; j < results.length; j++) {
          if ((appointmentsConfig.days[k] === results[j].weekday) && (appointmentsConfig.time[i][0] === results[j].hour)) {
            toAdd[i][1] = results[j].state;
            console.log("The toAdd[i][1] has " +toAdd[i][1]);
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
    res.redirect('/logout');
})

router.get('/book_receptionist',function(req,res){

  res.render('pages/book_receptionist',{data: req.session, errors:{}})
})

// Attempts to log in a user
router.post('/login', validate.login);

router.post('/allPatients', requireLogin, function (req, res) {
  validate.getPatientProfile(req.body.pid, function (patient) {
    res.render('/profile', patient);
  });
});


router.post('/calendar-weekly-action', function (req, res) {

  req.session.AppointmentDate = req.body.id.split("-");

  if(req.body.action == "book-patient")
  {
    res.redirect('finalize_time')
  }

  else if(req.body.action == "book-receptionist")
  {
    res.redirect('/book_receptionist')
  }

  else if(req.body.action == "check-in")
  {
    validate.changeAppointmentState("checkedin",req.session);
    renderCalendarWeekly(req.session.chosenDoc,res);

  }

  else if(req.body.action == "cancel")
  {
    validate.changeAppointmentState("cancelled",req.session);
    renderCalendarWeekly(req.session.chosenDoc,res);
  }

});

router.get('/finalize_time', function(req, res) {
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
        doctor: req.session.allDocs
      });
    }
    else {

    //If validation is successful, data has the real data.
    const data = matchedData(req)

    // lol leave me alone
    req.session.chosenDoc = req.body.Doctor.split(" ");
    req.session.healthcarenum = req.body.HealthCareNum
    req.session.fname = req.body.FirstName
    req.session.lname = req.body.LastName
    req.session.email = req.body.EmailAddress
    req.session.phonenum = req.body.PhoneNumber
    req.session.sex = req.body.Sex
    res.redirect('/calendar-weekly');
  }
  });


// FOR RECEPTIONIST ERROR CHEKCKING
router.post('/book_receptionist', [
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
    ],

    function(req, res) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.render('pages/book_receptionist', {
          data: req.session, // {FirstName, LastName, HealthCarNum, EmailAddress, PhoneNumber, sex}
          errors: errors.mapped()
        });
      }

      else
      {
      //If validation is successful, data has the real data.
      const data = matchedData(req);

      // lol leave me alone
      req.session.healthcarenum = req.body.HealthCareNum
      req.session.fname = req.body.FirstName
      req.session.lname = req.body.LastName
      req.session.email = req.body.EmailAddress
      req.session.phonenum = req.body.PhoneNumber
      req.session.sex = req.body.Sex
      validate.updateAppointment(req.session);
    }
    });

// export our router
module.exports = router;

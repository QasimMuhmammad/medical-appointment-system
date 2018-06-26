const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'qasimmedical1998@gmail.com',
    pass: 'Qazxsw1234.'
  }
});


exports.sendingEmail = function(emailInfo){

  var mailOptions = {
      from: 'qasimmedical1998@gmail.com',
      to:   emailInfo.email,
      subject: 'Confirmation of medical appointment',
      text: 'This email is confirmation of your medical appointment.' +
       ' The booking ID for your appointment is ' + emailInfo.id + ', the appointment is set for ' +
       emailInfo.day + ' at ' + emailInfo.time + " with Dr." + emailInfo.doctor + '.'
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
    else {
      console.log('Email sent: ' + info.response);
    }
  })
}

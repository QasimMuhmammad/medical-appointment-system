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
      text: 'This email is confirmation of your medical appointment. The '
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

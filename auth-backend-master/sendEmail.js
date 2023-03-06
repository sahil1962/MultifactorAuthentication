const nodemailer = require('nodemailer');
// const SMTPConnection = require('nodemailer/lib/smtp-connection');

const sendEmail = async (send_to, message) => {


  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aqeelafzal6578@gmail.com',
      pass: 'rglvszlxwplwrubj'
    }
    , host: 'smtp.gmail.com',
    port: 25
  });

  var mailOptions = {
    from: 'aqeelafzal6578@gmail.com',
    to: send_to,
    subject: 'Verification Token',
    text: message
  };

  //send eamil
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


}
module.exports = { sendEmail };
// sahil ()
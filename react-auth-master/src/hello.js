// import React from 'react';
function sahil (){
  var nodemailer = require('nodemailer');
  const SMTPConnection = require('nodemailer/lib/smtp-connection');
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aqeelafzal6578@gmail.com',
      pass: 'rglvszlxwplwrubj'
    }
    ,host:'smtp.gmail.com',
    port:25
  });
  
  var mailOptions = {
    from: 'aqeelafzal6578@gmail.com',
    to: 'sahiloutlook1962@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'Hello I\'m sahil!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
  
}
module.exports = {sahil};
// sahil ()
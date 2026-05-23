const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,

  secure: false,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});


function sendEmail(to, subject, text, html){

    transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        text,
        html
    })
}

module.exports = sendEmail
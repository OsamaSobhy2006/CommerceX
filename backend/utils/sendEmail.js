const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,

  secure: false,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function sendEmail(to, subject, text, html) {


  return transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
      html,
  })
  .then(info => {
      console.log("EMAIL SENT");
      console.log(info);
  })
  .catch(err => {
      console.log("EMAIL ERROR");
      console.log(err);
  });
}

module.exports = sendEmail;
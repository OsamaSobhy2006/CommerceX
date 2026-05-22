const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


function sendEmail(to, subject, text, html){

    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html
    })
    .then(info => {
        console.log("Message sent:", info.messageId);
    })
    .catch(err => {
        console.error("Error while sending mail:", err);
    });

}

module.exports = sendEmail
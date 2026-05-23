const { Resend } = require("resend");


const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, text, html) {


  return resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    html,
  });
}

module.exports = sendEmail;
const { Resend } = require("resend");

console.log("RESEND KEY:", process.env.RESEND_API_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, text, html) {

  console.log("SENDING EMAIL");

  return resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    html,
  });
}

module.exports = sendEmail;
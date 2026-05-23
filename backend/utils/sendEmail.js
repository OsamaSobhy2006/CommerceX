const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

async function sendEmail(to, subject, text, html) {

  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = subject;

  sendSmtpEmail.htmlContent = html;

  sendSmtpEmail.sender = {
    name: "CommerceX",
    email: "osamasobhy2906@gmail.com",
  };

  sendSmtpEmail.to = [
    {
      email: to,
    },
  ];

  return apiInstance.sendTransacEmail(sendSmtpEmail);
}

module.exports = sendEmail;
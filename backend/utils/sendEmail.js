const SibApiV3Sdk = require('@getbrevo/brevo');

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

async function sendEmail(to, subject, text, html) {

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

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
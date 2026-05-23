const brevo = require('@getbrevo/brevo');

const apiInstance = new brevo.ApiClient();

apiInstance.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const transactionalEmailsApi = new brevo.TransactionalEmailsApi();

async function sendEmail(to, subject, text, html) {

  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = subject;

  sendSmtpEmail.htmlContent = html;

  sendSmtpEmail.sender = {
    name: "CommerceX",
    email: "osamasobhy2906@gmail.com"
  };

  sendSmtpEmail.to = [
    {
      email: to
    }
  ];

  return transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
}

module.exports = sendEmail;
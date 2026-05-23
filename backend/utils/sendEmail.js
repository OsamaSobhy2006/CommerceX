async function sendEmail(to, subject, text, html) {

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },

    body: JSON.stringify({
      sender: {
        name: "CommerceX",
        email: "osamasobhy2906@gmail.com",
      },

      to: [
        {
          email: to,
        },
      ],

      subject,

      htmlContent: html,
    }),
  });

  const data = await response.json();

  return data;
}

module.exports = sendEmail;
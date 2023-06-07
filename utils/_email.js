const apikey = ''
var SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = apikey;
const { template } = require('./_emailTemplate')

exports.sendEmail = (emailData, elsegch) => {
  const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

  return emailApi.sendTransacEmail({
    "sender": { "email": "elselt@ikhzasag.edu.mn", "name": "Их засаг олон улсын их сургууль" },
    "subject": "Их засаг олон улсын их сургууль",
    "htmlContent": `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>My Email</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td align="center">
          <h1>Welcome to My Website!</h1>
        </td>
      </tr>
    </table>
  </body>
  </html>`,

    "messageVersions": [
      {
        "to": [
          {
            "email": elsegch.email,
            "name": elsegch.fname
          }
        ],
        "htmlContent": template(emailData, elsegch),
        "subject": "Таны бүртгэлийн мэдээллийг баталгаажууллаа."
      },
    ]

  })
}

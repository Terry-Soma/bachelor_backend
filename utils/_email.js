const apikey = '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'
var SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = apikey;
const {template} = require('./_emailTemplate')

exports.sendEmail = (emailData) =>
new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({

  "sender": { "email": "Jakleito70@gmail.com", "name": "Jargalsaikhan" },
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
          <p>This is a paragraph of text.</p>
          <img src="image.jpg" alt="My Image" style="max-width: 100%;">
        </td>
      </tr>
    </table>
  </body>
  </html>`,
  // "params": {
  //   "greeting": "This is the default greeting",
  //   "headline": "This is the default headline"
  // },
  "messageVersions": [
    //Definition for Message Version 1 
    {
      "to": [
        {
          "email": "jakleito70@gmail.com",
          "name": "mr jak"
        },
        {
          "email": "anhaabaatar1214@gmail.com",
          "name": "Anhaabaatar"
        }
      ],
      "htmlContent": template(emailData),
      "subject": "Таны бүртгэлийн мэдээллийг баталгаажууллаа."
    },
  ]

})

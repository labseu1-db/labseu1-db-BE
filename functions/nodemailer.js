'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().process.env.G_EMAIL;
const gmailPassword = functions.config().process.env.G_PASSWORD;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

const APP_NAME = 'Mango!';

exports.sendWelcomeEmail = functions.firestore
  .document('organisations/{orgId}/arrayOfUsersEmails')
  .onUpdate((change, context) => {
    const newValue = change.afterports.data();
    const previousValue = change.before.data();

    console.log('newValue', newValue, 'previousValue', previousValue);
    //const email = user.email;

    return sendWelcomeEmail(email);
  });
// [END sendWelcomeEmail]

// Sends a welcome email to the given user.
async function sendWelcomeEmail(email) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  };
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
  await mailTransport.sendMail(mailOptions);
  console.log('New welcome email sent to:', email);
  return null;
}

"use strict";

const functions = require("firebase-functions");
const APP_NAME = "Pinely";

require("dotenv").config();

const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
// const smtpTransport = require("nodemailer-smtp-transport");
const xoauth2 = require("xoauth2");
const RedirectUrl = "https://labseu1-db-test.firebaseapp.com/register";

const gmailEmail = functions.config().email.address;
const gmailPassword = functions.config().email.password;
var mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  },
  tls: {
    rejectUnauthorized: false
  }
});

admin.initializeApp();

exports.dbCreate = functions.firestore.document("organisations/{orgId}").onCreate((snap, context) => {
  const allEmails = snap._fieldsProto.arrayOfUsersEmails.arrayValue.values;
  const adminEmail = snap._fieldsProto.arrayOfAdminsEmails.arrayValue.values[0];
  Promise.all([filterEmails(allEmails, adminEmail)]).then(values => {
    let userEmails = values[0];
    userEmails.forEach(userEmail => {
      sendWelcomeEmail(userEmail.stringValue);
    });
  });
});

async function sendWelcomeEmail(email) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: `${email}`
  };
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
  mailOptions.html = `<p>Click <a href=${RedirectUrl}>here </a>to Register</p>`;
  await mailTransport.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log("Error:", err);
    }
  });
  return null;
}

async function filterEmails(allEmails, adminEmail) {
  const userEmails = await allEmails.filter(user => {
    return user.stringValue !== adminEmail.stringValue;
  });
  return userEmails;
}

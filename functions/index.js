const functions = require('firebase-functions');
// const admin = require('firebase-admin');
const express = require('express');
const stripe = require('stripe')('sk_test_Fp1czcN7sosPfrOFPrZz1Ddu00JL3WqPgd');
const configureMiddleware = require('./middleware.js');

const app = express();
configureMiddleware(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

app.post('/charge', async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: 2000, // in cents
      currency: 'usd',
      description: 'An example charge',
      source: req.body
    });

    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
});

exports.app = functions.https.onRequest(app);

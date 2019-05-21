/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const moment = require('moment');
const cors = require('cors')({
  origin: true
});

/**
 * Returns the server's date. You must provide a `format` URL query parameter or `format` vaue in
 * the request body with which we'll try to format the date.
 *
 * Format must follow the Node moment library. See: http://momentjs.com/
 *
 * Example format: "MMMM Do YYYY, h:mm:ss a".
 * Example request using URL query parameters:
 *   https://us-central1-labseu1-db-test.cloudfunctions.net/date?format=MMMM%20Do%20YYYY%2C%20h%3Amm%3Ass%20a
 * Example request using request body with cURL:
 *   curl -H 'Content-Type: application/json' /
 *        -d '{"format": "MMMM Do YYYY, h:mm:ss a"}' /
 *        https://us-central1-<project-id>.cloudfunctions.net/date
 *
 * This endpoint supports CORS.
 */

// exports.date = functions.https.onRequest((req, res) => {
//   console.log('hello!');
//   if (req.method === 'PUT') {
//     return res.status(403).send('Forbidden!');
//   }
//   return cors(req, res, () => {
//     let format = req.query.format;
//     if (!format) {
//       format = req.body.format;
//     }
//     const formattedDate = moment().format(format);
//     console.log('Sending Formatted date:', formattedDate);
//     res.status(200).send(formattedDate);
//   });
// });
// [END all]

exports.sendWelcomeEmail = functions.firestore.document('organisations/{orgId}').onWrite((change, context) => {
  const newValue = change.afterports.data();
  const previousValue = change.before.data();

  console.log('newValue', newValue, 'previousValue', previousValue);
  //const email = user.email;
});

exports.updateUser = functions.firestore.document('users/{userId}').onUpdate((change, context) => {
  // Get an object representing the current document
  console.log('updateUser');
  const newValue = change.after.data();
  return newValue;
  // ...or the previous value before this update
  const previousValue = change.before.data();
});

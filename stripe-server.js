// *** USE ONLY FOR LOCALCHOSTING IF NOT USING FIREBASE FUNCTION HOSTING ***

const app = require('express')();
const stripe = require('stripe')('sk_test_Fp1czcN7sosPfrOFPrZz1Ddu00JL3WqPgd');
const cors = require('cors');

app.use(require('body-parser').text());
app.use(cors());

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

app.listen(9000, () => console.log('Listening on port 9000'));

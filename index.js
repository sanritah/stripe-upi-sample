const stripe = require('stripe')('{{ secret key }}');

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

const createIntent = ({amount, token}) => {
    return stripe.paymentIntents.create({
        payment_method_types: ['upi'],
        amount,
        payment_method: token,
        currency: 'inr',
      });
}

app.post('/intent', async (req, res) => {
  const intent = await createIntent(req.body);
  res.json({client_secret: intent.client_secret});
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(9876, () => {
  console.log('Running on port 9876');
});

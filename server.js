const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const customer = async ()=> await stripe.customers.create();
console.log("Customer Info:", customer)

const express = require('express');
// from Build-week Project:
const helmet = require('helmet');
const cors = require('cors');
const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());
const expressHandlebars = require('express-handlebars');

app.engine('.hbs', expressHandlebars({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/card-wallet', async (req, res) => {
  console.log("Customer Info:", customer)
  const intent =  await stripe.setupIntents.create({
    customer: customer.id,
  });
  // res.render('card_wallet', { client_secret: intent.client_secret });
  res.status(200).json({client_secret: intent.client_secret})
});

app.listen(8000, () => {
  console.log('Running on port 8000');
});

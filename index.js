const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Allow requests from specific origins
const allowedOrigins = ['http://localhost:3000', 'https://next-js-pay.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); // Parse JSON bodies

// Route to create an order
app.post('/api/createOrder', (req, res) => {
  // Replace with your own order creation logic
  const { amount, currency, receipt, notes } = req.body;

  // Mock order creation for demonstration purposes
  const order = {
    id: 'order_' + Math.floor(Math.random() * 1000000),
    amount,
    currency,
    receipt,
    notes,
  };

  // Simulate async operation with a delay
  setTimeout(() => {
    res.json(order);
  }, 1000);
});

// Start your server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

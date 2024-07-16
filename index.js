const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

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

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Use the environment variable directly
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Route to create an order
app.post('/api/createOrder', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

    const options = {
      amount,
      currency,
      receipt,
      notes
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Start your server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
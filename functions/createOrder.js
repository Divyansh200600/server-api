const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002; // Use process.env.PORT for dynamic port assignment

// Initialize Razorpay with your key and secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
  origin: 'https://next-js-pay.vercel.app', // Replace with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Route to create a Razorpay order
app.post('/createOrder', async (req, res) => {
  const { amount, currency, receipt, notes } = req.body;

  try {
    // Create order using Razorpay API
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in smallest currency unit (e.g., paisa)
      currency,
      receipt,
      notes,
    });

    // Send the order details back to the client
    res.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Export the Express app
module.exports = app;

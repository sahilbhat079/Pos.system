const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "INR",
  },
  status: {
    type: String,
    enum: ["created", "paid", "failed"],
    default: "created",
  },
  method: {
    type: String,
    enum: ["cash", "card", "upi", "razorpay"],
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: (v) =>
        !v || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
      message: "Invalid email format",
    },
  },
  contact: {
    type: String,
    validate: {
      validator: (v) =>
        !v || /^\d{10}$/.test(v),
      message: "Contact must be a 10-digit phone number",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;

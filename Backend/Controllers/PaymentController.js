const Razorpay = require("razorpay");
const config = require("../config/config");
const crypto = require("crypto");
const createHttpError = require("http-errors");
const Payment = require("../models/PaymentModal");

// Initialize Razorpay instance once to reuse
const razorpay = new Razorpay({
  key_id: config.razorpayKeyId,
  key_secret: config.razorpaySecretKey,
});

// Create a new Razorpay order
const createOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;
    console.log(config.razorpayKeyId, config.razorpaySecretKey);

    if (!amount || amount <= 0) {
      return next(createHttpError(400, "Amount must be greater than zero"));
    }

    const options = {
      amount: amount * 100, // Convert INR to paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    next(error);
  }
};

// Verify Razorpay payment signature after payment success on frontend
const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return next(createHttpError(400, "Missing required payment parameters"));
    }

    const generatedSignature = crypto
      .createHmac("sha256", config.razorpaySecretKey)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return next(createHttpError(400, "Payment verification failed"));
    }

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Error verifying payment:", error);
    next(error);
  }
};

// Handle Razorpay webhook calls (no authentication, verify signature instead)
const webHookVerification = async (req, res, next) => {
  try {
    const webhookSecret = config.razorpayWebhookSecret; 
    const signature = req.headers["x-razorpay-signature"];
    // console.log("Webhook body:", req.body);
    if (!signature) {
      return next(createHttpError(400, "Missing webhook signature"));
    }

    const body = JSON.stringify(req.body);
    // console.log("Webhook body stringified:", body);

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return next(createHttpError(400, "Invalid webhook signature"));
    }

    // console.log("Webhook verified:", req.body);

    // Process payment captured event
    if (req.body.event === "payment.captured") {
      const paymentEntity = req.body.payload.payment.entity;

      const payment = new Payment({
        paymentId: paymentEntity.id,
        orderId: paymentEntity.order_id,
        amount: paymentEntity.amount / 100, // paisa to INR
        currency: paymentEntity.currency,
        status: paymentEntity.status,
        method: paymentEntity.method,
        email: paymentEntity.email,
        contact: paymentEntity.contact,
        createdAt: new Date(paymentEntity.created_at * 1000),
      });

      await payment.save();
      console.log(`Payment saved: ${payment.paymentId}`);
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Webhook verification error:", error);
    next(error);
  }
};

module.exports = { createOrder, verifyPayment, webHookVerification };

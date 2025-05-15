const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/Authprotect");
const { createOrder, verifyPayment, webHookVerification } = require("../Controllers/PaymentController");

// Protected routes — only verified users can create orders and verify payments
router.route("/create-order").post(protect, createOrder);
router.route("/verify-payment").post(protect, verifyPayment);

// Webhook route — no auth middleware because Razorpay calls this directly
router.route("/webhook-verification").post(webHookVerification);

module.exports = router;

const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const { addOrder, getOrderById, getOrders, updateOrder } = require("../Controllers/OrderController");
const { protect } = require("../middlewares/Authprotect");
const mongoose = require("mongoose");

// POST /orders - create order
router.post(
  "/",
  protect,
  [
    body("customerDetails.name").notEmpty().withMessage("Customer name is required"),
    body("customerDetails.guests").isInt({ min: 1 }).withMessage("Guests must be a positive number"),
    body("orderStatus").notEmpty().withMessage("Order status is required"),
    body("bills.total").isNumeric().withMessage("Total bill must be a number"),
    body("bills.tax").isNumeric().withMessage("Tax must be a number"),
    body("bills.totalWithTax").isNumeric().withMessage("Total with tax must be a number"),
  ],
  addOrder
);

// GET /orders/:id - get order by id
router.get(
  "/:id",
  protect,
  [
    param("id").custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage("Invalid order ID"),
  ],
  getOrderById
);

// GET /orders - get all orders
router.get("/", protect, getOrders);

// PUT /orders/:id - update order status
router.put(
  "/:id",
  protect,
  [
    param("id")
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("Invalid order ID"),
    body("orderStatus")
      .notEmpty()
      .withMessage("Order status is required"),
  ],
  updateOrder  
  
);


module.exports = router;

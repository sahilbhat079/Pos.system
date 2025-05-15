const createHttpError = require("http-errors");
const Order = require("../models/OrderModal");
const { default: mongoose } = require("mongoose");
const { validationResult } = require("express-validator");

// Add Order
const addOrder = async (req, res, next) => {
  try {
    // Validate request body errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createHttpError(400, errors.array().map(e => e.msg).join(", ")));
    }

    const order = new Order(req.body);
    await order.save();

    res.status(201).json({ success: true, message: "Order created!", data: order });
  } catch (error) {
    next(error);
  }
};

// Get Order by ID
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, "Invalid id!"));
    }

    const order = await Order.findById(id).populate("table");

    if (!order) {
      return next(createHttpError(404, "Order not found!"));
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// Get all Orders
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("table");
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// Update Order status
const updateOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createHttpError(400, errors.array().map(e => e.msg).join(", ")));
    }

    const { orderStatus } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, "Invalid id!"));
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );

    if (!order) {
      return next(createHttpError(404, "Order not found!"));
    }

    res.status(200).json({ success: true, message: "Order updated", data: order });
  } catch (error) {
    next(error);
  }
};

module.exports = { addOrder, getOrderById, getOrders, updateOrder };

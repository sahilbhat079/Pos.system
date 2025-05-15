const Table = require("../models/TableModal");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");

// Add a new table
const addTable = async (req, res, next) => {
  try {
    const { tableNo, seats } = req.body;

    if (!tableNo) {
      return next(createHttpError(400, "Please provide table number!"));
    }

    if (!seats) {
      return next(createHttpError(400, "Please provide number of seats!"));
    }

    const isTablePresent = await Table.findOne({ tableNo });

    if (isTablePresent) {
      return next(createHttpError(400, "Table already exists!"));
    }

    const newTable = new Table({ tableNo, seats });
    await newTable.save();

    res.status(201).json({
      success: true,
      message: "Table added successfully!",
      data: newTable,
    });
  } catch (error) {
    next(error);
  }
};

// Get all tables (with current order's customer details)
const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find().populate({
      path: "currentOrder",
      select: "customerDetails",
    });

    res.status(200).json({
      success: true,
      data: tables,
    });
  } catch (error) {
    next(error);
  }
};

// Update table status and current order
const updateTable = async (req, res, next) => {
  try {
    const { status, orderId } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, "Invalid table ID!"));
    }

    const table = await Table.findByIdAndUpdate(
      id,
      {
        status: status || "Available",
        currentOrder: orderId || null,
      },
      { new: true }
    );

    if (!table) {
      return next(createHttpError(404, "Table not found!"));
    }

    res.status(200).json({
      success: true,
      message: "Table updated successfully!",
      data: table,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTable,
  getTables,
  updateTable,
};

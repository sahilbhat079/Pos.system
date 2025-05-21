const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    tableNo: { 
        type: Number, 
        required: true, 
        unique: true,
        min: [1, "Table number must be at least 1"]
    },
    status: {
        type: String,
        default: "Available"
    },
    seats: { 
        type: Number,
        required: true,
        min: [1, "A table must have at least 1 seat"]
    },
    currentOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model("Table", tableSchema);

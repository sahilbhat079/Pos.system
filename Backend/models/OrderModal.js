const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerDetails: {
        name: { type: String, required: true },
        phone: { 
            type: String, 
            required: false,  // Optional now
            validate: {
                validator: v => !v || /^\d{10}$/.test(v),
                message: "Phone must be a valid 10-digit number."
            }
        },
        guests: { type: Number, required: true, min: 1 }
    },
    
    orderStatus: {
        type: String,
        enum: ["pending", "preparing", "served", "cancelled"],
        required: false
    },

    orderDate: {
        type: Date,
        default: Date.now
    },

    bills: {
        total: { type: Number, required: true },
        tax: { type: Number, required: true },
        totalWithTax: { type: Number, required: true }
    },

    items: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true }
        }   ],

    table: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Table" ,
        required: false
    },

    paymentMethod: {
        type: String,
        enum: ["cash", "card", "upi", "razorpay","Online","Cash"]
    },

    paymentData: {
        razorpay_order_id: String,
        razorpay_payment_id: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);

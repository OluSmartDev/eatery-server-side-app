const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        email: { type: String, required: true },
        dish_id: { type: String },
        // dish_name: { type: String, required: true, lowercase: true, trim: true, unique: true },
        dish_name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        order_completed: {type: Boolean, default: false}
        
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
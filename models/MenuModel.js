const mongoose = require("mongoose");

const menuSchema = mongoose.Schema(
    {
        dish_name: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        price: {type: Number, required: true}        
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('Menu', menuSchema);
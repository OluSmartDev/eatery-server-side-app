const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true
          },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        // role: {
        //     type: String,
        //     enum: ['admin', 'customer'], 
        //     default: 'customer'
        // }
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
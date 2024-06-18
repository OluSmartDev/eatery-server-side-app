const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
    email: {type: String},
    otp: {type: String},
    type: {type: String},
    created_at: {type: Date},
    otpExpiresAt: {type: Date}  
});

module.exports = mongoose.model("Otp", otpSchema);
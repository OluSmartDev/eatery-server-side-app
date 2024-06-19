const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/envConfig");

exports.generateOTP = async () => {
    const otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    });
    return otp;
}

exports.generateJWT = async (user) => {
    const token = jwt.sign(
        {
            _id: user._id,
            email: user.email
        },
        JWT_SECRET,
        {
            expiresIn: "3d"
        }
    );
    return token;
}
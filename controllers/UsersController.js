const OtpModel = require("../models/OtpModel");
const userModel = require("../models/UserModel");
const { signUpOtpEmail, userSignUpEmail } = require("../utils/emails/authEmails");
const { generateOTP, generateJWT } = require("../utils/generateTokens");
const StatusCodes = require("../utils/statusCodes");
const bcrypt = require("bcrypt");

exports.getOTP = async (req, res, next) => {
    try {
        const {email} = req.body;

        const otp = await generateOTP();
        // console.log("Email: ", email);
        // console.log("OTP: ", otp);

        const saveOTP = await OtpModel.create({
            email: email,
            otp: otp,
            type: "Signup",
            created_at: new Date(),
            otpExpiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
        });

        // TO DO: send signUpOtpEmail containing OTP to user:
        await signUpOtpEmail(email, otp);

        return res.status(StatusCodes.CREATED).json({
            status: true,
            msg: "Check email for the otp sent to you",
            data: saveOTP
        });        
    } catch (error) {
        console.log("saveOTP: ", error);

        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid Request"
        });
    }
    next();
}

exports.resendOTP = async (req, res, next) => {
    try {
        const {email} = req.body;

        const otpExist = await OtpModel.findOne({email: email});
        
        await OtpModel.deleteMany({email: otpExist?.email});

        const otp = await generateOTP();
        // console.log("Email: ", email);
        // console.log("OTP: ", otp);

        const saveOTP = await OtpModel.create({
            email: email,
            otp: otp,
            type: "Signup",
            created_at: new Date(),
            otpExpiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
        });

        // TO DO: send signUpOtpEmail containing OTP to user:
        await signUpOtpEmail(email, first_name = " ", otp);

        return res.status(StatusCodes.CREATED).json({
            status: true,
            msg: "Check email for the otp sent to you",
            data: saveOTP
        });        
    } catch (error) {
        console.log("saveOTP: ", error);

        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid Request"
        });
    }
    next();
}

exports.validateOTP = async (req, res, next) => {
    try {
        const {email, otp} = req.body;

        const otpObject = await OtpModel.findOne({otp: otp});
        console.log("OTP Object: ", otpObject);

        const userObject = await userModel.findOne({email: email});
        console.log("User Object: ", userObject);

        const first_name = userObject.first_name;

        if (otpObject == null) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: true,
                msg: "Invalid OTP"
            });
        }

        if (otpObject.email != email) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: true,
                msg: "Invalid Email"
            });
        }

        if (otpObject.otpExpiresAt < Date.now()) {
            // Delete expired OTP:
            await OtpModel.deleteOne({otp: otp});
            
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: true,
                msg: "OTP has expired. Request another OTP."
            });
        }

        await userSignUpEmail(email, first_name);
        console.log("userSignUpEmail sent successfully");

        // Delete validated OTP:
        await OtpModel.deleteOne({otp: otp});

        console.log("OTP validated successfully");

        return res.status(StatusCodes.OK).json({
            status: true,
            msg: "OTP validated successfully"
        });

    } catch (error) {
        console.log("validateOTP Error: ", error);

        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid Request"
        });
    }
    next();
}

exports.signUp = async (req, res, next) => {

    try {
        const {first_name, last_name, username, email, password} = req.body;

        const userExist = await userModel.findOne({email: email});

        if (userExist) {
            console.log("user's email already exists");
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                msg: "user's email already exists"
            });
        }

        const salt = bcrypt.genSaltSync(10);
        // console.log("Salt: ", salt);
        
        const hashedPassword = await bcrypt.hash(password, salt);
        // console.log("hashedPassword: ", hashedPassword);

        const saveUser = await userModel.create({
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            password: hashedPassword
        });

        const generatedOTP = await generateOTP();

        const saveOTP = await OtpModel.create({
            email,
            otp: generatedOTP,
            type: "Signup",
            createdAt: new Date(),
            otpExpiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
        });

        if (!saveOTP) {
            console.log("saveOTP failed");
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                msg: "saveOTP failed"
            });
        }

        // const sendOTPEmail = await signUpOtpEmail(email, first_name, saveOTP.otp);
        await signUpOtpEmail(email, first_name, saveOTP.otp);

        return res.status(StatusCodes.CREATED).json({
            status: true,
            msg: "user account created successfully",
            data: saveUser
        });
    } catch (error) {
        console.log("Saver User: ", error);

        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid Request"
        });
    }
}

exports.signIn = async (req, res, next) => {

    try {
        const {email, password} = req.body;

        console.log(email, password);

        const userExist = await userModel.findOne({email: email});

        if (!userExist) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                msg: "User account not found, please signup"
            });
        }

        const passwordMatches = await bcrypt.compare(password, userExist.password);
        console.log("Password Matches: ", passwordMatches);

        if (!passwordMatches) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                msg: "Incorrect Password!"
            });
        }

        // Generate JWT:
        const token = await generateJWT(userExist);

        console.log("JWT:", token)

        return res.status(StatusCodes.CREATED).json({
            status: true,
            msg: "Welcome to EateryApp",
            data: {
                userExist,
                token
            }
        });

    } catch (error) {
        console.log("Login Error: ", error);

        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid Request"
        });
    }
}
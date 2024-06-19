const express = require('express');
const router = express.Router();
const usersController = require("../controllers/UsersController");
const { signUpValidator, otpValidator } = require('../validations/userValidation');

router.post("/otp", otpValidator, usersController.getOTP);
router.post("/otp/resend", otpValidator, usersController.resendOTP);
router.put("/otp/validate/", otpValidator, usersController.validateOTP);

router.post("/signup", signUpValidator, usersController.signUp);

module.exports = router;
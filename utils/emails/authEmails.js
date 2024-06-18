const nodemailer = require("nodemailer");
const { SERVICE, PASSMAILER, MAIL_FROM } = require("../../config/envConfig");

const transporter = nodemailer.createTransport({
    service: SERVICE,
    secure: true,
    auth: {
     pass: PASSMAILER,
     user: MAIL_FROM,
    }
 });

exports.signUpOtpEmail = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: MAIL_FROM,
            to: email,
            subject: "EateryApp: SignUp OTP",
            html: `
                <b> Hi,</b></br>
                <p>
                    Thank you for signing up with EateryApp. 
                </p>
                <p>
                    Please use this OTP: ${otp} to validate your email and complete your signup.
                    </br> 
                    Kindly note that the OTP will expire after 5 minutes of being issued.
                </p>
                </br>
                <b>
                <p>Best Regards,</p>
                <p>EATERYAPP Team</p>
                </b>
            `
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

exports.userSignUpEmail = async (email, first_name) => {
    try {        
        await transporter.sendMail({
            from: MAIL_FROM,
            to: email,
            subject: "Wlecome to EateryApp",
            html: `
                <b> Hi ${first_name}, </b></br>
                <p>
                    You are welcome to EateryApp. Your email has been validated.
                </p>
                </br>
                <b>
                <p>Best Regards,</p>
                <p>EATERYAPP Team</p>
                </b>
            `
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};
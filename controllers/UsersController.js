const userModel = require("../models/UserModel");
const StatusCodes = require("../utils/statusCodes");
const bcrypt = require("bcrypt");

const signUp = async (req, res, next) => {
    const {first_name, last_name, username, email, password} = req.body;

    const userExist = await userModel.findOne({email: email});

    if (userExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "user already exists"
        });
    }

    const salt = await bcrypt.genSaltSync(10);
    // console.log(salt);
    
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword);

    const saveUser = await userModel.create({
        first_name, last_name, username, email, hashedPassword
    });

    // TO DO:
    // await userSignUpEmail(email);

    return res.status(StatusCodes.CREATED).json({
        status: true,
        msg: "user account created succesfully",
        data: saveUser
    })
}

module.exports = {signUp};
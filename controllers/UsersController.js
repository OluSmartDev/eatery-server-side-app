const userModel = require("../models/UserModel");
const StatusCodes = require("../utils/statusCodes");
const bcrypt = require("bcrypt");

const signUp = async (req, res, next) => {

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
    // console.log(salt);
    
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword);

    const saveUser = await userModel.create({
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: hashedPassword
    });

    // TO DO:
    // await userSignUpEmail(email);

    return res.status(StatusCodes.CREATED).json({
        status: true,
        msg: "user account created successfully",
        data: saveUser
    })
}

module.exports = {signUp};
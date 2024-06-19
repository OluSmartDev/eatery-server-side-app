const Joi = require("joi");
const StatusCodes = require("../utils/statusCodes");

const validateOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
};

exports.signUpValidator = (req, res, next) => {

    const schema = Joi.object({
        first_name: Joi.string().min(3).max(20).required(),
        last_name: Joi.string().min(3).max(20).required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });

    const result = schema.validate(req.body, validateOptions);

    if (result.error) {
        console.log(result.error);

        // return res.send(error.details);
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid Request"
        });
    }
    next();
} 

exports.otpValidator = (req, res, next) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
    });

    const result = schema.validate(req.body, validateOptions);

    if (result.error) {
        console.log(result.error);

        // return res.send(error.details);
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid Request"
        });
    }
    next();
} 


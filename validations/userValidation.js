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

exports.signInValidator = (req, res, next) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const result = schema.validate(req.body, validateOptions);

    if (result.error) {
        // console.log("signInValidator Error: ", result.error);

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

exports.addMenuValidator = (req, res, next) => {

    const schema = Joi.object({
        dish_name: Joi.string().min(3).max(30).unique().required(),
        description: Joi.string().max(100).required(),
        price: Joi.number().required()
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

exports.updateMenuValidator = (req, res, next) => {

    const schema = Joi.object({
        dish_name: Joi.string().min(3).max(30),
        description: Joi.string().max(100),
        price: Joi.number()
    });

    const result = schema.validate(req.body, validateOptions);

    if (result.error) {
        console.log(result.error);

        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid Request"
        });
    }
    next();
}

exports.getMenuItemValidator = (req, res, next) => {

    const schema = Joi.object({
        dish_name: Joi.string().min(3).max(30),
        _id: Joi.string()
    });

    const result = schema.validate(req.body, validateOptions);

    if (result.error) {
        console.log(result.error);

        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid Request"
        });
    }
    next();
}

exports.deleteMenuItemValidator = (req, res, next) => {

    const schema = Joi.object({
        dish_name: Joi.string().min(3).max(30)
    });

    const result = schema.validate(req.body, validateOptions);

    if (result.error) {
        console.log(result.error);

        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid Request"
        });
    }
    next();
}
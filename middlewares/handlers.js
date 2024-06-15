const StatusCodes = require("../utils/statusCodes");

const notFound = (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(StatusCodes.BAD_REQUEST);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === StatusCodes.OK ? StatusCodes.SERVER_ERROR : res.statusCode;
    const message = "Internal Server Error";
    console.log({Error: err.message});

    res.status(statusCode).json({
        status: "error",
        message: message
    })
}

const asyncHandler = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {notFound, errorHandler, asyncHandler};
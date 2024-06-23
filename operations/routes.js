const express = require("express");
const StatusCodes = require("../utils/statusCodes");
const { VERSION } = require("../config/envConfig");
const usersRouter = require("../routes/usersRouter");
const menusRouter = require("../routes/menusRouter");
const ordersRouter = require("../routes/ordersRouter");

module.exports = (app) => {
    // set cors
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, GET, PATCH, DELETE");
            return res.status(StatusCodes.OK).json({});
        }

        next();
    });

    // middlewares to ensure express app handle both HTML forms and JSON data
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({limit: "100mb"}));

    app.use(`${VERSION}/users`,  usersRouter);
    app.use(`${VERSION}/menus`,  menusRouter);
    app.use(`${VERSION}/orders`, ordersRouter);

    app.get(`${VERSION}/`, (req, res, next) => {
        res.json({
            status: true,
            message: "EATERY-APP-V1 health check passed"
        });
    })
}
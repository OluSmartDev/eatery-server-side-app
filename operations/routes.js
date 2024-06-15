const express = require("express");

module.exports = (app) => {
    // set cors
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, GET, PATCH, DELETE");
            return res.status(200).json({});
        }

        next();
    });

    // middlewares to ensure express app handle both HTML forms and JSON data
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({limit: "100mb"}));
}
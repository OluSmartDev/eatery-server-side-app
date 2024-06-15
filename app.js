const express = require("express");
// require("dotenv").config();
const app = express();

// const PORT = process.env.PORT || 3000;
const {PORT} = require("./config/envConfig");

require("./operations/routes")(app);
require("./operations/db")(app);

app.listen(PORT, () => {
    console.log(`Eatery App listening on port: ${PORT} `);
})
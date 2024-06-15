const express = require("express");
// require("dotenv").config();
const app = express();

// const PORT = process.env.PORT || 3000;
const {PORT} = require("./config/envConfig");
const { notFound, errorHandler } = require("./middlewares/handlers");

require("./operations/routes")(app);
require("./operations/db")(app);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Eatery App listening on port: ${PORT} `);
})
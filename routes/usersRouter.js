const express = require('express');
const router = express.Router();
const usersController = require("../controllers/UsersController");

router.post("/signup", usersController.signUp);

module.exports = router;
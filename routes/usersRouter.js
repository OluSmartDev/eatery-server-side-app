const express = require('express');
const router = express.Router();
const usersController = require("../controllers/UsersController");
const { signUpValidator } = require('../validations/userValidation');

router.post("/signup", signUpValidator, usersController.signUp);

module.exports = router;
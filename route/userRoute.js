const express = require("express");
const { userSignUp } = require("../controller/userController");
const route = express.Router();

route.post("/signup", userSignUp);

module.exports = route;
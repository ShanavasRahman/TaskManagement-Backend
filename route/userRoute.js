const express = require("express");
const { userSignUp } = require("../controller/userController");
const { createTask, displayTask } = require("../controller/taskController");
const route = express.Router();

route.post("/signup", userSignUp);
route.post("/addtask", createTask);
route.get("/displaytask/:id", displayTask);

module.exports = route;
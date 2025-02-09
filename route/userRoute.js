const express = require("express");
const { userSignUp, userLogin } = require("../controller/userController");
const { createTask, displayTask, updateTask, deleteTask } = require("../controller/taskController");
const route = express.Router();

route.post("/signup", userSignUp);
route.post("/login", userLogin);
route.post("/addtask", createTask);
route.get("/displaytask/:id", displayTask);
route.put("/updatetask/:id", updateTask);
route.post("/deletetask/:id", deleteTask);

module.exports = route;
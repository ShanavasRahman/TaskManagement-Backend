const express = require("express");
const { userSignUp, userLogin, isProtected } = require("../controller/userController");
const { createTask, displayTask, updateTask, deleteTask } = require("../controller/taskController");
const authenticate = require("../middleware/auth");
const route = express.Router();

route.post("/signup", userSignUp);
route.post("/login", userLogin);
route.post("/addtask", createTask);
route.post("/displaytask", authenticate, displayTask);
route.get("/protected", authenticate, isProtected);
route.put("/updatetask/:id", updateTask);
route.delete("/deletetask/:id", deleteTask);

module.exports = route;
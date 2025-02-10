const express = require("express");
const { userSignUp, userLogin, isProtected, logout } = require("../controller/userController");
const { createTask, displayTask, updateTask, deleteTask } = require("../controller/taskController");
const authenticate = require("../middleware/auth");
const route = express.Router();

route.post("/signup", userSignUp);
route.post("/login", userLogin);
route.post("/addtask",authenticate, createTask);
route.post("/displaytask", authenticate, displayTask);
route.get("/protected", authenticate, isProtected);
route.put("/updatetask/:id",authenticate, updateTask);
route.delete("/deletetask/:id",authenticate, deleteTask);
route.get("/logout", logout);

module.exports = route;
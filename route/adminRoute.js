const express = require("express");
const { getUsers, deleteUser, updateUser } = require("../controller/adminController");
const authenticate = require("../middleware/auth");
const route = express.Router();


route.get("/getusers", authenticate, getUsers);
route.put("/updateuser/:id",authenticate,updateUser)
route.delete("/deleteuser/:userId",authenticate, deleteUser);


module.exports = route;
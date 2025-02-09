const express = require("express");
const app = express();
const mongoose = require('mongoose');
const userRoute = require("./route/userRoute");

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/task-management")
    .then(() => {
        console.log("db connected successfully");
    })

app.use("/", userRoute);

app.listen(3000, () => {
    console.log("server connected successfully");
})
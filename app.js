const express = require("express");
const app = express();
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/task-management")
    .then(() => {
        console.log("db connected successfully");
    })

app.get("/", (req, res) => {
    res.send("I am here for the server");
})

app.listen(3000, () => {
    console.log("server connected successfully");
})
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoute = require("./route/userRoute");

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/task-management")
    .then(() => {
        console.log("db connected successfully");
    })

app.use("/", userRoute);

app.listen(3000, () => {
    console.log("server connected successfully");
})
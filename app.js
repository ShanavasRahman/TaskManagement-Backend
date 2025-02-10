const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoute = require("./route/userRoute");
const adminRoute = require("./route/adminRoute");

app.use(cors({
    origin: "https://task-management-tawny-two.vercel.app",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("db connected successfully");
    })

app.use("/", userRoute);
app.use("/admin", adminRoute);

app.listen(3000, () => {
    console.log("server connected successfully");
})
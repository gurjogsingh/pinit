const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}).then( () => {
    console.log("Mongo connected")
}).catch(e => console.log(e));


app.listen(8800, () => {
    console.log("Backend server is running!")
})

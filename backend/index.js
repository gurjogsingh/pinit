const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRoute = require("./routes/pins")
const userRoute = require("./routes/users")
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); //Allowing all origins for now!

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}).then( () => {
    console.log("Mongo connected")
}).catch(e => console.log(e));

app.use("/pins", pinRoute);
app.use("/users", userRoute);

app.listen(8800, () => {
    console.log("Backend server is running!")
})

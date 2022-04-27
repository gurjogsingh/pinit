const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//user register (POST METHOD)

router.post("/register", async (req, res) => {
    try {
        //generate a new password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //creating a new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        //save user and send the response
        const user = await newUser.save();
        res.status(200).json(user._id);

    } catch(e) {
        res.status(500).json(e);
    }
})


//user logging in (POST METHOD)

router.post("/login", async (req, res) => {
    try {
        //find the user
        const user = await User.findOne({
            username: req.body.username
        })
        !user && res.status(400).json("Wrong username/password!");

        //validate their password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong username/password!");

        //send res back
        res.status(200).json({
            _id: user._id,
            username: user.username
        });
    } catch(e) {
        res.status(500).json(e);
    }
});

module.exports = router; 
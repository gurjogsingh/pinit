const router = require("express").Router();
const Pin = require("../models/Pin");

//creating a pin (POST METHOD)

router.post("/", async (req, res) => {
    const newPin = new Pin(req.body);
    try {
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    } catch(e) {
        res.status(500).json(e)
    }
})

//getting all pins (GET METHOD)

router.get("/", async (req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    } catch(e) {
        res.status(500).json(e)
    }
})

module.exports = router; 
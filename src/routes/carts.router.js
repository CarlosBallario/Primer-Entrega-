const express = require("express");
const router = express.Router();

const carts = []

// Endpoint get
router.get('/Cart', (req, res) => {
    res.status(200).json(carts);
});

// Endpoint post
router.post("/Cart", (req, res) => {
    const newCart = req.body
    carts.push(newCart)
    res.status(200).json(newCart)
})

module.exports = router
const express = require("express");
const router = express.Router();

const products = []

// Endpoint get
router.get('/Compus', (req, res) => {
    res.status(200).json(products);
});

// Endpoint post
router.post("/Compus", (req, res) => {
    const newProduct = req.body
    products.push(newProduct)
    res.status(200).json({message: "Computadora agregada"}, newProduct)
})

module.exports = router
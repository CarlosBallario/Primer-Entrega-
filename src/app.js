const express = require("express")
const app = express()
const PORT = 8080
const productsRouter = require("./routes/products.router.js")
const cartsRouter = require("./routes/carts.router.js")



// Middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use("/", cartsRouter)
app.use("/", productsRouter)


// LISTENER

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
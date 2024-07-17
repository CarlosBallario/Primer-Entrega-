import { Router } from "express";
import fs from 'fs';

const router = Router();

// Endpoint get para leer un producto
router.get('/Compus', (req, res) => {
    fs.readFile('products.json', 'utf8', (error, data) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ ERROR: "Error interno del Servidor" });
        }
        const products = JSON.parse(data);
        const limit = req.query.limit;
        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    })
})

// Endpoind get para leer un producto por si Id
router.get('/Compus/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('products.json', "utf8", (error, data) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ ERROR: "Error id interno del Servidor" });
        }
        const products = JSON.parse(data);
        const product = products.find(product => product.id === parseInt(id));
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ ERROR: "El producto no fué encontrado" })
        }
    });
});

// Endpoint post para agregar un nuevo producto
router.post('/Compus', (req, res) => {
    const { title, description, code, price, status, stock, category} = req.body;
    fs.readFile('products.json', "utf8", (error, data) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ ERROR: "Error interno del Servidor" });
        }
        const product = JSON.parse(data);
        const id = products.length + 1;
        const newProduct = { id, title, description, code, price, status, stock, category };
        products.push(newProduct);
        fs.writeFile('products.json', JSON.stringify(products, null, 2), error => {
            if (error) {
                console.error(error);
                return res.status(500).json({ ERROR: " Error interno del Servidor" });
            }
            res.json(newProduct);
        })

    })
})


export default router
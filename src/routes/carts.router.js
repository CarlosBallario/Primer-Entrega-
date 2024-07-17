import { Router } from "express";
import fs from 'fs'

const router = Router();

// Endpoind para crear un nuevo carrito
router.post('/carrito', (req, res)=> {
    const { id, products} = req.body;
    if (id && products) {
        fs.readFile('carts.json', "utf8", (error, data) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ ERROR: "Error interno del Servidor"});
            }
            const carts = JSON.parse(data);
            carts.push({ id, products});
            fs.writeFile('carts.json', JSON.stringify(carts, null, 2), error => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ ERROR: "Error interno del Servidor"});
                }
                res.json({ id, products});
            });
        });
    }else {
        res.status(400).json({ ERROR: "Se requiere ingresar el Id y el producto"});
    }
});

//Endpoint get para obtener un carrito por su Id
router.get('/carrito/:cid', (req, res) => {
    const id = req.params.cid;
    fs.readFile('carts.json', "utf8", (error, data) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ Error: "Error interno del Servidor"});
        }
        const carts = JSON.parse(data);
        const cart = carts.find(cart => cart.id === id);
        if (cart) {
            res.json(cart);
        }else {
            res.status(404).json({ ERROR: " Carrito no encontrado"});
        }
    });
});

// Endpoint post para agregar un producto en el carrito
router.post('/:cid/Compus/:id', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.id;
    const productToAdd = {
        product: productId,
        quantity: 1
    };
    fs.readFile('carts.json', "utf8", (error, data) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ ERROR: " Error interno del Servidor"});
        }
        const carts = JSON.parse(data);
        const cartIndex = carts.findIndex(cart => cart.id === cartId);
        if (cartIndex !== -1) {
            carts[cartIndex].products.push(productToAdd);
            fs.writeFile('carts.json', JSON.stringify(carts, null, 2), error => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ ERROR: "Error interno del Servidor"});
                }
                res.status(200).json({ Mensaje: "EL producto se a agregado correctamente al carrito"});
            });
        }else {
            res.status(404).json({ Error: "Carrito no encontrado"});
        }
    });
});
export default router;



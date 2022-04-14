"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const store = new product_1.ProductStore();
// index, displays all products
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
// show, display a specific product based on product id
const show = async (_req, res) => {
    try {
        const products = await store.show(_req.params.id);
        res.json(products).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
//create, creates a new product
const create = async (_req, res) => {
    try {
        const product = {
            name: _req.body.name,
            price: _req.body.price,
            category: _req.body.category,
        };
        try {
            const newProduct = await store.create(product);
            res.json(newProduct).end();
        }
        catch (err) {
            res.status(400).json(err).end();
        }
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
// update, updates a specific product based on product id
const update = async (req, res) => {
    try {
        const product = {
            id: parseInt(req.params.id),
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        try {
            const updatedProduct = await store.update(product);
            res.json(updatedProduct);
        }
        catch (err) {
            res.status(400).json(err).end();
        }
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
// destroy, delete a specific product based on product id
const destroy = async (_req, res) => {
    try {
        const deleteProduct = await store.delete(_req.params.id);
        res.json(deleteProduct).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
const productsRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken_1.default, create);
    app.put('/products/:id', verifyAuthToken_1.default, update);
    app.delete('/products/:id', verifyAuthToken_1.default, destroy);
};
exports.default = productsRoutes;

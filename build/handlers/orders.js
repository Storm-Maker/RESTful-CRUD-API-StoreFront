"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const store = new order_1.OrderStore();
// index displays all the orders
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        res.json(orders).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
// show display only a specific order based on ID
const show = async (_req, res) => {
    try {
        const order = await store.show(_req.params.id);
        res.json(order).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
// create, create a new order
const create = async (_req, res) => {
    try {
        const order = {
            user_id: _req.body.user_id,
            status: _req.body.status
        };
        try {
            const newOrder = await store.create(order);
            res.json(newOrder).end();
        }
        catch (err) {
            res.status(400).json(err).end();
        }
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
// update, update a specific order based on ID
const update = async (req, res) => {
    try {
        const order = {
            id: req.params.id,
            status: req.body.status
        };
        try {
            const updateOrder = await store.update(order);
            res.json(updateOrder).end();
        }
        catch (err) {
            res.status(400).json(err).end();
        }
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
// destroy, delete a specific order based on ID
const destroy = async (_req, res) => {
    try {
        const deleteOrder = await store.delete(_req.params.id);
        res.json(deleteOrder).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
// addProduct, adds a product to a specific order
const addProduct = async (_req, res) => {
    const quantity = parseInt(_req.body.quantity);
    const orderId = _req.params.id;
    const productId = _req.body.productId;
    try {
        const addProductsInOrder = await store.addProduct(quantity, orderId, productId);
        res.json(addProductsInOrder).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
const ordersRoutes = (app) => {
    app.get('/orders', verifyAuthToken_1.default, index);
    app.get('/orders/:id', verifyAuthToken_1.default, show);
    app.post('/orders', verifyAuthToken_1.default, create);
    app.put('/orders/:id', verifyAuthToken_1.default, update);
    app.delete('/orders/:id', verifyAuthToken_1.default, destroy);
    app.post('/orders/:id/products', verifyAuthToken_1.default, addProduct);
};
exports.default = ordersRoutes;

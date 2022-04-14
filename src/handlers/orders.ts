import express, {Request, Response} from 'express';
import {Order, OrderStore} from '../models/order';
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new OrderStore();

// index displays all the orders
const index = async (_req: Request, res: Response) =>{
    try{
        const orders = await store.index();
        res.json(orders).end();
    } catch (err) {
        res.status(400).json(err).end();
    }

};

// show display only a specific order based on ID
const show = async (_req: Request, res: Response) =>{
    try {
        const order = await store.show(_req.params.id);
        res.json(order).end();
    } catch (err) {
        res.status(400).json(err).end();
    }
};

// create, create a new order
const create = async (_req: Request, res: Response) =>{
    try {
        const order: Order = {
            user_id: _req.body.user_id as string,
            status: _req.body.status as string
        };

        try {
            const newOrder = await store.create(order);
            res.json(newOrder).end();
        } catch (err) {
            res.status(400).json(err).end();
        }

    } catch (err) {
        res.status(400).json(err).end();
    }
};

// update, update a specific order based on ID
const update = async (req: Request, res: Response) =>{
    try {
        const order: Order = {
            id: req.params.id as string,
            status: req.body.status as string
        };
        
        try {
            const updateOrder = await store.update(order);
            res.json(updateOrder).end();
        } catch (err) {
            res.status(400).json(err).end();
        }

    } catch (err) {
        res.status(400).json(err).end();
    }
};

// destroy, delete a specific order based on ID
const destroy = async (_req: Request, res: Response) =>{
    try {
        const deleteOrder = await store.delete(_req.params.id);
        res.json(deleteOrder).end();
    } catch (err) {
        res.status(400).json(err).end();
    }
};

// addProduct, adds a product to a specific order
const addProduct = async (_req: Request, res: Response) =>{
    
    const quantity:number = parseInt(_req.body.quantity as string);
    const orderId:string = _req.params.id as string;
    const productId:string = _req.body.productId as string;

    try {
        const addProductsInOrder = await store.addProduct(quantity, orderId, productId);
        res.json(addProductsInOrder).end();
    } catch (err) {
        res.status(400).json(err).end();
    }
};

const ordersRoutes = (app: express.Application) =>{
    app.get('/orders', verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken, show);
    app.post('/orders', verifyAuthToken, create);
    app.put('/orders/:id', verifyAuthToken, update);
    app.delete('/orders/:id', verifyAuthToken, destroy);
    app.post('/orders/:id/products', verifyAuthToken, addProduct);
};

export default ordersRoutes;
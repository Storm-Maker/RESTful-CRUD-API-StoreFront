import express, {Request, Response} from 'express';
import {Product, ProductStore} from '../models/product';
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new ProductStore();

// index, displays all products
const index = async (_req: Request, res: Response) =>{
    try {
        const products = await store.index();
        res.json(products).end();
    } catch (err) {
        res.status(400).json(err).end();
    }
};

// show, display a specific product based on product id
const show = async (_req: Request, res: Response) =>{
    try {
        const products = await store.show(_req.params.id);
        res.json(products).end(); 
    } catch (err) {
        res.status(400).json(err).end();
    }
};

//create, creates a new product
const create = async (_req: Request, res: Response) =>{

    try {
        const product: Product = {
            name: _req.body.name,
            price: _req.body.price,
            category: _req.body.category,
        };

        try {
            const newProduct = await store.create(product);
            res.json(newProduct).end();
        } catch (err) {
            res.status(400).json(err).end();
        }

    } catch (err) {
        res.status(400).json(err).end();
    }
};

// update, updates a specific product based on product id
const update = async (req: Request, res: Response) =>{

    try {
        const product: Product = {
            id: parseInt(req.params.id as string),
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };

        try {
            const updatedProduct = await store.update(product);
            res.json(updatedProduct);
        } catch (err) {
            res.status(400).json(err).end();
        }

    } catch (err) {
        res.status(400).json(err).end();
    }

};

// destroy, delete a specific product based on product id
const destroy = async (_req: Request, res: Response) =>{
    try {
        const deleteProduct = await store.delete(_req.params.id);
        res.json(deleteProduct).end();
    } catch (err) {
        res.status(400).json(err).end();
    }
};

const productsRoutes = (app: express.Application) =>{
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
    app.put('/products/:id', verifyAuthToken, update);
    app.delete('/products/:id', verifyAuthToken, destroy);
};

export default productsRoutes;
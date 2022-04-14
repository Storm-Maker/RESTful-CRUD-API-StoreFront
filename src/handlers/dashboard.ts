import express, { Request, Response } from 'express';
import verifyAuthToken from '../middleware/verifyAuthToken';
import { DashboardQueries } from '../services/dashboard';

const dashboard  = new DashboardQueries();

// showOrdersByUser displays the orders that were made by specific user based on user_ID
const showOrdersByUser = async (_req: Request, res: Response) =>{
    try {
        const ordersByUser = await dashboard.showOrdersByUser(_req.params.user_id);
        res.json(ordersByUser).end();
    } catch (err) {
        res.status(400).json(err).end();
    }

};

// showCompletedOrdersByUser displays the completed orders that were made by specific user based on user_ID
const showCompletedOrdersByUser = async (_req: Request, res: Response) =>{
    try {
        const completedOrders = await dashboard.showCompletedOrdersByUser(_req.params.user_id);
        res.json(completedOrders).end();
    } catch (err) {
        res.status(400).json(err).end();
    }
};

// showProductsByCategory displays products by specific category based on category name
const showProductsByCategory = async (_req: Request, res: Response) =>{
    try {
        const productsCategory = await dashboard.showProductsByCategory(_req.params.category);
        res.json(productsCategory).end();
    } catch (err) {
        res.status(400).json(err).end();
    }
};

// showTopFiveProducts displays top 5 quantities in orders and return the orders in them
const showTopFiveProducts = async (_req: Request, res: Response) =>{
    try {
        const topFiveProducts = await dashboard.showTopFiveProducts();
        res.json(topFiveProducts).end();
    } catch (err) {
        res.status(400).json(err).end();
    }
};

const productsRoutes = (app: express.Application) =>{

    app.get('/orders-by-user/:user_id', verifyAuthToken, showOrdersByUser);
    app.get('/completed-orders-by-user/:user_id', verifyAuthToken, showCompletedOrdersByUser);

    app.get('/list-products-category/:category', showProductsByCategory);
    app.get('/top-five-products', showTopFiveProducts);
};

export default productsRoutes;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const dashboard_1 = require("../services/dashboard");
const dashboard = new dashboard_1.DashboardQueries();
// showOrdersByUser displays the orders that were made by specific user based on user_ID
const showOrdersByUser = async (_req, res) => {
    try {
        const ordersByUser = await dashboard.showOrdersByUser(_req.params.user_id);
        res.json(ordersByUser).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
// showCompletedOrdersByUser displays the completed orders that were made by specific user based on user_ID
const showCompletedOrdersByUser = async (_req, res) => {
    try {
        const completedOrders = await dashboard.showCompletedOrdersByUser(_req.params.user_id);
        res.json(completedOrders).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
// showProductsByCategory displays products by specific category based on category name
const showProductsByCategory = async (_req, res) => {
    try {
        const productsCategory = await dashboard.showProductsByCategory(_req.params.category);
        res.json(productsCategory).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
// showTopFiveProducts displays top 5 quantities in orders and return the orders in them
const showTopFiveProducts = async (_req, res) => {
    try {
        const topFiveProducts = await dashboard.showTopFiveProducts();
        res.json(topFiveProducts).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
const productsRoutes = (app) => {
    app.get('/orders-by-user/:user_id', verifyAuthToken_1.default, showOrdersByUser);
    app.get('/completed-orders-by-user/:user_id', verifyAuthToken_1.default, showCompletedOrdersByUser);
    app.get('/list-products-category/:category', showProductsByCategory);
    app.get('/top-five-products', showTopFiveProducts);
};
exports.default = productsRoutes;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    async showCompletedOrdersByUser(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT first_name, last_name, user_name, orders.id, status FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.user_id=($1) AND orders.status='complete' ORDER BY orders.id ASC`;
            const result = await conn.query(sql, [user_id]);
            const completedOrders = result.rows;
            conn.release();
            return completedOrders;
        }
        catch (err) {
            throw new Error(`Cannot get orders with user ID:${user_id}. Error: ${err}`);
        }
    }
    async showOrdersByUser(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT first_name, last_name, user_name, orders.id, status FROM users INNER JOIN orders ON users.id = orders.user_id WHERE users.id=($1) ORDER BY orders.id ASC';
            const result = await conn.query(sql, [user_id]);
            const ordersByUser = result.rows;
            conn.release();
            return ordersByUser;
        }
        catch (err) {
            throw new Error(`Cannot get the orders with associated user ID:${user_id}. Error: ${err}`);
        }
    }
    async showProductsByCategory(category) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE category=($1) ORDER BY name ASC';
            const result = await conn.query(sql, [category]);
            const productsCategory = result.rows;
            conn.release();
            return productsCategory;
        }
        catch (err) {
            throw new Error(`Cannot get the product category:${category}. Error: ${err}`);
        }
    }
    async showTopFiveProducts() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT order_id, name, price, quantity FROM products INNER JOIN order_products ON products.id = order_products.product_id ORDER BY order_products.quantity DESC LIMIT 5';
            const result = await conn.query(sql);
            const topFiveProducts = result.rows;
            conn.release();
            return topFiveProducts;
        }
        catch (err) {
            throw new Error(`Cannot get the Top 5 products. Error: ${err}`);
        }
    }
}
exports.DashboardQueries = DashboardQueries;

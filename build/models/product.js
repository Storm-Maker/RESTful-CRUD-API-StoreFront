"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products ORDER BY id ASC';
            const result = await conn.query(sql);
            const products = result.rows;
            conn.release();
            return products;
        }
        catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Cannot get the product with ID:${id}. Error: ${err}`);
        }
    }
    async create(p) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
            // @ts-ignore
            const result = await conn.query(sql, [p.name, p.price, p.category]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Cannot create new product. Error: ${err}`);
        }
    }
    async update(p) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'UPDATE products SET (name, price, category) = ($2, $3, $4) WHERE id=($1) RETURNING *';
            // @ts-ignore
            const result = await conn.query(sql, [p.id, p.name, p.price, p.category]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Cannot edit product. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            // @ts-ignore
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Cannot delete product with ID:${id}. Error: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;

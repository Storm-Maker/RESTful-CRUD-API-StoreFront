"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
const database_1 = __importDefault(require("../../database"));
require("jasmine");
const store = new order_1.OrderStore();
describe("Order Model", () => {
    // creates a product and a user for the order testing
    beforeAll(async () => {
        const userStore = new user_1.UserStore();
        const productStore = new product_1.ProductStore();
        const user = {
            first_name: 'firstName',
            last_name: 'lastName',
            user_name: 'myUserName',
            password_digest: 'myPassword123'
        };
        const product = {
            name: "dashTest",
            price: 200,
            category: "dashboard",
        };
        try {
            const newProduct = await productStore.create(product);
            const newUser = await userStore.create(user);
        }
        catch (err) {
            throw new Error(`Error: ${err}`);
        }
    });
    // deletes the product and the user after the testing
    afterAll(async () => {
        const userStore = new user_1.UserStore();
        const productStore = new product_1.ProductStore();
        try {
            const deleteProduct = await productStore.delete(1);
            const deleteUser = await userStore.delete("myUserName");
        }
        catch (err) {
            throw new Error(`Error: ${err}`);
        }
    });
    describe("Create Model Testing", () => {
        it('Should have create model', () => {
            expect(store.create).toBeDefined();
        });
        it('Should create new order and return the new order', async () => {
            const order = {
                user_id: '2',
                status: 'complete'
            };
            try {
                const newOrder = await store.create(order);
                expect(newOrder).toEqual(jasmine.objectContaining({
                    id: 3,
                    user_id: '2',
                    status: 'complete'
                }));
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    });
    describe("Index Model Testing", () => {
        it('Should have index model', () => {
            expect(store.index).toBeDefined();
        });
        it('Should return a list of orders', async () => {
            try {
                const result = await store.index();
                expect(result).toEqual([{
                        id: 3,
                        user_id: '2',
                        status: 'complete'
                    }]);
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    });
    describe("Show Model Testing", () => {
        it('Should have show model', () => {
            expect(store.show).toBeDefined();
        });
        it('Should return an order', async () => {
            try {
                const result = await store.show('3');
                expect(result).toEqual(jasmine.objectContaining({
                    id: 3,
                    user_id: '2',
                    status: 'complete'
                }));
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    });
    describe("Update Model Testing", () => {
        it('Should have update model', () => {
            expect(store.update).toBeDefined();
        });
        it('Should update order and return the updated order', async () => {
            const order = {
                id: 3,
                status: 'active'
            };
            try {
                const newOrder = await store.update(order);
                expect(newOrder).toEqual(jasmine.objectContaining({
                    id: 3,
                    user_id: '2',
                    status: 'active'
                }));
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    });
    describe("addProduct Model Testing", () => {
        it('Should have addProduct model', () => {
            expect(store.addProduct).toBeDefined();
        });
        it('Should add product to order', async () => {
            const orderId = 3;
            const productId = 2;
            const quantity = 20;
            try {
                const productInOrder = await store.addProduct(quantity, orderId, productId);
                expect(productInOrder).toEqual(jasmine.objectContaining({
                    quantity: 20,
                    order_id: '3',
                    product_id: '2'
                }));
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    });
    // deletes the addProduct from the previous test to allow for the next test to function
    describe("Clearing after addProduct Model", () => {
        it('Should delete the added product to order', async () => {
            try {
                const conn = await database_1.default.connect();
                const sql = 'DELETE FROM order_products WHERE id=2';
                const dropOrderProducts = await conn.query(sql);
                conn.release();
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    });
    describe("Delete Model Testing", () => {
        it('Should have delete model', () => {
            expect(store.delete).toBeDefined();
        });
        it('Should delete order and return the deleted order', async () => {
            try {
                const newOrder = await store.delete(3);
                expect(newOrder).toEqual(jasmine.objectContaining({
                    id: 3,
                    user_id: '2',
                    status: 'active'
                }));
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    });
});

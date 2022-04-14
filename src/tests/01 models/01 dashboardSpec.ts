import { DashboardQueries } from '../../services/dashboard';
import { Order, OrderStore } from '../../models/order';
import { Product, ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';
import Client from '../../database';
import 'jasmine';


const dashboard  = new DashboardQueries();

describe("Dashboard Model", () => {

    // creates user, orders, and product for the dashboard testing
    beforeAll( async()=>{

        const userStore = new UserStore();
        const orderStore = new OrderStore();
        const productStore = new ProductStore();

        const user: User = {
            first_name: 'firstName',
            last_name: 'lastName',
            user_name: 'dashboardTest',
            password_digest:'myPassword123'
        };

        const product: Product = {
            name: "dashTest",
            price: 200,
            category: "dashboard",
        };

        const order1: Order = {
            user_id: '1',
            status: 'active'
        };

        const order2: Order = {
            user_id: '1',
            status: 'complete'
        };

        const orderId = 1 as unknown as string;
        const productId = 1 as unknown as string;
        const quantity = 20;
        try {
            const newUser = await userStore.create(user);
            const newProduct = await productStore.create(product);
            const newOrder1 = await orderStore.create(order1);
            const newOrder2 = await orderStore.create(order2);
    
            const productToOrder = await orderStore.addProduct(quantity, orderId, productId);
    
        } catch (err) {
            throw new Error (`Couldn't create the requirements for the test. Error: ${err}`);
        }

    });

    // deletes user, orders, and product after dashboard testing
    afterAll( async()=>{
        const userStore = new UserStore();
        const orderStore = new OrderStore();
        const productStore = new ProductStore();
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM order_products WHERE id=1';
            const dropOrderProducts = await conn.query(sql);
            conn.release();
    
            const deleteOrder1 = await orderStore.delete(1 as unknown as string);
            const deleteOrder2 = await orderStore.delete(2 as unknown as string);
            const deleteProduct = await productStore.delete(1 as unknown as string);
            const deleteUser = await userStore.delete('dashboardTest');
        } catch (err) {
            throw new Error (`Couldn't remove the test requirements after test. Error: ${err}`);
        }


    });

    describe("showOrdersByUser Model Testing", () => {

        it('Should have showOrdersByUser model', () => {
            expect (dashboard.showOrdersByUser).toBeDefined();
        });

        it('Should show all the orders that the user made', async() => {
            try {
                const result = await dashboard.showOrdersByUser(1 as unknown as string);

                expect (result).toEqual( 
                    jasmine.arrayContaining([
                        jasmine.objectContaining({
                            first_name: 'firstName',
                            last_name: 'lastName',
                            user_name: 'dashboardTest',
                            status: 'complete'
                        }) 
                    ])
                );
            } catch (err) {
                throw new Error (`Error: ${err}`);
            }


        });

    });

    describe("showCompletedOrdersByUser Model Testing", () => {

        it('Should have showCompletedOrdersByUser model', () => {
            expect (dashboard.showCompletedOrdersByUser).toBeDefined();
        });

        it('Should return a list of completed orders by the user', async() => {
            try {
                const result = await dashboard.showCompletedOrdersByUser(1 as unknown as string);

                expect (result).toEqual( 
                    jasmine.arrayContaining([
                        jasmine.objectContaining({
                            first_name: 'firstName',
                            last_name: 'lastName',
                            user_name: 'dashboardTest',
                            status: 'complete'
                        }) 
                    ])
                );
            } catch (err) {
                throw new Error (`Error: ${err}`);
            }


        });

    });
    
    describe("showProductsByCategory Model Testing", () => {

        it('Should have showProductsByCategory model', () => {
            expect (dashboard.showProductsByCategory).toBeDefined();
        });

        it('Should return the products in the selected category', async() => {
            try {
                const result = await dashboard.showProductsByCategory('dashboard');
                expect (result).toEqual( 
                    jasmine.arrayContaining([
                        jasmine.objectContaining({
                            name: "dashTest",
                            price: 200,
                            category: "dashboard",
                        }) 
                    ])
                );
            } catch (err) {
                throw new Error (`Error: ${err}`);
            }

        });

    });

    describe("showTopFiveProducts Model Testing", () => {

        it('Should have showTopFiveProducts model', () => {
            expect (dashboard.showTopFiveProducts).toBeDefined();
        });

        it('Should return the top 5 products in each order based on the the quantity', async() => {
            try {
                const result = await dashboard.showTopFiveProducts();
                expect (result).toEqual( 
                    jasmine.arrayContaining([
                        jasmine.objectContaining({
                            name: "dashTest",
                            price: 200,
                            quantity: 20,
                        }) 
                    ])
                );
            } catch (err) {
                throw new Error (`Error: ${err}`);
            }
        });

    });

});



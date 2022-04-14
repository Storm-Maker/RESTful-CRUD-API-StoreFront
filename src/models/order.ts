// @ts-ignore
import Client from '../database';

export type Order = {
    id?: string;
    user_id?: string;
    status: string;
};

export class OrderStore {

    async index():Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders ORDER BY id ASC';

            const result = await conn.query(sql);

            const orders = result.rows;

            conn.release();

            return orders;
        } catch (err) {
            throw new Error (`Cannot get Orders ${err}`);
        }
    }

    async show(id: string):Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';

            const result = await conn.query(sql, [id]);

            const order = result.rows[0];

            conn.release();

            return order;
        } catch (err) {
            throw new Error (`Cannot get the order with ID:${id}. Error: ${err}`);
        }
    }

    async create(o:Order):Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
            // @ts-ignore
            const result = await conn.query(sql, [o.user_id, o.status]);

            const order = result.rows[0];

            conn.release();

            return order;
        } catch (err) {
            throw new Error (`Cannot create new order. Error: ${err}`);
        }
    }

    async update(o:Order):Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'UPDATE orders SET status=$2 WHERE id=($1) RETURNING *';
            // @ts-ignore
            const result = await conn.query(sql, [o.id, o.status]);

            const order = result.rows[0];

            conn.release();

            return order;
        } catch (err) {
            throw new Error (`Cannot edit order with ID:${o.id}. Error: ${err}`);
        }
    }

    async delete(id:string):Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
            // @ts-ignore
            const result = await conn.query(sql, [id]);

            const order = result.rows[0];

            conn.release();

            return order;
        } catch (err) {
            throw new Error (`Cannot delete order with ID:${id}. Error: ${err}`);
        }
    }

    // addProduct, adds a specific product to a specific order
    async addProduct(quantity:number, orderId:string, productId:string):Promise<{id:String, quantity:Number, orderId:String, productId:String}> {
        try {
            const conn = await Client.connect();

            const sqlOrder = 'SELECT * FROM orders WHERE id=($1)';
            // @ts-ignore
            const result = await conn.query(sqlOrder, [orderId]);

            const order = result.rows[0];

            if (order.status !== "active") {
                throw new Error(`Couldn't add product ${productId} to order ${orderId} because order status is ${order.status}`);
            };

            conn.release();

        } catch (err) {
            throw new Error (`Couldn't add product ${productId} to order ${orderId}. Error:${err}`);
        }

        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            // @ts-ignore
            const result = await conn.query(sql, [quantity, orderId, productId]);

            const order = result.rows[0];

            conn.release();

            return order;
        } catch (err) {
            throw new Error (`Cannot add product ${productId} to order ${orderId}. Error: ${err}`);
        }
    }

};
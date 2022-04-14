import { Product, ProductStore } from '../../models/product';
import 'jasmine';

const store = new ProductStore();

describe("Product Model", () => {

    describe("Create Model Testing", () => {
        it('Should have create model', () => {
            expect (store.create).toBeDefined();
        });

        it('Should create new product and return the new product', async() => {
            const product: Product = {
                name: "test",
                price: 200,
                category: "test",
            };

            try {
                const newProduct = await store.create(product);

                expect (newProduct).toEqual(jasmine.objectContaining({
                    name: "test",
                    price: 200,
                    category: "test",
                }));
            } catch (err) {
                throw new Error (`Error: ${err}`);
            }
        });
    });

    describe("Index Model Testing", () => {
        it('Should have index model', () => {
            expect (store.index).toBeDefined();
        });

        it('Should return a list of products', async() => {
            try {
                const result = await store.index();

                expect (result).toEqual( 
                    jasmine.arrayContaining([
                        jasmine.objectContaining({
                            name: "test",
                            price: 200,
                            category: "test",
                        }) 
                    ])
                );
            } catch (err) {
                throw new Error (`Error: ${err}`);
            }
        });
        
    });
    
    describe("Show Model Testing", () => {

        it('Should have show model', () => {
            expect (store.show).toBeDefined();
        });

        it('Should return a product', async() => {
            try {
                const result = await store.show('3');
                expect (result).toEqual(jasmine.objectContaining({
                    name: "test",
                    price: 200,
                    category: "test",
                }));
            } catch (err) {
                throw new Error (`Error: ${err}`);
            }
        });

    });

    describe("Update Model Testing", () => {
        
        it('Should have update model', () => {
            expect (store.update).toBeDefined();
        });

        it('Should update product and return the updated product', async() => {
            const product: Product = {
                id: 3,
                name: "test2",
                price: 200,
                category: "someTest",
            };

            try {
                const newProduct = await store.update(product);

                expect (newProduct).toEqual(jasmine.objectContaining({
                    name: "test2",
                    price: 200,
                    category: "someTest",
                }));
            } catch (err) {
                throw new Error (`Error: ${err}`);
            }
        });

    });
    
    describe("Delete Model Testing", () => {

        it('Should have delete model', () => {
            expect (store.delete).toBeDefined();
        });

        it('Should delete product and return the deleted product', async() => {
            try {
                const newProduct = await store.delete(3 as unknown as string);

                expect (newProduct).toEqual(jasmine.objectContaining({
                    name: "test2",
                    price: 200,
                    category: "someTest",
                }));
            } catch (err) {
                throw new Error (`Error: ${err}`);
            }
        });

    });

});
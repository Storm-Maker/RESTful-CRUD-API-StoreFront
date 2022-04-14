import { User, UserStore } from '../../models/user';
import jwt from 'jsonwebtoken';
import 'jasmine';

const store = new UserStore();

describe("User Model", () => {

    describe("Create Model Testing", () => {
        it('Should have create model', () => {
            expect (store.create).toBeDefined();
        });

        it('Should create new user and return the new user', async() => {
            const user: User = {
                first_name: 'firstName',
                last_name: 'lastName',
                user_name: 'userNameTest',
                password_digest:'myPassword123'
                };

            try {
                const newUser = await store.create(user);

                expect (newUser).toEqual(jasmine.objectContaining({
                    first_name: 'firstName',
                    last_name: 'lastName',
                    user_name: 'userNameTest'
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

        it('Should return a list of orders', async() => {
            try {
                const result = await store.index();
            
                expect (result).toEqual( 
                    jasmine.arrayContaining([
                        jasmine.objectContaining({
                            first_name: 'firstName',
                            last_name: 'lastName',
                            user_name: 'userNameTest'
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
        it('Should return a user', async() => {
            try {
                const result = await store.show('userNameTest');
                expect (result).toEqual(jasmine.objectContaining({
                    first_name: 'firstName',
                    last_name: 'lastName',
                    user_name: 'userNameTest'
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

        it('Should update user and return the updated user', async() => {
            const user: User = {
                first_name: 'myFirstName',
                last_name: 'myLastName',
                user_name: 'userNameTest',
                password_digest:'myPassword12345'
            };

            try {
                const newUser = await store.update(user);

                expect (newUser).toEqual(jasmine.objectContaining({
                    first_name: 'myFirstName',
                    last_name: 'myLastName',
                    user_name: 'userNameTest'
                    }));
            } catch (err) {
                throw new Error (`Error: ${err}`);
            }
        });
    });
    
    describe("Authenticate Model Testing", () => {
        it('Should have authenticate model', () => {
            expect (store.authenticate).toBeDefined();
        });

        it('Should authenticate a user', async() => {
            const user_name = 'userNameTest';
            const password_digest = 'myPassword12345';
            try {
                const newUser = await store.authenticate(user_name, password_digest);

                var token:string = jwt.sign({user: newUser}, process.env.TOKEN_SECRET as string);
    
                expect (token).toEqual(jasmine.stringContaining('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'));

            } catch (err) {
                throw new Error (`Error: ${err}`);
            }
        });
    });
    
    describe("Delete Model Testing", () => {
        it('Should have delete model', () => {
            expect (store.delete).toBeDefined();
        });

        it('Should delete user and return the deleted user', async() => {
            try {
                const deleteUser = await store.delete('userNameTest');

                expect (deleteUser).toEqual(jasmine.objectContaining({
                    first_name: 'myFirstName',
                    last_name: 'myLastName',
                    user_name: 'userNameTest'
                }));
            } catch (err) {
                throw new Error (`Error: ${err}`);
            }
        });
    });

});
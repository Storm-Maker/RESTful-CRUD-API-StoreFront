import express, {Request, Response} from 'express';
import {User, UserStore} from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new UserStore();

// index, display all the users
const index = async (_req: Request, res: Response) =>{
    try {
        const users = await store.index();
        res.json(users).end();
    } catch (err) {
        res.status(400).json(err).end();
    }
};

// show, display a specific user based on user_name
const show = async (_req: Request, res: Response) =>{
    try {
        const user = await store.show(_req.params.user_name);
        res.json(user).end();
    } catch (err) {
        res.status(400).json(err).end();
    }
};

// create, creates a new user
const create = async (_req: Request, res: Response) =>{
    try {
        const user: User = {
            first_name: _req.body.first_name,
            last_name: _req.body.last_name,
            user_name: _req.body.user_name,
            password_digest: _req.body.password_digest
        };

        try{
            const newUser = await store.create(user);
            var token:string = jwt.sign({user: newUser}, process.env.TOKEN_SECRET as string);
            res.json(`User ${user.user_name} Created Successfully, Token: ${token}`).end();
        } catch (err) {
            res.status(400).json(err).end();
        }

    } catch (err) {
        res.status(400).json(err).end();
    }
};

// update, updates a specific user based on user_name
const update = async (req: Request, res: Response) =>{

    try {
        
        const user: User = {
            user_name: req.params.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password_digest: req.body.password_digest
        };

        try{
            const updateUser = await store.update(user);
            res.json(`User ${user.user_name} Updated Successfully!`).end();
        } catch (err) {
            res.status(400).json(err).end();
        }

    } catch (err) {
        res.status(400).json(err).end();
    }

};

// destroy, deletes a specific user based on user_name
const destroy = async (_req: Request, res: Response) =>{
    try {
        const deleteUser = await store.delete(_req.params.user_name);
        res.json(deleteUser).end();
    } catch (err) {
        res.status(400).json(err).end();
    }
};

// authenticate, the log-in route to allow access and return token
const authenticate = async (req: Request, res: Response) =>{

    const user: User = {
        user_name: req.body.user_name,
        password_digest: req.body.password_digest,
    };
    
    try {
        const authenticate = await store.authenticate(user.user_name, user.password_digest);
        if (authenticate !== null){
            var token = jwt.sign({user: authenticate}, process.env.TOKEN_SECRET as string);
            res.json(`User ${user.user_name} Logged-In Successfully, Bearer Token: ${token}`).end();
        } else {
            res.status(401).json(`Failed login attempt! make sure you are a registered user and check your credentials then try again`).end();
        }

    } catch(err) {
        res.status(401).json(`${err} + ${user}`).end();
    };
};

const usersRoutes = (app: express.Application) =>{
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:user_name', verifyAuthToken, show);
    app.post('/users', create);
    app.put('/users/:user_name', verifyAuthToken, update);
    app.delete('/users/:user_name', verifyAuthToken, destroy);
    app.post('/users/authenticate', authenticate);
};

export default usersRoutes;
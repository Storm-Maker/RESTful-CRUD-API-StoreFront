"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const store = new user_1.UserStore();
// index, display all the users
const index = async (_req, res) => {
    try {
        const users = await store.index();
        res.json(users).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
// show, display a specific user based on user_name
const show = async (_req, res) => {
    try {
        const user = await store.show(_req.params.user_name);
        res.json(user).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
// create, creates a new user
const create = async (_req, res) => {
    try {
        const user = {
            first_name: _req.body.first_name,
            last_name: _req.body.last_name,
            user_name: _req.body.user_name,
            password_digest: _req.body.password_digest
        };
        try {
            const newUser = await store.create(user);
            var token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
            res.json(`User ${user.user_name} Created Successfully, Token: ${token}`).end();
        }
        catch (err) {
            res.status(400).json(err).end();
        }
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
// update, updates a specific user based on user_name
const update = async (req, res) => {
    try {
        const user = {
            user_name: req.params.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password_digest: req.body.password_digest
        };
        try {
            const updateUser = await store.update(user);
            res.json(`User ${user.user_name} Updated Successfully!`).end();
        }
        catch (err) {
            res.status(400).json(err).end();
        }
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
// destroy, deletes a specific user based on user_name
const destroy = async (_req, res) => {
    try {
        const deleteUser = await store.delete(_req.params.user_name);
        res.json(deleteUser).end();
    }
    catch (err) {
        res.status(400).json(err).end();
    }
};
// authenticate, the log-in route to allow access and return token
const authenticate = async (req, res) => {
    const user = {
        user_name: req.body.user_name,
        password_digest: req.body.password_digest,
    };
    try {
        const authenticate = await store.authenticate(user.user_name, user.password_digest);
        if (authenticate !== null) {
            var token = jsonwebtoken_1.default.sign({ user: authenticate }, process.env.TOKEN_SECRET);
            res.json(`User ${user.user_name} Logged-In Successfully, Bearer Token: ${token}`).end();
        }
        else {
            res.status(401).json(`Failed login attempt! make sure you are a registered user and check your credentials then try again`).end();
        }
    }
    catch (err) {
        res.status(401).json(`${err} + ${user}`).end();
    }
    ;
};
const usersRoutes = (app) => {
    app.get('/users', verifyAuthToken_1.default, index);
    app.get('/users/:user_name', verifyAuthToken_1.default, show);
    app.post('/users', create);
    app.put('/users/:user_name', verifyAuthToken_1.default, update);
    app.delete('/users/:user_name', verifyAuthToken_1.default, destroy);
    app.post('/users/authenticate', authenticate);
};
exports.default = usersRoutes;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// const pepper = require('pepper');
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const pepper = process.env.BCRYPT_PASSWORD;
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users ORDER BY id ASC';
            const result = await conn.query(sql);
            const users = result.rows;
            conn.release();
            return users;
        }
        catch (err) {
            throw new Error(`Cannot get users ${err}`);
        }
    }
    async show(user_name) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE user_name=($1)';
            const result = await conn.query(sql, [user_name]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Cannot get the user ${user_name}. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (first_name, last_name, user_name, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
            const hash = bcrypt_1.default.hashSync(u.password_digest + pepper, saltRounds);
            // @ts-ignore
            const result = await conn.query(sql, [u.first_name, u.last_name, u.user_name, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Cannot create new user "${u.user_name}". Error: ${err}`);
        }
    }
    async update(u) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'UPDATE users SET (first_name, last_name, user_name, password_digest) = ($1, $2, $3, $4) WHERE user_name=($3) RETURNING *';
            const hash = bcrypt_1.default.hashSync(u.password_digest + pepper, saltRounds);
            // @ts-ignore
            const result = await conn.query(sql, [u.first_name, u.last_name, u.user_name, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Cannot edit user ${u.user_name}. Error: ${err}`);
        }
    }
    async delete(user_name) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM users WHERE user_name=($1) RETURNING *';
            // @ts-ignore
            const result = await conn.query(sql, [user_name]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Cannot delete user ${user_name}. Error: ${err}`);
        }
    }
    // the log-in verification model
    async authenticate(user_name, password) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT password_digest FROM users WHERE user_name=($1)';
            // @ts-ignore
            const result = await conn.query(sql, [user_name]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + pepper, user.password_digest)) {
                    return user;
                }
                ;
            }
            ;
            conn.release();
            return null;
        }
        catch (err) {
            throw new Error(`Cannot authenticate user ${user_name}. Error: ${err}`);
        }
    }
}
exports.UserStore = UserStore;

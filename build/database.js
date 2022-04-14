"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgressConfig_1 = __importDefault(require("./config/postgressConfig"));
const pg_1 = require("pg");
const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_USER, POSTGRES_PASSWORD, defaultEnv } = postgressConfig_1.default;
let db;
// checking the default environment test/dev and set-up the database accordingly 
if (defaultEnv === 'test') {
    db = POSTGRES_DB_TEST;
}
else {
    db = POSTGRES_DB;
}
// setting up the client for the models to connect with db
const Client = new pg_1.Pool({
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    database: db,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});
exports.default = Client;

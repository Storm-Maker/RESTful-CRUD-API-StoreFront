"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var postgressConfig_1 = __importDefault(require("./config/postgressConfig"));
var pg_1 = require("pg");
var POSTGRES_HOST = postgressConfig_1["default"].POSTGRES_HOST, POSTGRES_PORT = postgressConfig_1["default"].POSTGRES_PORT, POSTGRES_DB = postgressConfig_1["default"].POSTGRES_DB, POSTGRES_DB_TEST = postgressConfig_1["default"].POSTGRES_DB_TEST, POSTGRES_USER = postgressConfig_1["default"].POSTGRES_USER, POSTGRES_PASSWORD = postgressConfig_1["default"].POSTGRES_PASSWORD, defaultEnv = postgressConfig_1["default"].defaultEnv;
var db;
// checking the default environment test/dev and set-up the database accordingly 
if (defaultEnv === 'test') {
    db = POSTGRES_DB_TEST;
}
else {
    db = POSTGRES_DB;
}
// setting up the client for the models to connect with db
var Client = new pg_1.Pool({
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    database: db,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});
exports["default"] = Client;

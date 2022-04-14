"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// Configuration file to export the db configurations from .env to database.ts
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
module.exports = {
    endpoint: process.env.API_URL,
    masterKey: process.env.API_KEY,
    port: process.env.PORT,
    defaultEnv: process.env.NODE_ENV,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_DB_TEST: process.env.POSTGRES_DB_TEST,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD
};
exports["default"] = module.exports;

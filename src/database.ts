import dotenv from './config/postgressConfig';
import { Pool } from 'pg';

const { 
    POSTGRES_HOST, 
    POSTGRES_PORT, 
    POSTGRES_DB, 
    POSTGRES_DB_TEST, 
    POSTGRES_USER, 
    POSTGRES_PASSWORD, 
    defaultEnv 
} = dotenv;

let db:string;

// checking the default environment test/dev and set-up the database accordingly 
if (defaultEnv === 'test'){
    db = POSTGRES_DB_TEST;
} else {
    db = POSTGRES_DB;
}

// setting up the client for the models to connect with db
const Client = new Pool({
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    database: db,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});

export default Client;
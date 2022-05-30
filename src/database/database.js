import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
 
const { Pool } = pg;

const databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const db = new Pool(databaseConfig);
db ? console.log('connect to database sucessfully\nhappy hacking') : console.log('failed to connect to database');

export default db;
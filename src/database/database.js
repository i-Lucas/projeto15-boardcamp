import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const db = new Pool({

    connectionString: process.env.DATABASE_URL,
});

db ? console.log('connect to database sucessfully\nhappy hacking') : console.log('failed to connect to database\n:/');

export default db;
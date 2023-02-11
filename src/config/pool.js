import dotenv from 'dotenv'
dotenv.config()
import pg from 'pg'
const { Pool } = pg

/* const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'spaces',
    password: 'mint',
    port: 5432,
}) */

const pool = new Pool ({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: true
})

export default pool;
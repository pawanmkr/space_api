import pg from 'pg'
const { Pool } = pg

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'spaces',
    password: 'wakeywakey',
    port: 5432,
})

export default pool;
import pg from 'pg'
const { Pool } = pg

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dummy',
    password: 'postgres',
    port: 5432,
})

export default db;
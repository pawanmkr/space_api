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
    host: 'ep-nameless-credit-409755.ap-southeast-1.aws.neon.tech',
    database: 'neondb',
    user: 'pawanmkr',
    password: 'zpTak9Rbvh8f',
    port: 5432,
    ssl: true
})

export default pool
/* import pg from 'pg';
import dotenv from 'dotenv';
const __dirname = decodeURI(new URL('.', import.meta.url).pathname);

console.log(dotenv.config({ path: __dirname + "../" + ".env" }));

var conString = process.env.DATABASE_URL
var pool = new pg.Client(conString);
pool.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  pool.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
  });
}); */

import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'spaces',
    password: 'wakeywakey',
    port: 5432,
})

export default pool;
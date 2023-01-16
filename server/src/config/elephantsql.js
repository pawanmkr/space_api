import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

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
});

export default pool;
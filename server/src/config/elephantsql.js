import pg from 'pg';
//or native libpq bindings
//var pg = require('pg').native

var conString = "postgres://krbxceqk:MOkgOL35gOjLM883i-OXL2woBvpT8taZ@dumbo.db.elephantsql.com/krbxceqk" //Can be found in the Details page
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
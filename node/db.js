var pg = require('pg');
var conString = "postgres://postgres:123@localhost:5432/postgres";

var entities = {};

function sendJson(res, json) {
    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
    res.write(JSON.stringify(json));
    res.end();
}

entities['articles'] = function(res) {

    pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }


    client.query('SET search_path TO public');
    client.query('SELECT "TITLE", "TEXT" FROM "ARTICLES"', function(err, result) {
     //call `done()` to release the client back to the pool
     done();
     sendJson(res,result.rows);
     if(err) {
       return console.error('error running query', err);
     }
     //output: 1
      });   
    });
}


module.exports = {
    entities
}
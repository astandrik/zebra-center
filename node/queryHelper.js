var pg = require('pg');
var dbconf = require('./dbconfig');
var conString = `postgres://${dbconf.username}:${dbconf.password}@localhost:5432/${dbconf.dbName}`;

function sendJson(res, json) {
    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
    res.write(JSON.stringify(json));
    res.end();
}


function makeReadQuery(queryString, res) {
    pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }


    client.query('SET search_path TO public');
    client.query(queryString, function(err, result) {
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

function makeUpdateQuery(TableName, item, res) {
    pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
    var params = [];
    for(var e in item) {
        params.push(`"${e}" = '${item[e]}'`); 
    }
    var query = "UPDATE " + `"${TableName}"` + " SET " + params.join();  
    client.query('SET search_path TO public');
    
    client.query(query, function(err, result) {
     //call `done()` to release the client back to the pool
     done();
     sendJson(res,result);
     if(err) {
       return console.error('error running query', err);
     }
     //output: 1
      });
    });
}

function makeCreateQuery(TableName, item, res) {
    pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
    var params = [];
    var values = [];
    for(var e in item) {
        if(e != "ID") {
            params.push(`"${e}"`);
            values.push(`'${item[e]}'`);
        }
    }
    var query = "INSERT INTO " + `"${TableName}" (${params.join()}) VALUES (${values.join()})`;  
    client.query('SET search_path TO public');
    
    client.query(query, function(err, result) {
     //call `done()` to release the client back to the pool
     done();
     sendJson(res,result);
     if(err) {
       return console.error('error running query', err);
     }
     //output: 1
      });
    });
}

module.exports = {
    Read: makeReadQuery,
    Update: makeUpdateQuery,
    Create: makeCreateQuery
}
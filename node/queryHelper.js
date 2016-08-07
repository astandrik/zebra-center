var pg = require('pg');
var dbconf = require('./dbconfig');
var conString = `postgres://${dbconf.username}:${dbconf.password}@127.0.0.1:5432/${dbconf.dbName}`;

var setPath = function(client) {
  client.query('SET search_path TO public');
}

function sendJson(res, json) {
    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
    res.write(JSON.stringify(json));
    res.end();
}

function makeSimpleQuery(queryString, needSetPath) {
  pg.connect(conString, function(err, client, done) {
    if(needSetPath) {
      setPath(client);
    }
    client.query(queryString, function(err,result) {
      console.log(err);
      console.log(result);
      console.log('----------------------------------------------------------------');
      done();
    });
  });
}


function makeReadQuery(queryString, values, res) {
    pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }

    setPath(client);
    client.query(queryString, values, function(err, result) {
     //call `done()` to release the client back to the pool
     if(err) {
         console.log(queryString);
         console.log(values);
         console.log(err);
     }
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
    var where = "";
    for(var e in item) {
        if(e != "ID") {
            params.push(`"${e}" = '${item[e]}'`);
        } else {
            where = ' WHERE "ID" = ' + item[e];
        }
    }
    var query = "UPDATE " + `"${TableName}"` + " SET " + params.join() + where;

    setPath(client);
    client.query(query, function(err, result) {
     //call `done()` to release the client back to the pool
    if(err) {
         console.log(query);
         console.log(values);
         console.log(err);
     }
     done();
        if(!err) {
            sendJson(res,result);
        }
     if(err) {
       return console.error('error running query', err);
     }
     //output: 1
      });
    });
}

function makeCreateQuery(TableName, item, res, nores) {
    pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
    var params = [];
    var values = [];
    var numvalues = [];
    var i = 1;
    for(var e in item) {
        if(e != "ID") {
            params.push(`"${e}"`);
            values.push(item[e] || !isNaN(item[e]) ? item[e].toString(): null);
            numvalues.push('$'+i++);
        }
    }
    var query = "INSERT INTO " + `"${TableName}" (${params.join()}) VALUES (${numvalues.join()})`;
    setPath(client);
    client.query(query,values, function(err, result) {
     //call `done()` to release the client back to the pool
     if(err) {
         console.log(query);
         console.log(values);
         console.log(err);
     }
     done();
    if(err) console.log(err);
        if(!nores) {
            sendJson(res,result);
        }
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
    Create: makeCreateQuery,
    Query: makeSimpleQuery,
    sendJson: sendJson
}

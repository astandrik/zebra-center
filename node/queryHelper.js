var pg = require('pg');
var dbconf = require('./dbconfig');
//conString = `postgres://${dbconf.username}:${dbconf.password}@127.0.0.1:5432/${dbconf.dbName}`;
conString = dbconf.conString;

function sendJson(res, json) {
    res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8"
    });
    res.write(JSON.stringify(json));
    res.end();
}


var rollback = function (client, done, err, modulename) {
    console.log(`Error ${err} ocurred in module ${modulename}`);
    client.query('ROLLBACK', function (err) {
        return done(err);
    });
};

function makeTransaction(transactionBody) {
    pg.connect(conString, function (err, client, done) {
        client.query('BEGIN', function (err, result) {
            if (err) return rollback(client, done, err, "Transaction");
            var commit = () => {
                client.query('COMMIT', client.end.bind(client));
            };
            var resolve = (data) => {
                commit(data);
                sendJson(data.res, data.result);
            };
            var reject = (info) => {
                rollback(info.client, info.done, info.err, info.modulename);
            }
            transactionBody(resolve, reject);
        });
    });
}


module.exports = {
    makeTransaction
}

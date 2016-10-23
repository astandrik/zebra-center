var pg = require('pg');
var dbconf = require('./dbconfig');
//conString = `postgres://${dbconf.username}:${dbconf.password}@127.0.0.1:5432/${dbconf.dbName}`;
constring = dbconf.conString;

var setPath = function (client) {
    client.query('SET search_path TO public');
}

function makeSimpleQuery(queryString, needSetPath, callback) {
    pg.connect(conString, function (err, client, done) {
        if (needSetPath) {
            setPath(client);
        }
        if (err) {
            reject({
                err,
                client,
                done,
                modulename: queryString
            });
        }
        client.query(queryString, function (err, result) {
            if (err) {
                reject({
                    err,
                    client,
                    done,
                    modulename: queryString
                });
            }
            done();
            callback();
        });
    });
};


function makeReadQuery(queryString, values, res) {
    return new Promise((resolve, reject) => {
        pg.connect(conString, function (err, client, done) {
            if (err) {
                console.error('error fetching client from pool', err);
                reject({
                    err,
                    client,
                    done,
                    modulename: queryString
                });
            }

            setPath(client);
            client.query(queryString, values, function (err, result) {
                if (err) {
                    console.log(queryString);
                    console.log(values);
                    console.log(err);
                    reject({
                        err,
                        client,
                        done,
                        modulename: queryString
                    });
                }
                done();
                resolve({
                    res: res,
                    result: result.rows
                });
                if (err) {
                    console.error('error running query', err);
                    reject({
                        err,
                        client,
                        done,
                        modulename: queryString
                    });
                }
            });
        });
    });
}

function makeUpdateQuery(TableName, item, res) {
    return new Promise((resolve, reject) => {
        pg.connect(conString, function (err, client, done) {
            if (err) {
                console.log(err);
                reject({
                    client,
                    done,
                    err,
                    modulename: TableName + "Update"
                });
            }
            var params = [];
            var where = "";
            for (var e in item) {
                if (e != "ID") {
                    params.push(`"${e}" = '${item[e]}'`);
                } else {
                    where = ' WHERE "ID" = ' + item[e];
                }
            }
            var query = "UPDATE " + `"${TableName}"` + " SET " + params.join() + where;
            setPath(client);
            client.query(query, function (err, result) {
                if (err) {
                    console.log(query);
                    console.log(values);
                    console.log(err);
                    reject({
                        client,
                        done,
                        err,
                        modulename: query
                    });
                }
                done();
                if (err) {
                    return console.error('error running query', err);
                    reject({
                        client,
                        done,
                        err,
                        modulename: query
                    });
                }
                resolve({
                    res,
                    result
                });
            });
        });
    });
}


function makeCreateQuery(TableName, item, res) {
    return new Promise((resolve, reject) => {
        pg.connect(conString, function (err, client, done) {
            if (err) {
                console.error('error fetching client from pool', err);
                reject({
                    client,
                    done,
                    err,
                    modulename: TableName + " Create"
                });
            }
            var params = [];
            var values = [];
            var numvalues = [];
            var i = 1;
            for (var e in item) {
                if (e != "ID") {
                    params.push(`"${e}"`);
                    values.push(item[e] || !isNaN(item[e]) ? item[e].toString() : null);
                    numvalues.push('$' + i++);
                }
            }
            var query = "INSERT INTO " + `"${TableName}" (${params.join()}) VALUES (${numvalues.join()})`;
            setPath(client);
            client.query(query, values, function (err, result) {
                if (err) {
                    console.log(query);
                    console.log(values);
                    console.log(err);
                    reject({
                        client,
                        done,
                        err,
                        modulename: query
                    });
                }
                done();
                if (err) {
                    console.log(err);
                    reject({
                        client,
                        done,
                        err,
                        modulename: query
                    });
                }
                resolve({
                    res,
                    result
                });
            });
        });
    });
}


module.exports = {
    Read: makeReadQuery,
    Update: makeUpdateQuery,
    Create: makeCreateQuery,
    Query: makeSimpleQuery
}

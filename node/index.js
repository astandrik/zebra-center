var dbWorker = require('./db.js');
var path = require('path');
var appDir = path.resolve('./');
var bodyParser = require('body-parser');
var fs = require("fs");
var morgan = require('morgan');
var jwt = require('jwt-simple');
var app = require("./app").app;
var express = require("./app").express;
var compression = require('compression');
var gzipStatic = require('connect-gzip-static');
app.use(gzipStatic(appDir + '/build'));
app.use(require('prerender-node').set('prerenderServiceUrl', 'http://localhost:3000'));

app.set('jwtTokenSecret', 'Big Beardy Beary Gnome');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
//app.use(compression());
const accessLogStream = fs.createWriteStream(__dirname + '/server_logs.log', {
    flags: 'a'
});
app.use(require('skipper')());

var port = process.env.PORT || 80;
var server = app.listen(port, function () {
    console.log(this.address());
});

const getRawToken = function (req) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    return token;
}

const getToken = function (req) {
    var token = getRawToken(req);
    if (token) {
        try {
            var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
        } catch (err) {
            return "invalid token"
        }
    } else {
        return "no_token";
    }
    return decoded;
}



const checkToken = function (req, res, callback) {
    var token = getToken(req);
    if (token == "no_token" || token == "invalid token") {
        res.send(token);
        return;
    } else {
        if (token.exp <= Date.now()) {
            res.end('Access token has expired', 400);
            return;
        }
        if (token.userid == 1) {
            callback(req, res);
        }
    }
}

app.use(express.static('build'));
app.use(express.static(appDir));

app.use(morgan(':method :url :response-time :remote-addr :date', {
    stream: accessLogStream
}));
var browser = require('file-manager-js');
app.all('/browse_url', browser.browse);
app.post('/upload_url', browser.upload);

app.get('/database/drop', function (req, res) {
    //dbWorker.schemaOps.drop();
    res.send("Don't even try")
});

app.get('/dbprepare',
    function (req, res) {
        dbWorker.schemaOps.createCrypto();
    });

var userSessions = {};

app.post("/checkSession", function (req, res) {
    req.setTimeout(0) // no timeout
    const token = getToken(req);
    if (token == "no_token" || token == "invalid token") {
        res.send("not logged in");
    } else {
        var intervalId = setInterval(() => {
            if (token.exp <= Date.now()) {
                res.send("session over");
                clearInterval(intervalId);
            }
        }, 1000);
        userSessions[JSON.stringify(token)] = ({
            endSession: () => {
                res.send("session over");
                clearInterval(intervalId);
            }
        });
    }
});

app.post("/endSession", function (req, res) {
    const token = getToken(req);
    const stringToken = JSON.stringify(token);
    if (token && userSessions[stringToken] && userSessions[stringToken].endSession) {
        userSessions[stringToken].endSession();
        userSessions[stringToken] = null;
        res.send("session ended");
    }
});

app.get('/database/create', function (req, res) {
    //dbWorker.schemaOps.createDb();
    res.send('Db created successfully(20 years ago)');
})

app.post('/admin/login', function (req, res) {
    dbWorker.entities['admin'].checkPassword(req.body, res);
});

app.post('/structure/update', function (req, res) {
    const callback = (req, res) => {
        var name = req.body;
        dbWorker.entities['structure'].updateStructure(req.body, res);
    };
    checkToken(req, res, callback);
});
app.get('/structure/get', function (req, res) {
    var result = dbWorker.entities['structure'].getStructure(res);
});
app.get('/data/viewsList', function (req, res) {
    dbWorker.entities['structure'].getViewsList(res);
});

app.post('/data/addArticle', function (req, res) {
    const callback = (req, res) => {
        var name = req.body;
        dbWorker.entities['articles'].create(req.body, res);
    };
    checkToken(req, res, callback);
});
app.post('/data/updateArticle', function (req, res) {
    const callback = (req, res) => {
        var name = req.body;
        dbWorker.entities['articles'].update(req.body, res);
    };
    checkToken(req, res, callback);
});
app.post('/data/updateArticleGrid', function (req, res) {
    const callback = (req, res) => {
        dbWorker.entities['articles'].updateGrid(req.body, res);
    };
    checkToken(req, res, callback);
});
app.get('/data/articles', function (req, res) {
    var result = dbWorker.entities['articles'].getAll(res);
});
app.get('/data/articles/:alias', function (req, res) {
    var result = dbWorker.entities['articles'].getSingleByAlias(req.params.alias, res);
});
app.get('/data/articles/byViewId/:id', function (req, res) {
    var result = dbWorker.entities['articles'].getSingleByViewId(req.params.id, res);
});
app.get('/data/articles/byViewAlias/:alias', function (req, res) {
    var result = dbWorker.entities['articles'].getSingleByViewAlias(req.params.alias, res);
});
app.get('/*', function (req, res) {
    res.sendFile(appDir + '/app/index.html');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;

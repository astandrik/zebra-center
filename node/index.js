var express = require("express"),
    app     = express(),
    dbWorker = require('./db.js');
var path = require('path');
var appDir = path.resolve('./');
var bodyParser = require('body-parser')
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var port = process.env.PORT || 80;
var server = app.listen(port, function() {
  console.log(this.address());
});


app.use(express.static('build'));
app.use(express.static(appDir));

app.get('/database/drop',function(req,res) {
    dbWorker.schemaOps.drop();
});
app.get('/database/create', function(req,res) {
  dbWorker.schemaOps.createDb();
  res.send('Db created successfully');
})

app.post('/structure/update',  function(req, res) {
    var name = req.body;
    dbWorker.entities['structure'].updateStructure(req.body, res);
});
app.get('/structure/get', function(req,res) {
    var result = dbWorker.entities['structure'].getStructure(res);
});


app.post('/data/addArticle', function(req, res) {
    var name = req.body;
    dbWorker.entities['articles'].create(req.body, res);
});
app.post('/data/updateArticle', function(req, res) {
    var name = req.body;
    dbWorker.entities['articles'].update(req.body, res);
});
app.post('/data/updateArticleGrid', function(req, res) {
  dbWorker.entities['articles'].updateGrid(req.body, res);
});
app.get('/data/articles', function(req,res) {
    var result = dbWorker.entities['articles'].getAll(res);
});
app.get('/data/articles/:alias', function(req,res) {
    var result = dbWorker.entities['articles'].getSingleByAlias(req.params.alias, res);
});
app.get('/data/articles/byViewId/:id', function(req,res) {
    var result = dbWorker.entities['articles'].getSingleByViewId(req.params.id, res);
});
app.get('/*', function(req,res) {
  res.sendFile(appDir + '/app/index.html');
})

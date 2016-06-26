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

var port = process.env.PORT || 8080;
var server = app.listen(port, function() {
  console.log(this.address());
});


app.use(express.static('build'));
app.use(express.static(appDir));

app.post('/data/addArticle', function(req, res) {
    var name = req.body;
    dbWorker.entities['articles'].update(req.body, res);
});
app.get('/data/articles', function(req,res) {
    var result = dbWorker.entities['articles'].get(res);
});
app.get('/', function(req,res) {
  res.sendFile(appDir + '/app/index.html');
})



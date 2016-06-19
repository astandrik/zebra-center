var express = require("express"),
    app     = express(),
    dbWorker = require('./db.js');
var path = require('path');
var appDir = path.resolve('./');

var port = process.env.PORT || 8080;
var server = app.listen(port, function() {
  console.log(this.address());
});


app.use(express.static('build'));
app.use(express.static(appDir));
app.get('/data/articles', function(req,res) {
    var result = dbWorker.entities['articles'](res);
});
app.get('/', function(req,res) {
  res.sendFile(appDir + '/app/index.html');
})



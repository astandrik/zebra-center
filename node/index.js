var express = require("express"),
    app     = express();


var port = process.env.PORT || 8080;
var server = app.listen(port, function() {
  console.log(this.address());
});


app.use(express.static('build'));


app.get('/', function(req,res) {
  res.sendfile(__dirname + '/app/index.html');
})

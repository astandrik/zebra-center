var Articles = require('./models/Articles').article;
var GridItem = require('./models/Articles').gridItem;
var qHelper = require('./queryHelper.js');
var fs = require('fs');

var entities = {};

var schemaOps = {};
schemaOps.drop = function() {
  qHelper.Query('drop schema public cascade');
}

schemaOps.createDb = function() {
  qHelper.Query('create schema public');
  var script = fs.readFileSync('./node/dbscripts/createDrafts.txt','utf8');
  console.log(script);
  qHelper.Query(script, true);
}

entities['articles'] = {};

entities['articles'].getAll = function(res) {
    Articles().SelectAll(res);
};

entities['articles'].getSingleByAlias = function(alias,res) {
     Articles().SelectByAlias(alias, res);
}

entities['articles'].getSingleByViewId = function(id,res) {
     Articles().SelectByViewId(id, res);
}

entities['articles'].update = function(item, res) {
    Articles(item).Update(res);
};

entities['articles'].create = function(item, res) {
    Articles(item).Create(res);
}

entities['articles'].updateGrid = function(item, res) {
  GridItem(item).Update(res);
}

module.exports = {
    entities,
    schemaOps
}

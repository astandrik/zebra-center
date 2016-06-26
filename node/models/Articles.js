var qHelper = require('../queryHelper.js');
var Article = function(item) {
    var obj = {};
    if(item) {
        obj.Article = {};
        obj.Article.ID = item.id;
        obj.Article.TITLE = item.title;
        obj.Article.TEXT = item.text;
    }
    obj.SelectAll = function(res) {
        qHelper.Read('SELECT "ID","TITLE", "TEXT" FROM "ARTICLES"', res);
    };
    obj.Update = function(res) {
        qHelper.Update("ARTICLES", obj.Article, res);
    };
    obj.Create = function(res) {
        qHelper.Create("ARTICLES", obj.Article, res);
    }
    return obj;
}

module.exports = Article;
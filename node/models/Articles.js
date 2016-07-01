var qHelper = require('../queryHelper.js');
var Article = function(item) {
    var obj = {};
    if(item) {
        obj.Article = {};
        obj.Article.ID = item.id;
        obj.Article.TITLE = item.title;
        obj.Article.HEADER = item.header;
        obj.Article.KEYWORDS = item.keywords;
        obj.Article.DESCRIPTION = item.description;
        obj.Article.ANNOTATION = item.annotation;
        obj.Article.ALIAS = item.alias;
        obj.Article.TEXT = item.text;
    }
    obj.SelectAll = function(res) {
        qHelper.Read('SELECT "ID","TITLE", "TEXT", "HEADER", "DESCRIPTION", "ANNOTATION", "ALIAS", "KEYWORDS" FROM "DRAFTS"', res);
    };
    obj.Update = function(res) {
        qHelper.Update("DRAFTS", obj.Article, res);
    };
    obj.Create = function(res) {
        qHelper.Create("DRAFTS", obj.Article, res);
    }
    return obj;
}

module.exports = Article;

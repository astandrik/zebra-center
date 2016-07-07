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
        obj.Article.VIEWID = item.viewid;
    }
    obj.SelectAll = function(res) {
        qHelper.Read('SELECT "ID","TITLE", "TEXT", "HEADER", "DESCRIPTION", "ANNOTATION", "ALIAS", "KEYWORDS", "VIEWID", "SIZEX", "SIZEY", "POSX", "POSY" FROM "DRAFTS"', [] ,res);
    };
    obj.SelectByAlias = function(alias, res) {
        qHelper.Read('SELECT "ID","TITLE", "TEXT", "HEADER", "DESCRIPTION", "ANNOTATION", "ALIAS", "KEYWORDS", "VIEWID" FROM "DRAFTS" WHERE "ALIAS"=$1',[alias],res);
    }
    obj.SelectByViewId = function(id, res) {
         qHelper.Read('SELECT "ID","TITLE", "TEXT", "HEADER", "DESCRIPTION", "ANNOTATION", "ALIAS", "KEYWORDS", "VIEWID", "SIZEX", "SIZEY", "POSX", "POSY" FROM "DRAFTS" WHERE "VIEWID"=$1',[id],res);
    }
    obj.Update = function(res) {
        qHelper.Update("DRAFTS", obj.Article, res);
    };
    obj.Create = function(res) {
        qHelper.Create("DRAFTS", obj.Article, res);
    }
    return obj;
}

var gridItem = function(item) {
    var obj = {};
    if(item) {
        obj.Article = {};
        obj.Article.ID = item.id;
        obj.Article.POSX = item.position[0];
        obj.Article.POSY = item.position[1];
        obj.Article.SIZEX = item.size.x;
        obj.Article.SIZEY = item.size.y;
    }
    obj.Update = function(res) {
        qHelper.Update("DRAFTS", obj.Article, res);
    };
    return obj;
}

module.exports = {
  article: Article,
  gridItem: gridItem
}

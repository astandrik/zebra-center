var qHelper = require('../queryHelper.js');
var crud = require('../CRUD.js');
var Article = function (item) {
    var obj = {};
    if (item) {
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
    obj.SelectAll = function (res) {
        var body = (resolve, reject) =>
            crud.Read('SELECT "ID","TITLE", "TEXT", "HEADER", "DESCRIPTION", "ANNOTATION", "ALIAS", "KEYWORDS", "VIEWID", "SIZEX", "SIZEY", "POSX", "POSY" FROM "DRAFTS"', [], res)
            .then((data) => resolve(data), () => reject(data));
        qHelper.makeTransaction(body);
    };
    obj.SelectByAlias = function (alias, res) {
        var body = (resolve, reject) =>
            crud.Read('SELECT "ID","TITLE", "TEXT", "HEADER", "DESCRIPTION", "ANNOTATION", "ALIAS", "KEYWORDS", "VIEWID" FROM "DRAFTS" WHERE "ALIAS"=$1', [alias], res)
            .then((data) => resolve(data), () => reject(data));
        qHelper.makeTransaction(body);
    }
    obj.SelectByViewId = function (id, res) {
        var body = (resolve, reject) =>
            crud.Read('SELECT "ID","TITLE", "TEXT", "HEADER", "DESCRIPTION", "ANNOTATION", "ALIAS", "KEYWORDS", "VIEWID", "SIZEX", "SIZEY", "POSX", "POSY" FROM "DRAFTS" WHERE "VIEWID"=$1', [id], res)
            .then((data) => resolve(data), () => reject(data));
        qHelper.makeTransaction(body);
    }
    obj.SelectByViewAlias = function (alias, res) {
        var body = (resolve, reject) =>
            crud.Read('SELECT a."ID",a."TITLE", a."TEXT", a."HEADER", a."DESCRIPTION", a."ANNOTATION", a."ALIAS", a."KEYWORDS", a."VIEWID", a."SIZEX", a."SIZEY", a."POSX", a."POSY" FROM "DRAFTS" a \
inner join views b on b.viewid = a."VIEWID" WHERE b.alias=$1', [alias], res)
            .then((data) => resolve(data), () => reject(data));
        qHelper.makeTransaction(body);
    }
    obj.Update = function (res) {
        var body = (resolve, reject) =>
            crud.Update("DRAFTS", obj.Article, res)
            .then((data) => resolve(data), () => reject(data));
        qHelper.makeTransaction(body);
    };
    obj.Create = function (res) {
        var body = (resolve, reject) =>
            crud.Create("DRAFTS", obj.Article, res)
            .then((data) => resolve(data), () => reject(data));
        qHelper.makeTransaction(body);
    }
    return obj;
}

var gridItem = function (item) {
    var obj = {};
    if (item) {
        obj.Article = {};
        obj.Article.ID = item.id;
        obj.Article.POSX = item.position[0];
        obj.Article.POSY = item.position[1];
        obj.Article.SIZEX = item.size.x;
        obj.Article.SIZEY = item.size.y;
    }
    obj.Update = function (res) {
        var body = (resolve, reject) =>
            crud.Update("DRAFTS", obj.Article, res)
            .then((data) => resolve(data), () => reject(data));
        qHelper.makeTransaction(body);
    };
    return obj;
}

module.exports = {
    article: Article,
    gridItem: gridItem
}

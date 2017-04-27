var qHelper = require('../queryHelper.js');
var crud = require('../CRUD.js');
const err = require("./errors");
const errorTypes = err.errorTypes;

const restrictions = {
  'alias': ["nonEmpty"],
  "title": ["nonEmpty"],
  "header": ["nonEmpty"],
  "keywords": ["nonEmpty"],
  "description": ["nonEmpty"],
  "text": ["nonEmpty"]
}

const namesDict = {
  'alias': "Алиас",
  "title": "Заголовок статьи",
  "header": "Заголовок в браузере",
  "keywords": "Ключевые слова",
  "description": "Описание статьи",
  "text": "Текст статьи"
}

function validateEntity(json) {
  let errors = [];
  (Object.keys(restrictions)).forEach((x) => {
    restrictions[x].forEach(y => {
        const error = errorTypes[y](json[x], '"'+namesDict[x]+'"');
        if(error) {
          errors.push(error);
        }
    });
  });
  return errors;
}
var Article = function (item) {
    var obj = {};
    if (item) {
        const validationErrors = validateEntity(item);
        if(validationErrors.length == 0) {
          obj.Article = {};
          obj.Article.ID = item.id;
          obj.Article.TITLE = item.title ? item.title.replace(/\'/g, '\'\'') : '';
          obj.Article.HEADER = item.header;
          obj.Article.KEYWORDS = item.keywords;
          obj.Article.DESCRIPTION = item.description ? item.description.replace(/\'/g, '\'\'') : '';
          obj.Article.ANNOTATION = item.annotation ? item.annotation.replace(/\'/g, '\'\'') : '';
          obj.Article.ALIAS = item.alias;
          obj.Article.STANDALONE = item.standalone;
          obj.Article.TEXT = item.text ? item.text.replace(/\'/g, '\'\'') : '';
          obj.Article.VIEWID = item.viewid;
        } else {
          obj.data = false;
          obj.errors = validationErrors;
        }
    }
    obj.SelectAll = function (res) {
        var body = (resolve, reject) =>
            crud.Read('SELECT "ID","TITLE", "TEXT", "HEADER", "DESCRIPTION", "ANNOTATION", "ALIAS", "KEYWORDS", "VIEWID", "SIZEX", "SIZEY", "POSX", "POSY", "STANDALONE" FROM "DRAFTS"', [], res)
            .then((data) => resolve(data), () => reject(data));
        qHelper.makeTransaction(body);
    };
    obj.SelectByAlias = function (alias, res) {
        var body = (resolve, reject) =>
            crud.Read('SELECT "ID","TITLE", "TEXT", "HEADER", "DESCRIPTION", "ANNOTATION", "ALIAS", "KEYWORDS", "VIEWID", "STANDALONE" FROM "DRAFTS" WHERE "ALIAS"=$1', [alias], res)
            .then((data) => resolve(data), () => reject(data));
        qHelper.makeTransaction(body);
    }
    obj.SelectByViewId = function (id, res) {
        var body = (resolve, reject) =>
            crud.Read('SELECT "ID","TITLE", "TEXT", "HEADER", "DESCRIPTION", "ANNOTATION", "ALIAS", "KEYWORDS", "VIEWID", "SIZEX", "SIZEY", "POSX", "POSY", "STANDALONE" FROM "DRAFTS" WHERE "VIEWID"=$1', [id], res)
            .then((data) => resolve(data), () => reject(data));
        qHelper.makeTransaction(body);
    }
    obj.SearchByQuery = function(query, res) {
      var body = (resolve, reject) =>
          crud.Read('SELECT "ID","TITLE", "TEXT", "HEADER", "DESCRIPTION", "ANNOTATION", "ALIAS", "KEYWORDS", "VIEWID", "SIZEX", "SIZEY", "POSX", "POSY", "STANDALONE" FROM "DRAFTS" WHERE upper("TEXT") like upper($1) or upper("HEADER") like upper($1) ', ["%"+query+"%"], res)
          .then((data) => resolve(data), () => reject(data));
      qHelper.makeTransaction(body);
    }
    obj.SelectByViewAlias = function (alias, res) {
        var body = (resolve, reject) =>
            crud.Read('SELECT a."ID",a."TITLE", a."TEXT", a."HEADER", a."DESCRIPTION", a."ANNOTATION", a."ALIAS", a."KEYWORDS", a."VIEWID", a."SIZEX", a."SIZEY", a."POSX", a."POSY", a."STANDALONE" FROM "DRAFTS" a \
inner join views b on b.viewid = a."VIEWID" WHERE b.alias=$1', [alias], res)
            .then((data) => resolve(data), () => reject(data));
        qHelper.makeTransaction(body);
    }
    obj.GetViewIdByViewAlias = function (alias, res) {
        var body = (resolve, reject) =>
            crud.Read('select viewid from views WHERE alias=$1', [alias], res)
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

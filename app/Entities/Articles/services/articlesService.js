function fillArticle(article, item) {
    article.text = item.TEXT;
    article.title = item.TITLE;
    article.id = item.ID;
    article.header = item.HEADER;
    article.keywords = item.KEYWORDS;
    article.description = item.DESCRIPTION;
    article.annotation = item.ANNOTATION;
    article.alias = item.ALIAS;
    article.standalone = item.STANDALONE;
    article.viewid = parseInt(item.VIEWID);
    article.size = {
        x: item.SIZEX,
        y: item.SIZEY
    };
    article.position = [item.POSX, item.POSY];
    return article;
}
/*@ngInject*/
function fn($http, $cookies, $admin, $utils) {
    return {
        getAll: function () {
            return $http.get('/data/articles').then(function (data) {
                var entities = [];
                data.data.forEach((item) => {
                    var article = {};
                    fillArticle(article, item);
                    entities.push(article);
                });
                return entities;
            });
        },
        getSingle: function (alias) {
            return $http.get('/data/articles/' + alias.trim()).then(function (data) {
                var article = {};
                var item = data.data;
                fillArticle(article, item[0]);
                return article;
            });
        },
        getByViewId: function (id) {
            return $http.get('/data/articles/byViewId/' + id).then(function (data) {
                var entities = [];
                data.data.forEach((item) => {
                    var article = {};
                    fillArticle(article, item);
                    entities.push(article);
                });
                return entities;
            });
        },
        getByViewAlias: function (alias) {
            return $http.get('/data/articles/byViewAlias/' + alias).then(function (data) {
                var entities = [];
                data.data.forEach((item) => {
                    var article = {};
                    fillArticle(article, item);
                    entities.push(article);
                });
                return entities;
            });
        },
        getBySearchQuery: function(query) {
          return $http.get('/data/articles/search/' + query).then(function (data) {
              var entities = [];
              data.data.forEach((item) => {
                  var article = {};
                  fillArticle(article, item);
                  entities.push(article);
              });
              return entities;
          });
        },
        getViewIdByViewAlias: function (alias) {
            return $http.get('/data/viewid/' + alias).then(function (data) {
                return data;
            });
        },
        update: function (json, postBack) {
            var token = $admin.getToken();
            if (token) {
                return $http.post('/data/updateArticle', json, {
                    headers: {
                        'x-access-token': token
                    }
                }).then((data) => {
                    if(data.data.errors) {
                      $utils.handleErrors(data.data.errors);
                      return false;
                    } else {
                      if (postBack) postBack(data);
                      return true;
                    }
                });
            } else {
                postBack();
            }
        },
        updateGrid: function (json, postBack) {
            var token = $admin.getToken();
            if (token) {
                return $http.post('/data/updateArticleGrid', json, {
                    headers: {
                        'x-access-token': token
                    }
                }).then(() => {
                    if (postBack) postBack();
                });
            } else {
                postBack();
            }
        },
        add: function (json, postBack) {
            var token = $admin.getToken();
            if (token) {
                return $http.post('/data/addArticle', json, {
                    headers: {
                        'x-access-token': token
                    }
                }).then((data) => {
                    if(data.data.errors) {
                      $utils.handleErrors(data.data.errors);
                    } else {
                      if (postBack) postBack(data);
                    }
                });
            } else {
                postBack();
            }
        }
    }
}

module.exports = fn;

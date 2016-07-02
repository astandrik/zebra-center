function fillArticle(article, item) {
                    article.text = item.TEXT;
                    article.title = item.TITLE;
                    article.id = item.ID;
                    article.header = item.HEADER;
                    article.keywords = item.KEYWORDS;
                    article.description = item.DESCRIPTION;
                    article.annotation = item.ANNOTATION;
                    article.alias = item.ALIAS;   
                    article.viewid = item.VIEWID;
    return article;
} 
function fn ($http) {
    return {
        getAll: function() {
            return $http.get('/data/articles').then(function(data) {
                var entities = [];
                data.data.forEach((item) => {
                    var article = {};
                    fillArticle(article, item);
                    entities.push(article);
                });
                return entities;
            });
        },
        getSingle: function(alias) {
            return $http.get('/data/articles/' + alias.trim()).then(function(data) {            
                    var article = {};
                    var item = data.data;
                    fillArticle(article,item[0]);
                return article;
            });
        },
        getByViewId: function(id) {
            return $http.get('/data/articles/byViewId/' + id).then(function(data) {            
                var entities = [];
                data.data.forEach((item) => {
                    var article = {};
                    fillArticle(article, item);
                    entities.push(article);
                });
                return entities;
            });
        },
        update: function(json, postBack) {
            return $http.post('/data/updateArticle',json).then(() => {
                if(postBack) postBack();
            });
        },
        add: function(json, postBack) {
            return $http.post('/data/addArticle',json).then(() => {
                if(postBack) postBack();
            });
        }
    }
}

module.exports = fn;

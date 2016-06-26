function fn ($http) {
    return {
        get: function() {
            return $http.get('/data/articles').then(function(data) {
                var entities = [];
                data.data.forEach((item) => {
                    var article = {};
                    article.text = item.TEXT;
                    article.title = item.TITLE;
                    article.id = item.ID;
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

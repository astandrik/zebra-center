function fn ($http) {
    return {
        get: function() {
            return $http.get('/data/articles').then(function(data) {
                var entities = [];
                data.data.forEach((item) => {
                    var article = {};
                    article.text = item.TEXT;
                    article.title = item.TITLE;
                    entities.push(article);
                });
                return entities;
            });
        }
    }
}

module.exports = fn;
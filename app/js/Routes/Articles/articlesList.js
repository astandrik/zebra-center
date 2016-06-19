var entity = {
        url: '/',
        views: {
          'content@' : {
            templateUrl: 'js/Routes/Articles/articles.html',
            controller: function(articles, $scope) {
                $scope.articles = articles;                
            },
            resolve: {
                articles: function($articles) {
                return $articles.get().then(function(data) {
                    return data;
                });
                }
            }
          }
        }
      }

module.exports = entity;
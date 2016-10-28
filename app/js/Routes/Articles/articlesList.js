var entity = () => ({
        url: '/Drafts',
        views: {
          'content@' : {
            templateUrl: 'js/Routes/Articles/articles.html',
            controller: function(articles, $scope) {
                $scope.articles = articles;
            },
            resolve: {
                articles: function($articles) {
                return $articles.getAll().then(function(data) {
                    return data;
                });
                }
            }
          }
        }
      })

module.exports = {Drafts: entity};

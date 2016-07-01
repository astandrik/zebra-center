var articleCtrl = require('../Articles/articleDialogController');

var entity = {
        url: '/',
        views: {
          'content@' : {
            templateUrl: 'js/Routes/Home/home.html',
            controller: function(articles, $scope, dialogs, $state) {
                $scope.articles = articles;
                var refreshView =  function() {$state.go($state.current, {}, {reload: true});} ;
                $scope.addArticle = function() {
                  dialogs.create('js/Routes/Articles/addArticle.html',articleCtrl,{reloader: refreshView},{},'lg');
                }
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

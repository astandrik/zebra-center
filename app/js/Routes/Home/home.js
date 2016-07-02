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
                articles: function($articles, $articleViewids) {
                return $articles.getByViewId($articleViewids.home).then(function(data) {
                    return data;
                });
                }
            }
          }
        }
      }

var singleArticle = {
        url: '/:articleAlias',
        views: {
          'content@' : {
            templateUrl: 'js/Routes/Articles/singleArticle.html',
            controller: function(article, $scope, dialogs, $state) {
                $scope.article = article;
                var refreshView =  function() {$state.go($state.current, {}, {reload: true});} ;
            },
            resolve: {
                article: function($articles, $stateParams) {
                return $articles.getSingle($stateParams.articleAlias).then(function(data) {
                    return data;
                });
                }
            }
          }
        }
      }

module.exports = {mainPage: entity, singleArticle: singleArticle};

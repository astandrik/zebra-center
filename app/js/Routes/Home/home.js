var articleCtrl = require('../Articles/articleDialogController');

var entity = {
        url: '/',
        views: {
          'content@' : {
            templateUrl: 'js/Routes/Home/home.html',
            controller: function(articles, $scope, dialogs, $state, $compile, $timeout,$articles) {
              window.currentScope = $scope;
              $scope.gridsterOpts = {
                  columns: 4, // the width of the grid, in columns
                  pushing: true, // whether to push other items out of the way on move or resize
                  floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
                  swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
                  width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
                  colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
                  rowHeight: '100', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
                  margins: [10, 10], // the pixel distance between each widget
                  outerMargin: true, // whether margins apply to outer edges of the grid
                  isMobile: false, // stacks the grid items if true
                  mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
                  mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
                  minColumns: 1, // the minimum columns the grid must have
                  minRows: 2, // the minimum height of the grid, in rows
                  maxRows: 100,
                  defaultSizeX: 2, // the default width of a gridster item, if not specifed
                  defaultSizeY: 1, // the default height of a gridster item, if not specified
                  minSizeX: 1, // minimum column width of an item
                  maxSizeX: null, // maximum column width of an item
                  minSizeY: 1, // minumum row height of an item
                  maxSizeY: null, // maximum row height of an item
                  resizable: {
                     enabled: true,
                     handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
                     start: function(event, $element, widget) {}, // optional callback fired when resize is started,
                     resize: function(event, $element, widget) {

                     }, // optional callback fired when item is resized,
                     stop: function(event, $element, widget) {
                       var $scope = window.currentScope;
                       $timeout(() => {
                         for(var i = 0; i < $scope.articles.length; i++) {
                           var content = $('#article_'+i).find('div.ng-scope:first');
                           $scope.articles[i].size.y = Math.floor((content.height() + 100) / 100);
                           var article = $scope.articles[i];
                           $articles.updateGrid({size: article.size, position: article.position, id: article.id});
                         }
                       },100);
                     } // optional callback fired when item is finished resizing
                  },
                  draggable: {
                     enabled: true, // whether dragging items is supported
                     handle: '.dragger', // optional selector for drag handle
                     start: function(event, $element, widget) {}, // optional callback fired when drag is started,
                     drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
                     stop: function(event, $element, widget) {
                       var $scope = window.currentScope;
                       $timeout(() => {
                         for(var i = 0; i < $scope.articles.length; i++) {
                           var content = $('#article_'+i).find('div.ng-scope:first');
                           $scope.articles[i].size.y = Math.floor((content.height() + 100) / 100);
                           var article = $scope.articles[i];
                           $articles.updateGrid({size: article.size, position: article.position, id: article.id});
                         }
                       },100);
                     }// optional callback fired when item is finished dragging
                  }
              };

                $scope.articles = articles;
                for(var i = 0; i < $scope.articles.length; i++) {
                  $scope.articles[i].size = $scope.articles[i].size || {x:2, y:2};
                  $scope.articles[i].position= $scope.articles[i].position || [Math.floor(i/2), i%2];
                  $scope.articles[i].tagid = "article_" + i;
                }
                $timeout(() => {
                  for(var i = 0; i < $scope.articles.length; i++) {
                    var content = $('#article_'+i).find('article-template>div.ng-scope:first');
                    $scope.articles[i].size.y = (content.height() + 100) / 100;
                  }
                },500);
                var refreshView =  function() {$state.go($state.current, {}, {reload: true});} ;
                $scope.addArticle = function() {
                  dialogs.create('js/Routes/Articles/addArticle.html',articleCtrl,{reloader: refreshView},{},'lg');
                }
            },
            resolve: {
                articles: function($articles, $articleViewids) {
                return $articles.getByViewId($articleViewids.home.id).then(function(data) {
                    return data;
                });
                }
            }
          }
        }
      }

      var singleArticleSlash = {
              url: '/article/:articleAlias',
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

var singleArticle = {
        url: 'article/:articleAlias',
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

module.exports = {mainPage: entity, singleArticle: singleArticle, singleArticleSlash: singleArticleSlash};

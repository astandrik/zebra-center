var articleCtrl = require('../Articles/articleDialogController');
var gridOptions = require('./gridOptions');

function processArticle(article) {
    var newArticle = Object.assign({}, article);
    newArticle.size = article.size || {
        x: 4,
        y: 4
    };
    newArticle.position = article.position;
    newArticle.tagid = "article_" + article.id;
    return newArticle;
}

function fitHeight(timeout, article) {
    return new Promise((resolve, reject) => {
        timeout(() => {
            let content = $('#article_' + article.id).find('article-template>div.ng-scope:first');
            var newArticle = Object.assign({}, article);
            newArticle.size.y = (content.height() + 100) / 100;
            resolve(newArticle);
        }, 500);
    });
}


var entity = {
    url: '/',
    views: {
        'content@': {
            templateUrl: 'js/Routes/Home/home.html',
            controller: function (articles, $scope, dialogs, $state, $compile, $timeout, $articles) {
                window.currentScope = $scope;
                var stopFunction = function (event, $element, widget) {
                    var $scope = window.currentScope;
                    $timeout(() => {
                        for (var i = 0; i < $scope.ids.length; i++) {
                            var content = $('#article_' + $scope.ids[i]).find('article-template>div.ng-scope:first');
                            $scope.articles[i].size.y = Math.floor((content.height() + 100) / 100);
                            var article = $scope.articles[i];
                            $articles.updateGrid({
                                size: article.size,
                                position: article.position,
                                id: article.id
                            });
                        }
                    }, 100);
                }
                gridOptions.resizable.stop = stopFunction;
                gridOptions.draggable.stop = stopFunction;
                $scope.gridsterOpts = gridOptions;
                $scope.articles = articles.map(processArticle);
                $scope.ids = $scope.articles.map(x => x.id);
                $scope.articles.mapPromise(fitHeight.bind(this, $timeout))
                    .then((data) => {
                        $scope.articles = data;
                        $scope.$digest();
                    });
                var refreshView = () => $scope.$emit('refreshCurrent');
                $scope.addArticle = function () {
                    dialogs.create('js/Routes/Articles/addArticle.html', articleCtrl, {
                        reloader: refreshView
                    }, {}, 'lg');
                }
            },
            resolve: {
                articles: function ($articles, $articleViewids) {
                    return $articles.getByViewId($articleViewids.home.id).then(function (data) {
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
        'content@': {
            templateUrl: 'js/Routes/Articles/singleArticle.html',
            controller: function (article, $scope, dialogs, $state) {
                $scope.article = article;
            },
            resolve: {
                article: function ($articles, $stateParams) {
                    return $articles.getSingle($stateParams.articleAlias).then(function (data) {
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
        'content@': {
            templateUrl: 'js/Routes/Articles/singleArticle.html',
            controller: function (article, $scope, dialogs, $state) {
                $scope.article = article;
            },
            resolve: {
                article: function ($articles, $stateParams) {
                    return $articles.getSingle($stateParams.articleAlias).then(function (data) {
                        return data;
                    });
                }
            }
        }
    }
}

module.exports = {
    mainPage: entity,
    singleArticle: singleArticle,
    singleArticleSlash: singleArticleSlash
};

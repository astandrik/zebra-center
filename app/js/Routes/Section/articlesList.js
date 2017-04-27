var gridOptions = require('../Home/gridOptions');

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
            if(newArticle.size.y  < Math.floor((content.height() + 40) / 40)) {
              newArticle.size.y = (content.height() + 40) / 40;
            }
            resolve(newArticle);
        }, 500);
    });
}


function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


var entity = () => ({
    url: '/section/:viewAlias',
    views: {
        'content@': {
            templateUrl: 'js/Routes/Section/articles.html',
            /*@ngInject*/
            controller: function (articles, $scope, $timeout, $articles, $rootScope, viewid) {
                $scope.articles = articles;
                $rootScope.currentViewId = viewid;
                window.currentScope = $scope;
                var stopFunction = function (event, $element, widget) {
                    var $scope = window.currentScope;
                    $timeout(() => {
                        for (var i = 0; i < $scope.ids.length; i++) {
                            var content = $('#article_' + $scope.ids[i]).find('article-template>div.ng-scope:first');
                            if($scope.articles[i].size.y < Math.floor((content.height() + 40) / 40)) {
                              $scope.articles[i].size.y = Math.floor((content.height() + 40) / 40);
                            }
                            var article = $scope.articles[i];
                            $articles.updateGrid({
                                size: article.size,
                                position: article.position,
                                id: article.id
                            });
                        }
                    }, 100);
                }
                $( window ).resize(debounce(stopFunction,500));
                var isUserAdmin = $rootScope.enableEditing;
                $rootScope.$watch('enableEditing', function (newVal, oldVal) {
                    gridOptions.resizable.enabled = newVal;
                    gridOptions.draggable.enabled = newVal;
                });
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
            },
            resolve: {
                /*@ngInject*/
                articles: function ($articles, $stateParams) {
                    var viewAlias = $stateParams.viewAlias;
                    return $articles.getByViewAlias(viewAlias).then(function (data) {
                        return data;
                    });
                },
                /*@ngInject*/
                viewid: function($articles,$stateParams) {
                   var viewAlias = $stateParams.viewAlias;
                   return $articles.getViewIdByViewAlias(viewAlias).then(function(data) {
                     return data.data[0].viewid;
                   })
                }
            }
        }
    }
})

module.exports = {
    Section: entity
};

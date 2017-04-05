var entity = () => ({
    url: '/Drafts',
    views: {
        'content@': {
            templateUrl: 'js/Routes/Articles/articles.html',
            /*@ngInject*/
            controller: function (articles, $scope, $rootScope) {
                $scope.articles = articles;
                $rootScope.currentViewId=9999;
            },
            resolve: {
                /*@ngInject*/
                articles: function ($articles) {
                    return $articles.getByViewId(9999).then(function (data) {
                        return data;
                    });
                }
            }
        }
    }
})

var entity_search = () => ({
    url: '/Search?query',
    views: {
        'content@': {
            templateUrl: 'js/Routes/Articles/searchArticles.html',
            /*@ngInject*/
            controller: function (articles, $scope, $rootScope, $stateParams) {
                $rootScope.searchQuery = $stateParams.query;
                $scope.searchQuery =   $rootScope.searchQuery;
                $scope.articles = articles;
                $rootScope.currentViewId=9999;
            },
            resolve: {
                /*@ngInject*/
                articles: function ($articles, $stateParams) {
                    return $articles.getBySearchQuery($stateParams.query).then(function (data) {
                        return data;
                    });
                }
            }
        }
    }
})

module.exports = {
    Drafts: entity,
    Search: entity_search
};

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

module.exports = {
    Drafts: entity
};

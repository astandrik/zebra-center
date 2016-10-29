var entity = () => ({
    url: '/section/:viewAlias',
    views: {
        'content@': {
            templateUrl: 'js/Routes/Section/articles.html',
            /*@ngInject*/
            controller: function (articles, $scope) {
                $scope.articles = articles;
            },
            resolve: {
                /*@ngInject*/
                articles: function ($articles, $stateParams) {
                    var viewAlias = $stateParams.viewAlias;
                    return $articles.getByViewAlias(viewAlias).then(function (data) {
                        return data;
                    });
                }
            }
        }
    }
})

module.exports = {
    Section: entity
};

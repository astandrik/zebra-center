var entity = () => ({
    url: '/Drafts',
    views: {
        'content@': {
            templateUrl: 'js/Routes/Articles/articles.html',
            /*@ngInject*/
            controller: function (articles, $scope) {
                $scope.articles = articles;
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

var fn = function() {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: 'Entities/Articles/directives/article.html',
        controller: function($scope) {
            $scope.article = $scope.data;            
        }
    }
}

module.exports = fn;
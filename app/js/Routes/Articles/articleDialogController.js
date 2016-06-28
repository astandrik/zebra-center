var fn = function($scope, $articles, $uibModalInstance,data) {
  $scope.article = {};
  $scope.save = () => $articles.add($scope.article, ()=> {$uibModalInstance.dismiss('Canceled'); data.reloader();});
  $scope.cancel = () => $uibModalInstance.dismiss('Canceled');
}

module.exports = fn;

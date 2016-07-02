var fn = function($scope, $articles, $uibModalInstance,data,$articleViewids) {
  $scope.article = {viewid: $articleViewids.default};
  $scope.save = () => $articles.add($scope.article, ()=> {$uibModalInstance.dismiss('Canceled'); data.reloader();});
  $scope.cancel = () => $uibModalInstance.dismiss('Canceled');
  $scope.options = {
    language: 'en',
    allowedContent: true,
    entities: false
  };
}

module.exports = fn;

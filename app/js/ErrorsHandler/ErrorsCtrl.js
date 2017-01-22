/*@ngInject*/
function ErrorsCtrl($scope, data, $uibModalInstance) {
  $scope.errors = data.errors;
  $scope.close = () => $uibModalInstance.dismiss('Canceled');
}


export default ErrorsCtrl;
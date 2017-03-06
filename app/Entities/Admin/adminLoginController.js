/*@ngInject*/
function Controller($scope, data, $admin, $uibModalInstance, $rootScope) {
    const postBack = (x) => {
        data.dataHandler(x.data, $uibModalInstance);
    }
    $scope.cancel = () => {
        $uibModalInstance.dismiss("cancel");
        $rootScope.loginOpened = false;
    }
    $rootScope.loginOpened = true;
    $scope.login = () => {
        $admin.login({
            name: $scope.name,
            password: $scope.password
        }, postBack);
    }
    $(document).keypress(function(e) {      
      if($rootScope.loginOpened) {
        if(e.which == 13) {
            $scope.login();
        }
      }
    });
}

module.exports = Controller;

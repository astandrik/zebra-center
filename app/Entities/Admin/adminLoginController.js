/*@ngInject*/
function Controller($scope, data, $admin, $uibModalInstance) {
    const postBack = (x) => {
        data.dataHandler(x.data, $uibModalInstance);
    }
    $scope.cancel = () => {
        $uibModalInstance.dismiss("cancel");
    }
    $scope.login = () => {
        $admin.login({
            name: $scope.name,
            password: $scope.password
        }, postBack);
    }
}

module.exports = Controller;

var articleCtrl = require('../../Routes/Articles/articleDialogController');
var adminLoginCtrl = require('../../../Entities/Admin/adminLoginController');
var navbar = {
    templateUrl: 'views/components/navbar.html',
    /*@ngInject*/
    controller: function ($scope, dialogs, $rootScope) {
        $scope.addArticle = function () {
            var refreshView = () => $scope.$emit('refreshCurrent');
            dialogs.create('js/Routes/Articles/addArticle.html', articleCtrl, {
                reloader: refreshView,
                isEditing: false
            }, {
                backdrop: false
            }, 'lg');
        }
        $scope.adminLogin = () => {
            const dataHandler = (data, modalInstance) => {
                if (!data || !data.length || !data[0].pswmatch) {
                    dialogs.notify("ВНИМАНИЕ", "Неверный логин или пароль");
                } else {
                    $rootScope.setAdmin(data[0]);
                    modalInstance.close();
                }
            }
            var dlg = dialogs.create('views/components/adminLogin.html', adminLoginCtrl, {
                dataHandler
            }, {
                backdrop: false
            }, 'lg');
        }
        $scope.adminLogout = () => {
            $rootScope.logout();
        }
    },
    bindings: {
        enableEditing: '='
    }
}

module.exports = {
    name: 'navbarDirective',
    type: 'component',
    component: navbar
}

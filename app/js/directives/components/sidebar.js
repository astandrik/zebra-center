var adminLoginCtrl = require('../../../Entities/Admin/adminLoginController');
var sidebar = {
    templateUrl: 'views/components/sidebar.html',
    controller: ['$timeout', '$scope', '$structure', '$rootScope', 'dialogs', function ($timeout, $scope, $structure, $rootScope, dialogs) {
        var createDirective = () => {
            $structure.get().then((data) => {
                $scope.nodes = data;
                $timeout(() => {
                    (function (i) {
                        var o, n;
                        i(".title_block").on("click", function () {
                            o = i(this).parents(".accordion_item"),
                            n = o.find(".info"),
                            o.hasClass("active_block") ? (o.removeClass("active_block"), n.slideUp()) : (o.addClass("active_block"),
                            n.stop(!0, !0).slideDown(100))
                        })
                    })($);
                }, 1000);
            })
        }
        $scope.adminLogin = () => {
            const dataHandler = (data, modalInstance) => {
                if (!data || !data.length || !data[0].pswmatch) {
                    dialogs.notify("ВНИМАНИЕ", "Неверный логин или пароль",{size:"sm"});
                } else {
                    $rootScope.setAdmin(data[0]);
                    $rootScope.loginOpened = false;
                    modalInstance.close();
                }
            }
            var dlg = dialogs.create('views/components/adminLogin.html', adminLoginCtrl, {
                dataHandler
            }, {
                backdrop: false,
                size:"md"
            }, 'lg');
        }
        $scope.adminLogout = () => {
            $rootScope.logout();
        }
        createDirective();
        $scope.$on('refreshNavbars', function () {
            createDirective();
        });
  }],
    bindings: {
        enableEditing: '='
    }
}

module.exports = {
    name: 'sidebarDirective',
    type: 'component',
    component: sidebar
}

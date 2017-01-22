var articleCtrl = require('../../Routes/Articles/articleDialogController');
var navbar = {
    templateUrl: 'views/components/navbar.html',
    /*@ngInject*/
    controller: function ($scope, dialogs, $rootScope) {
        $scope.addArticle = function () {
            var refreshView = () => $scope.$emit('refreshCurrent');
            dialogs.create('js/Routes/Articles/addArticle.html', articleCtrl, {
                reloader: refreshView,
                isEditing: false
            }, { size: "lg"
            });
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

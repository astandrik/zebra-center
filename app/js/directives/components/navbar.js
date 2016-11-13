var articleCtrl = require('../../Routes/Articles/articleDialogController');
var navbar = {
    templateUrl: 'views/components/navbar.html',
    /*@ngInject*/
    controller: function ($scope, dialogs) {
        $scope.addArticle = function () {
            var refreshView = () => $scope.$emit('refreshCurrent');
            dialogs.create('js/Routes/Articles/addArticle.html', articleCtrl, {
                reloader: refreshView,
                isEditing: false
            }, {
                backdrop: false
            }, 'lg');
        }
    }
}

module.exports = {
    name: 'navbarDirective',
    type: 'component',
    component: navbar
}

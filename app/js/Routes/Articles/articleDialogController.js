var transliterate = (
    function () {
        var
            rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
            eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g);
        return function (text, engToRus) {
            var x;
            for (x = 0; x < rus.length; x++) {
                text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
                text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
            }
            return text;
        }
    }
)();

/*@ngInject*/
var fn = function ($scope, $articles, $uibModalInstance, data, $articleViewids) {
    $scope.isEditing = data.isEditing;

    $articleViewids.getList().then((data) => {
        data.push({
            viewid: 0,
            title: "Главная"
        })
        data.push({
            viewid: 9999,
            title: "Черновики"
        });
        $scope.directories = data;
    });
    if (data.editingArticle) {
        $scope.article = data.editingArticle;
    } else {
        $scope.article = {
            viewid: 9999
        };
    }
    $scope.close = () => $uibModalInstance.dismiss('Canceled');
    $scope.save = () => {
        if (data.editingArticle) {
            $articles.update($scope.article, () => {
                $uibModalInstance.dismiss('Canceled');
                data.reloader();
            });
        } else {
            $articles.add($scope.article, () => {
                $uibModalInstance.dismiss('Canceled');
                data.reloader();
            });
        }
    }
    $scope.cancel = () => $uibModalInstance.dismiss('Canceled');
    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false,
        baseHref: "/",
        filebrowserBrowseUrl: '/node_modules/angular-ckeditor/bower_components/ckeditor/plugins/filemanager/browser/default/browser.html?Connector=/browse_url',
        filebrowserUploadUrl: '/upload_url?Type=File',
        filebrowserImageUploadUrl: '/upload_url?Type=Image',
        filebrowserFlashUploadUrl: '/upload_url?Type=Flash',
        filebrowserWindowWidth: 800,
        filebrowserWindowHeight: 500
    };
    $scope.changeAlias = function () {
        $scope.article.alias = transliterate($scope.article.header).replace(/\s/g, '_');
    };
}

module.exports = fn;

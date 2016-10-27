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

var fn = function ($scope, $articles, $uibModalInstance, data, $articleViewids) {

    $scope.directories = $articleViewids;
    $scope.directory = $articleViewids.default.id;
    if (data.editingArticle) {
        $scope.article = data.editingArticle;
    } else {
        $scope.article = {
            viewid: $scope.directory
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
        entities: false
    };
    $scope.changeAlias = function () {
        $scope.article.alias = transliterate($scope.article.header).replace(/\s/g, '_');
    };
    $scope.$watch('directory', (newVal, oldVal) => {
        $scope.article.viewid = newVal;
    });
}

module.exports = fn;

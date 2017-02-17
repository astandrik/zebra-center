var transliterate = (
    function () {
        var
            rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
            eng = "shh sh ch cz yu ya yo zh jj yj ej a b v g d e z i j k l m n o p r s t u f x j".split(/ +/g);
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
        const dataSaver = () => {
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
        var i = 0;
        var instances = Object.keys(CKEDITOR.instances);

        const wysiwygSetter = () => {
            if (CKEDITOR.instances[instances[i]].mode == "source") {
                CKEDITOR.instances[instances[i]].setMode('wysiwyg',
                    function () {
                        i++;
                        if (i == instances.length) {
                            dataSaver();
                        } else {
                            wysiwygSetter();
                        }
                    });
            } else {
                i++;
                if (i == instances.length) {
                    dataSaver();
                } else {
                    wysiwygSetter();
                }
            }
        }
        wysiwygSetter();

    }
    $scope.cancel = () => $uibModalInstance.dismiss('Canceled');
    let stylesSet = [
       { name: 'Правая врезка', element: 'p', attributes: { 'class': 'vrezka' } }
    ];
    $scope.options = {
        language: 'ru',
        allowedContent: true,
        resize_dir : 'both',
        entities: false,
        stylesSet: stylesSet,
        extraPlugins : 'html5video',
        contentsCss: "/css/styles/ckStyles.css",
        baseHref: "/",
        filebrowserBrowseUrl: '/node_modules/angular-ckeditor/bower_components/ckeditor/plugins/filemanager/browser/default/browser.html?Connector=/browse_url',
        filebrowserUploadUrl: '/upload_url?Type=File',
        filebrowserImageUploadUrl: '/upload_url?Type=Image',
        filebrowserFlashUploadUrl: '/upload_url?Type=Flash',
        filebrowserWindowWidth: 800,
        filebrowserWindowHeight: 500,
        toolbarGroups: [
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'paragraph', groups: [ 'align', 'list', 'indent', 'blocks', 'bidi', 'paragraph' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'document', groups: [ 'document', 'doctools', 'mode' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	],
  removeButtons : 'BidiLtr,BidiRtl,Language,CreateDiv,Blockquote,Smiley,PageBreak,Iframe,About,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Flash,Scayt,SelectAll,Save,NewPage,Preview,Print'
    };
    $scope.changeAlias = function () {
        $scope.article.alias = transliterate($scope.article.header).replace(/\s/g, '_');
    };
}

module.exports = fn;

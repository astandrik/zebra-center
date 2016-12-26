var _ = require('lodash');

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

function fillArticle(article, item) {
    article.text = item.TEXT;
    article.title = item.TITLE;
    article.id = item.ID;
    article.header = item.HEADER;
    article.keywords = item.KEYWORDS;
    article.description = item.DESCRIPTION;
    article.annotation = item.ANNOTATION;
    article.alias = item.ALIAS;
    article.viewid = parseInt(item.VIEWID);
    article.size = {
        x: item.SIZEX,
        y: item.SIZEY
    };
    article.position = [item.POSX, item.POSY];
    return article;
}

function htmlArticle(isShort, article) {
    var text = isShort ? article.annotation : article.text;
    var pencil = "<ng-md-icon class='pencil' ng-class='{\"non-visible\": !enableEditing,\"user-admin\":enableEditing}' ng-click='toggleEditing(\"" + article.alias + "\")' icon='mode_edit' size=30></ng-md-icon>";
    var header = "<div id='" + article.alias + article.id + "' class='article-header'><div></div><h1>" + article.header + "</h1>" +
        pencil + "</div>";
    var showMore = isShort ? '<div ><a href="' + window.location.href +
        (window.location.href.toString()[window.location.href.toString().length - 1] == '/' ? '' : '/') +
        'article/' + article.alias + '">Подробнее...</a></div>' : '';
    var html = '<div>' + header + '<div>' + text + '</div>' + showMore + '</div></div>';
    return html;
}

var articleCtrl = require('../../../js/Routes/Articles/articleDialogController');
/*@ngInject*/
var fn = function ($compile, $articles, $http, dialogs, $location) {
    return {
        scope: {
            data: '=',
            isShort: '=',
            enableEditing: '='
        },
        /*@ngInject*/
        controller: function ($scope) {},
        link: function (scope, element, attrs, ctrl) {
            scope.article = _.cloneDeep(scope.data);
            scope.$watch('directory', (newVal, oldVal) => {
                scope.article.viewid = newVal;
            });
            var refreshView = () => scope.$emit('refreshCurrent');
            scope.toggleEditing = function (alias) {
                return $http.get('/data/articles/' + alias.trim()).then(function (data) {
                    var article = {};
                    var item = data.data;
                    fillArticle(article, item[0]);
                    dialogs.create('js/Routes/Articles/addArticle.html', articleCtrl, {
                        reloader: refreshView,
                        editingArticle: article,
                        isEditing: true
                    }, {
                        backdrop: false
                    }, 'lg');
                });
            }
            scope.changeAlias = function () {
                scope.article.alias = transliterate(scope.article.header, true).replace(/\s/g, '_');
            }
            scope.options = {
                language: 'ru',
                allowedContent: true,
                entities: false
            };
            var text = scope.isShort ? scope.article.annotation : scope.article.text;
            var article = htmlArticle(scope.isShort, scope.article);

            scope.updateArticle = function () {
                element.empty();
                var article = htmlArticle(scope.isShort, scope.article);
                element.append($compile(article)(scope));
            };

            scope.save = function () {
                $articles.update(scope.article, () => {
                    scope.updateArticle();
                    scope.data = _.cloneDeep(scope.article);
                    scope.cancel()
                });
            }

            scope.cancel = function () {
                scope.article = _.cloneDeep(scope.data);
                scope.toggleEditing();
            }
            element.append($compile(article)(scope));
        }
    }
}

module.exports = fn;;

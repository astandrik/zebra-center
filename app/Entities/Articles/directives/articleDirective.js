var _ = require('lodash');

var transliterate = (
	function() {
		var
			rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
			eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g)
		;
		return function(text, engToRus) {
			var x;
			for(x = 0; x < rus.length; x++) {
				text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
				text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());	
			}
			return text;
		}
	}
)();

function htmlArticle(isShort, article) {
          var text = isShort ? article.annotation : article.text;
          var pencil = "<ng-md-icon class='pencil' ng-class='{\"non-visible\": isEditing}' ng-click='toggleEditing()' icon='mode_edit' size=30></ng-md-icon>";
          var header = "<div class='article-header'><div></div><h1 ng-show='!isEditing'>"+article.header+"</h1><input class='form-control' style='margin:10px 0; text-align:center' type='text' ng-show='isEditing' ng-model='article.header'></input>"
          + pencil+"</div>";
          var showMore = isShort ? '<div style="float:right"><a href="/'+article.alias+'">Подробнее...</a></div>' : '';
          var html = '<div>' + header + '<div ng-show="!isEditing">' + text + '</div>' + showMore + '</div>';
          html += "<div ng-class='{\"non-visible\": !isEditing}'><div class=\"form-group\">\
            <label>Заголовок статьи</label>\
            <input class=\'form-control\' ng-keyup=\'changeAlias()\' style=\'margin:10px 0; text-align:center\' type=\'text\' ng-model=\'article.header\'></input>\
          </div>\
          <div class=\"form-group\">\
            <label>Заголовок в браузере</label>\
            <input class=\'form-control\' style=\'margin:10px 0; text-align:center\' type=\'text\' ng-model=\'article.title\'></input>\
          </div>\
          <div class=\"form-group\">\
            <label>Алиас</label>\
            <input class=\'form-control\' style=\'margin:10px 0; text-align:center\' type=\'text\' ng-model=\'article.alias\'></input>\
          </div>\
          <div class=\"form-group\">\
            <label>Ключевые слова</label>\
            <input type=\'text\' class=\'form-control\' ng-model=\'article.keywords\'>\
          </div>\
          <div class=\"form-group\">\
            <label>Описание статьи</label>\
            <input type=\'text\' class=\'form-control\' ng-model=\'article.description\'>\
          </div>\
          <div class=\"form-group\">\
            <label>Аннотация</label>\
            <div ckeditor=\'options\' ng-model=\'article.annotation\' ></div>\
          </div>\
          <div class=\"form-group\">\
            <label>Текст статьи</label>\
            <div   ckeditor=\'options\' ng-model=\'article.text\' ></div>\
          </div></div>";
          html += '<div ng-class="{\'non-visible\': !isEditing}" class="btn-group addedit-buttons" role="group" aria-label="...">';
          html += '\
            <button type="button" class="btn btn-default" ng-click="cancel()">Отменить</button>\
            <button type="button" class="btn btn-default" ng-click="save()">Сохранить</button>\
            </div></div>';
          return html;
}

var fn = function($compile,$articles) {
    return {
        scope: {
            data: '=',
            isShort: '='
        },
        controller: function($scope) {
        },
        link: function(scope, element, attrs, ctrl) {
          scope.article = _.cloneDeep(scope.data);

         scope.toggleEditing = function() {
            scope.isEditing = !scope.isEditing;
          }
          scope.changeAlias = function() {
              debugger;
              scope.article.alias = transliterate(scope.article.header,true).replace(/\s/g, '_');
          }
          scope.options = {
            language: 'ru',
            allowedContent: true,
            entities: false
          };
          var text = scope.isShort ? scope.article.annotation : scope.article.text;
          var article = htmlArticle(scope.isShort, scope.article);

          scope.updateArticle = function() {
              element.empty();
              var article = htmlArticle(scope.isShort, scope.article);
              element.append($compile(article)(scope));
          };

          scope.save = function() {
              $articles.update(scope.article, () => {
                  scope.updateArticle();
                  scope.data = _.cloneDeep(scope.article);
                  scope.cancel()});
          }

          scope.cancel = function() {
              scope.article = _.cloneDeep(scope.data);
              scope.toggleEditing();
          }
          element.append($compile(article)(scope));
        }
    }
}

module.exports = fn;

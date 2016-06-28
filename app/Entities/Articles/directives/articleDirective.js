var _ = require('lodash');

function htmlArticle(title,text) {
          var pencil = "<ng-md-icon class='pencil' ng-class='{\"non-visible\": isEditing}' ng-click='toggleEditing()' icon='mode_edit' size=30></ng-md-icon>";
          var header = "<div class='article-header'><div></div><h1 ng-show='!isEditing'>"+title+"</h1><input class='form-control' style='margin:10px 0; text-align:center' type='text' ng-show='isEditing' ng-model='article.title'></input>"
          + pencil+"</div>";
          var html = '<div>' + header + '<div ng-show="!isEditing">' + text + '</div>' + '</div>';
          html += '<text-angular ng-model="article.text" ng-class="{\'non-visible\': !isEditing}"></text-angular>';
          html += '<div ng-class="{\'non-visible\': !isEditing}" class="btn-group addedit-buttons" role="group" aria-label="...">\
            <button type="button" class="btn btn-default" ng-click="cancel()">Отменить</button>\
            <button type="button" class="btn btn-default" ng-click="save()">Сохранить</button>\
            </div></div>';
          return html;
}

var fn = function($compile,$articles) {
    return {
        scope: {
            data: '='
        },
        controller: function($scope) {
        },
        link: function(scope, element, attrs, ctrl) {
          scope.article = _.cloneDeep(scope.data);

         scope.toggleEditing = function() {
            scope.isEditing = !scope.isEditing;
          }

          var article = htmlArticle(scope.article.title, scope.article.text);

          scope.updateArticle = function() {
              element.empty();
              var article = htmlArticle(scope.article.title, scope.article.text);
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

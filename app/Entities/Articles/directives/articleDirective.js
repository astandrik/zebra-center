var fn = function($compile) {
    return {
        scope: {
            data: '='
        },
        controller: function($scope) {
        },
        link: function(scope, element, attrs, ctrl) {
          scope.article = scope.data;
          scope.toggleEditing = function() {
            scope.isEditing = !scope.isEditing;
          }
          var pencil = "<ng-md-icon class='pencil' ng-click='toggleEditing()' icon='mode_edit' size=30></ng-md-icon>";
          var header = "<div class='article-header'><div></div><h1>"+scope.article.title+"</h1>"+pencil+"</div>";
          var html = '<div>' + header + '<div ng-show="!isEditing">' + scope.article.text + '</div>' + '</div>';
          html += '<text-angular ng-model="article.text" ng-show="isEditing"></text-angular>';
          element.append($compile(html)(scope));
        }
    }
}

module.exports = fn;

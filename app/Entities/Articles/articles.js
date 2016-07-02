var articlesService = require('./services/articlesService.js');
var articleDirective = require('./directives/articleDirective.js');
var currentModule = angular.module('articles',[]);
currentModule.factory('$articles', articlesService);
currentModule.directive('articleTemplate', articleDirective);
currentModule.constant('$articleViewids', {
    default: 0,
    home: 1
})
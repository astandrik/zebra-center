var articlesService = require('./services/articlesService.js');
var articleDirective = require('./directives/articleDirective.js');
var currentModule = angular.module('articles',[]);
currentModule.factory('$articles', articlesService);
currentModule.directive('articleTemplate', articleDirective);
currentModule.constant('$articleViewids', {
    default: {id: 0, name: "Черновики"},
    home: {id:1, name: "Главная"}
})
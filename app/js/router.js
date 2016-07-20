'use strict';
var routes = require('./Routes/routes.js');
angular.module('router', []).provider('$router', function () {
  this.$get = new function () {
    var self = this;
    self.routes = {
      'home': routes.mainPage,
      'drafts': routes.Drafts,
      'drafts.single': routes.singleArticleSlash,
      'home.single': routes.singleArticle,
      'structure': routes.Structure
    };
    return this;
  }();
});

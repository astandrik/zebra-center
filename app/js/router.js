'use strict';
var routes = require('./Routes/routes.js');
angular.module('router', []).provider('$router', function () {
  this.$get = new function () {
    var self = this;
    self.routes = {
      'home': routes.mainPage(),
      'drafts': routes.Drafts(),
      'search': routes.Search(),
      'drafts.single': routes.singleArticle(),
      'home.single': routes.singleArticleHome(),
      'structure': routes.Structure(),
      'section': routes.Section(),
      'section.single': routes.singleArticle()
    };
    return this;
  }();
});

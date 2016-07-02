'use strict';
var routes = require('./Routes/routes.js');
angular.module('router', []).provider('$router', function () {
  this.$get = new function () {
    var self = this;
    self.routes = {
      'home': routes.mainPage,
      'drafts': routes.Drafts,
      'single': routes.singleArticle
    };
    return this;
  }();
});

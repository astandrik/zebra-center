import angular from 'angular';

// angular modules
import constants from './constants';
import onConfig  from './on_config';
import onRun     from './on_run';
import 'angular-ui-router';
import './templates';
import './filters';
import './controllers';
import './services';
require('./directives/index.js');
require ('./router.js');
import '../Entities/entities.js';

// create and bootstrap application
const requires = [
  'ui.router',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives',
  'router',
  'entities'
];

// mount on window for testing
window.app = angular.module('app', requires);


var app = window.app;

app.config([
  '$locationProvider',
  '$urlRouterProvider',
  '$stateProvider',
  '$routerProvider',
  '$provide',
  function ($locationProvider,$urlRouterProvider, $stateProvider, $routerProvider, $provide) {
    //$locationProvider.html5Mode(true);
    for (var e in $routerProvider.$get.routes) {
      $stateProvider.state(e, $routerProvider.$get.routes[e]);
    }
    
    $urlRouterProvider.otherwise('/');
  }
]);

angular.module('app').constant('AppSettings', constants);

angular.module('app').run(onRun);


angular.bootstrap(document, ['app'], {
 
});

import angular from 'angular';
// angular modules
import constants from './constants';
import onConfig  from './on_config';
import onRun     from './on_run';
import 'angular-ui-router';
import 'angular-material-icons';
import './templates';
import './filters';
import './controllers';
import './services';
require('./directives/index.js');
require ('./router.js');
import '../Entities/entities.js';
import 'angular-ui-bootstrap';
import 'angular-translate';
import 'angular-ckeditor/bower_components/ckeditor/ckeditor.js';
import 'angular-ckeditor/angular-ckeditor.js';
import 'angular-gridster';
import 'angular-sanitize';
import 'angular-ui-tree';
require('./dialogs.js')();
var mapPromise = require('./helpers.js').mapPromise;
Array.prototype.mapPromise = mapPromise;
// create and bootstrap application
const requires = [
  'ui.router',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives',
  'router',
  'entities',
  'ngMdIcons',
  'ui.bootstrap',
  'dialogs.main',
  'ckeditor',
  'gridster',
  'ui.tree',
  'ngSanitize'
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
  'dialogsProvider',
  function ($locationProvider,$urlRouterProvider, $stateProvider, $routerProvider, $provide,dialogsProvider) {
    //$locationProvider.html5Mode(true);
    for (var e in $routerProvider.$get.routes) {
      $stateProvider.state(e, $routerProvider.$get.routes[e]);
    }
    dialogsProvider.useBackdrop('static');
    $locationProvider.html5Mode(true);
  //  $urlRouterProvider.otherwise('/');
  }
]);

angular.module('app').constant('AppSettings', constants);

angular.module('app').run(onRun);


angular.bootstrap(document, ['app'], {

});

angular.module('app').directive('gridsterDynamicHeight', gridsterDynamicHeight);

    gridsterDynamicHeight.$inject = [];
    function gridsterDynamicHeight(){

        var directive = {
            scope: {
                item: "=" //gridster item
            },
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {

            scope.$watch(function() {

                return element[0].scrollHeight;
            },
            function(newVal, oldVal) {

                var rowHeightOption = 75; // Change this value with your own rowHeight option
                var height = rowHeightOption * scope.item.sizeY;
                if(newVal > height){

                    var div = Math.floor(newVal / rowHeightOption);
                    div++;
                    scope.item.sizeY = div;
                }
            });
        }
    }

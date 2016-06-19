var header = require('./header.js');
var navbar = require('./navbar.js');
var sidebar = require('./sidebar.js');
var currentModule = angular.module('components',[]);
currentModule.component(header.name, header.component);
currentModule.component(navbar.name, navbar.component);
currentModule.component(sidebar.name, sidebar.component);
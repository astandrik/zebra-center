var service = require('./structureService.js');
var currentModule = angular.module('structure', []);
currentModule.service('$structure', service);
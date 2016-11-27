var adminService = require('./adminService');
var currentModule = angular.module('admin', []);
currentModule.factory('$admin', adminService);

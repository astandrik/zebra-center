import angular from 'angular';
require('./components/components.js');

const directivesModule = angular.module('app.directives', ['components']);


export default directivesModule;

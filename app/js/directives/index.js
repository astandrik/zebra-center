import angular from 'angular';

const bulk = require('bulk-require');
const directivesModule = angular.module('app.directives', []);
const directives = bulk(__dirname, ['./**/!(*index|*.spec).js']);

function declare(directiveMap) {
  Object.keys(directiveMap).forEach((key) => {
    let item = directiveMap[key];

    if (!item) {
      return;
    }
    if(item.type == 'component') {
      directivesModule.component(item.name, item.component);
    } else if (item.fn && typeof item.fn === 'function') {
      directivesModule.directive(item.name, item.fn);
    } else {
      declare(item);
    }
  });
}

declare(directives);

export default directivesModule;

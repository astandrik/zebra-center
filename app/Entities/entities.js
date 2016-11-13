require('./Articles/articles.js');
require('./Structure/structure.js');
angular.module('entities', [
    'articles',
    'structure'
])

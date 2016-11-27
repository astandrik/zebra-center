require('./Articles/articles.js');
require('./Structure/structure.js');
require('./Admin/admin.js');
angular.module('entities', [
    'articles',
    'structure',
    'admin'
])

'use strict';
var routes = {};
Object.assign(routes,
              require('./Articles/articlesList.js'),
              require('./Home/home.js'),
              require('./Structure/structure.js'),
              require('./Section/articlesList.js')
             );
module.exports = routes;

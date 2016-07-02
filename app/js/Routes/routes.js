'use strict';
var routes = {};
Object.assign(routes,
              require('./Articles/articlesList.js'),  
              require('./Home/home.js')
             );
module.exports = routes;

var Articles = require('./models/Articles');

var entities = {};


entities['articles'] = {};
entities['articles'].get = function(res) {
    Articles().SelectAll(res);
};

entities['articles'].update = function(item, res) {
    Articles(item).Update(res);
}


module.exports = {
    entities
}

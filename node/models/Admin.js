var qHelper = require('../queryHelper.js');
var crud = require('../CRUD.js');
var jwt = require('jwt-simple');
var moment = require('moment');
const app = require("../app").app;

var Admin = function (item) {
    var obj = {};
    if (item) {
        obj.name = item.name;
        obj.password = item.password;
    }
    obj.checkPassword = function (res) {
        var generateToken = function (data, resolve) {
            var user = data.result;
            if (!user || user.length == 0 || user[0].pswmatch == false) {
                resolve(data);
            } else {
                user = user[0];
                var expires = moment().add('days', 14).valueOf();
                var token = jwt.encode({
                    userid: user.id,
                    exp: expires
                }, app.get('jwtTokenSecret'));
                Object.assign(user, {
                    token
                });
                resolve(data);
            }
        }
        var body = (resolve, reject) =>
            crud.Read("SELECT id,(password = crypt($1, password)) as pswmatch, name FROM \"USERS\" \
where name=$2", [item.password, item.name], res)
            .then((data) => generateToken(data, resolve), () => reject(data));
        qHelper.makeTransaction(body);
    }
    return obj;
}

module.exports = Admin;

var qHelper = require('../queryHelper.js');
var crud = require('../CRUD.js');

function createFlat(struct, parentId) {
    var flat = struct.reduce((sum, current) => {
        sum.push({
            alias: current.alias,
            title: current.title,
            viewid: current.viewid,
            order: current.order,
            parentId: (parentId || 10000)
        });
        if (current.nodes) {
            sum = sum.concat(createFlat(current.nodes, current.viewid));
        }
        return sum;
    }, []);
    return flat;
}

var Structure = function (struct) {
    var obj = {};
    if (struct) {
        obj.struct = createFlat(struct);
    }
    obj.deleteStructure = function (callback) {
        var deleteJoins = () => {
            crud.Query('DELETE FROM VIEWS_JOINS', false, callback);
        }
        crud.Query('DELETE FROM VIEWS', true, deleteJoins);
    }
    obj.updateStructure = function (res) {
        var createStructure = function () {
            var joins_table = [];
            obj.struct.forEach((x) => {
                joins_table.push([x.parentId, x.viewid]);
            });
            var new_struct_creates = obj.struct.filter(x => x.viewid < 0).map((item) => {
                return {
                    item: item,
                    promise: () => crud.Create('views', {
                        title: item.title,
                        viewid: item.viewid,
                        alias: item.alias,
                        order: item.order
                    }, res)
                }
            });
            var old_struct_creates = obj.struct.filter(x => x.viewid > 0).map((item) => {
                return {
                    item: item,
                    promise: () => crud.Create('views', {
                        title: item.title,
                        viewid: item.viewid,
                        alias: item.alias,
                        order: item.order
                    }, res)
                }
            });

            var insertJoins = (resolve, reject) => {
                var chained_joins_promise = (i) => {
                    if (i == (joins_table.length)) {
                        crud.Read("SELECT PARENTID,VIEWID, TITLE, CHILDID, ALIAS, \"order\" FROM STRUCTURE", [], res)
                            .then((data) => resolve(data), (data) => reject(data));
                    } else {
                        crud.Create('views_joins', {
                            childid: joins_table[i][1],
                            parentid: joins_table[i][0]
                        }, res).then(() => {
                                chained_joins_promise(i + 1);
                            },
                            (data) => reject(data));
                    }
                }
                chained_joins_promise(0);
            }
            var body = function (resolve, reject) {
                var promise;
                var chained_promise_old = function (i) {
                    if (i == old_struct_creates.length) {
                        chained_promise_new(0);
                    } else {
                        old_struct_creates[i].promise().then(() =>
                            chained_promise_old(i + 1),
                            (data) => reject(data));
                    }
                }
                var chained_promise_new = function (i) {
                    debugger;
                    if (i == new_struct_creates.length) {
                        insertJoins(resolve, reject);
                    } else {
                        new_struct_creates[i].promise().then(() => {
                            crud.Read("SELECT lastid FROM get_last_view_id() as lastid", [], res)
                                .then(
                                    (data) => {
                                        var id = data.result[0].lastid;
                                        joins_table.forEach((x) => {
                                            if (x[0] == new_struct_creates[i].item.viewid) {
                                                x[0] = id;
                                            }
                                            if (x[1] == new_struct_creates[i].item.viewid) {
                                                x[1] = id;
                                            }
                                        });
                                        chained_promise_new(i + 1);
                                    },
                                    (data) => reject(data));
                        });
                    }
                }
                chained_promise_old(0);
            };
            qHelper.makeTransaction(body);
        };
        obj.deleteStructure(createStructure);
    };
    obj.getStructure = function (res) {
        var body = (resolve, reject) =>
            crud.Read("SELECT PARENTID,VIEWID, TITLE, CHILDID, ALIAS, \"order\" FROM STRUCTURE", [], res)
            .then((data) => resolve(data), (data) => reject(data));
        qHelper.makeTransaction(body);
    }
    obj.selectAllViews = function (res) {
        var body = (resolve, reject) =>
            crud.Read("SELECT PARENTID, VIEWID, TITLE, CHILDID, ALIAS, \"order\" FROM STRUCTURE where childid[1] is null ", [], res)
            .then((data) => resolve(data), (data) => reject(data));
        qHelper.makeTransaction(body);
    };
    return obj;
}


module.exports = {
    structure: Structure
}

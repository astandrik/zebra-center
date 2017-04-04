Array.prototype.myIndexOf = function (f) {
    for (var i = 0; i < this.length; ++i) {
        if (f(this[i]))
            return i;
    }
    return -1;
};

function getChildren(node, nodes) {
    if (node.childid.length == 1 && !node.childid[0]) return [];
    else {
        return nodes
            .filter((item) => {
                if (node.childid.indexOf(item.viewid) > -1) {
                    return true;
                } else {
                    return false;
                }
            })
            .map((item) => {
                item.nodes = getChildren(item, nodes);
                return item
            });
    }
}

function flatToArray(data) {
    data.forEach((item) => item.nodes = getChildren(item, data));
}

/*@ngInject*/
function fn($http, $admin) {
    return {
        get: function () {
            return $http.get('/structure/get').then(function (data) {
                var entities = data.data;
                flatToArray(entities);
                entities.sort((a,b) => a.order > b.order ? 1 : -1)
                       .forEach(x=> x.nodes.sort((a,b) => a.order > b.order ? 1 : -1));
                return entities.filter((item) => {
                    return item.parentid == 10000;
                });
            });
        },
        update: function (json, postBack) {
            var token = $admin.getToken();
            if (token) {
                return $http.post('/structure/update', json, {
                    headers: {
                        'x-access-token': token
                    }
                }).then((data) => {
                    if (postBack) postBack(data);
                });
            }
        },
    }
}

module.exports = fn;

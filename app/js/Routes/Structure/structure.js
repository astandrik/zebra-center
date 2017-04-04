function searchTree(id, nodes) {
    var node = -1;
    for (var i = 0; i < nodes.length; i++) {
        if (node != -1) break;
        if (nodes[i].viewid == id) {
            node = nodes[i];
            break
        }
        if (nodes[i].nodes.length > 0) {
            node = searchTree(id, nodes[i].nodes);
        }
    }
    return node;
}

function Max(arr) {
    if (arr.length == 1) return arr[0];
    else return Math.max(arr[0], Max(arr.slice(1)));
}

function maxId(nodes) {
    return Max(nodes.reduce((sum, current) => {
        return sum.concat(current.childid).concat(current.viewid);
    }, []));
}

function getChildren(node, nodes) {
    if (node.childid.length == 1 && !node.childid[0]) return [];
    else {
        return nodes
            .filter((item) => {
                if (node.childid.indexOf(item.viewid) > -1) {
                    return item;
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

function enumerateRecursive(roots, start = 1) {
  for(var i = 0; i < roots.length; i++) {
    roots[i].order = start;
    enumerateRecursive(roots[i].nodes, start+1);
    start += roots[i].nodes.length+1;
  }
}

var entity = () => ({
    url: '/Structure',
    views: {
        'content@': {
            templateUrl: 'js/Routes/Structure/structure.html',
            /*@ngInject*/
            controller: function ($scope, $structure, structure, dialogs) {
                $scope.nodes = structure;
                var baseid = -1;
                var refreshData = () => $structure.get().then(function (data) {
                    $scope.nodes = data;
                });
                var refreshNavbars = () => $scope.$emit('refreshNavbars');
                $scope.save = function () {
                    for (var i = 0; i < $scope.nodes.length; i++) {
                        if (!$scope.nodes[i].alias || $scope.nodes[i].alias.length == 0) {
                            dialogs.error('ВНИМАНИЕ', `У раздела "${$scope.nodes[i].title}" отсуствует поле алиас. Сохранение невозможно.`);
                            return;
                        }
                    }
                    enumerateRecursive($scope.nodes);
                    $structure.update($scope.nodes, function (data) {
                        var entities = data.data;
                        flatToArray(entities);
                        entities.sort((a,b) => a.order > b.order ? 1 : -1)
                               .forEach(x=> x.nodes.sort((a,b) => a.order > b.order ? 1 : -1));
                        $scope.nodes = entities.filter((item) => {
                            return item.parentid == 10000;
                        });
                        refreshNavbars();
                    });
                };
                $scope.addDir = function () {
                    $scope.nodes.push({
                        viewid: baseid--,
                        title: "Новый раздел",
                        nodes: [],
                        isNew: true
                    });
                };
                $scope.newSubItem = function (item) {
                    var id = item.viewid;
                    var node = searchTree(id, $scope.nodes);
                    if (node != -1) {
                        node.nodes.push({
                            viewid: baseid--,
                            title: "Новый раздел",
                            nodes: [],
                            parentid: id,
                            isNew: true
                        });
                    }
                };
                $scope.removeSubItem = function (item) {
                    var id = item.viewid;
                    var node = searchTree(id, $scope.nodes);
                    var parentid = node.parentid;

                    if (!parentid) parentNode = $scope;
                    else var parentNode = searchTree(parentid, $scope.nodes);
                    var removeIndex = -1;
                    for (var i = 0; i < parentNode.nodes.length; i++) {
                        if (parentNode.nodes[i].viewid == id) {
                            removeIndex = i;
                        }
                    }
                    parentNode.nodes.splice(removeIndex, 1);
                };
                $scope.cancel = function () {
                    refreshData();
                    refreshNavbars();
                };
            },
            resolve: {
                /*@ngInject*/
                structure: function ($structure) {
                    return $structure.get().then(function (data) {  
                        return data;
                    })
                }
            }
        }
    }
})

module.exports = {
    Structure: entity
};

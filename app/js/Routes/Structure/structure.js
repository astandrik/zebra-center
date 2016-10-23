function searchTree(id, nodes) {
    var node = -1;
    for(var i = 0; i < nodes.length; i++) {
        if(node != -1) break;
        if(nodes[i].viewid == id) {node = nodes[i]; break}
        if(nodes[i].nodes.length > 0) {
            node = searchTree(id, nodes[i].nodes);
        }
    }
    return node;
}

function Max(arr) {
    if(arr.length == 1) return arr[0];
    else return Math.max(arr[0],Max(arr.slice(1)));
}

function maxId(nodes) {
    return Max(nodes.reduce((sum, current) => {
        return sum.concat(current.childid).concat(current.viewid);
    }, []));
}

function getChildren(node, nodes) {
    if(node.childid.length == 1 && !node.childid[0] ) return [];
    else {
        return nodes
            .filter((item) => {
                if (node.childid.indexOf(item.viewid) > -1) {
                    return item;
                } else {
                    return false;
                }
            })
            .map((item)=> {item.nodes = getChildren(item, nodes); return item});
    }
}

function flatToArray(data) {
    data.forEach((item) =>  item.nodes = getChildren(item, data));
}

var entity = {
        url: '/Structure',
        views: {
          'content@' : {
            templateUrl: 'js/Routes/Structure/structure.html',
            controller: function($scope, $structure, structure) {
                $scope.nodes = structure;
                var baseid = -1;
                var refreshData = ()=> $structure.get().then(function(data) {
                                          $scope.nodes = data;
                                       });
                $scope.save = function() {
                    $structure.update($scope.nodes, function(data) {
                      var entities = data.data;
                      flatToArray(entities);
                      $scope.nodes = entities.filter((item) => {return !item.parentid});
                    });
                }
                $scope.addDir = function() {
                    $scope.nodes.push({
                        viewid: baseid--,
                        title: "Новый раздел",
                        nodes: [],
                        isNew: true
                    });
                };
                $scope.newSubItem = function(item) {
                    var id = item.viewid;
                    var node = searchTree(id, $scope.nodes);
                    if(node != -1) {
                        node.nodes.push({
                            viewid: baseid--,
                            title: "Новый раздел",
                            nodes: [],
                            parentid: id,
                            isNew: true
                        });
                    }
                }
                $scope.removeSubItem = function(item) {
                    var id = item.viewid;
                    var node = searchTree(id, $scope.nodes);
                    var parentid = node.parentid;

                    if(!parentid) parentNode = $scope;
                    else var parentNode = searchTree(parentid, $scope.nodes);

                    var removeIndex = parentNode.nodes.filter((child) => child.id == id)[0];
                    parentNode.nodes.splice(removeIndex, 1);
                }
                $scope.cancel = function() {
                  refreshData();
                }
            },
            resolve: {
                structure: function($structure) {
                    return $structure.get().then(function(data) {
                        return data;
                    })
                }
            }
          }
        }
      }

module.exports = {Structure: entity};

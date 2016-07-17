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

var entity = {
        url: '/Structure',
        views: {
          'content@' : {
            templateUrl: 'js/Routes/Structure/structure.html',
            controller: function($scope, $structure, structure) { 
                $scope.nodes = structure;
                $scope.newCounter = 0;
                $scope.save = function() {
                    $structure.update($scope.nodes);
                }
                $scope.newId = maxId(structure) + 1;
                $scope.addDir = function() {
                    $scope.nodes.push({
                        viewid: $scope.newId  + ($scope.newCounter++),
                        title: "Новый раздел",
                        nodes: []
                    });                    
                }
                $scope.newSubItem = function(item) {
                    var id = item.viewid;
                    var node = searchTree(id, $scope.nodes);
                    if(node != -1) {
                        node.nodes.push({
                            viewid: $scope.newId  + ($scope.newCounter++),
                            title: "Новый раздел",
                            nodes: [],
                            parentid: id
                        });
                    }
                }
                $scope.removeSubItem = function(item) {
                    var id = item.id;
                    var node = searchTree(id, $scope.nodes);
                    var parentid = node.parentid;
                    
                    if(!parentid) parentNode = $scope;
                    else var parentNode = searchTree(parentid, $scope.nodes);
                    
                    var removeIndex = parentNode.nodes.filter((child) => child.id == id)[0];
                    parentNode.nodes.splice(removeIndex, 1);
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

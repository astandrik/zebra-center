var qHelper = require('../queryHelper.js');

function createFlat(struct, parentId) {
    var flat = struct.reduce((sum, current) => {
        sum.push({alias: current.alias ,title: current.title, viewid: current.viewid, parentId: (parentId || -1)});
        if(current.nodes) {
            sum = sum.concat(createFlat(current.nodes, current.viewid));
        }
        return sum;
    }, []);
    return flat;
}

var Structure = function(struct) {
    var obj = {};
    if(struct) {
        obj.struct = createFlat(struct);
    }
    obj.deleteStructure = function() {
        qHelper.Query('DELETE FROM VIEWS');
        qHelper.Query('DELETE FROM VIEWS_JOINS');
    }
    obj.updateStructure = function(res) {
        obj.deleteStructure();
        obj.struct.map((item) => {
            qHelper.Create('views', {title: item.title, viewid: item.viewid, alias: item.alias}, res, true);
            if(item.parentId != -1) qHelper.Create('views_joins', {childid: item.viewid, parentid: item.parentId},res, true);
        });
        qHelper.sendJson(res, {message: "Structure updated"});
    }
    obj.getStructure = function(res) {
        qHelper.Read("SELECT PARENTID,VIEWID, TITLE, CHILDID, ALIAS FROM STRUCTURE", [], res);
    }
    return obj;
}


module.exports = {structure: Structure}
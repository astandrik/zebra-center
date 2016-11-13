/*@ngInject*/
function fn($http) {
    return {
        getList: function () {
            return $http.get('/data/viewsList').then((data) => {
                var views = data.data;
                return views;
            });
        }
    }
}

module.exports = fn;

/*@ngInject*/
function fn($http, $cookies) {
    return {
        login: function (json, postBack) {
            $http.post("/admin/login", json).then(data => {
                postBack(data);
            });
        },
        getToken: function () {
            var currentUser = $cookies.get('currentUser');
            if (currentUser) {
                currentUser = JSON.parse(currentUser);
                return currentUser.token;
            } else {
                return null;
            }
        },
        logout: function () {
            var token = this.getToken();
            $http.post("/endSession", {}, {
                headers: {
                    'x-access-token': token
                }
            });
        }
    }
}

module.exports = fn;

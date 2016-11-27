/*@ngInject*/
function OnRun($rootScope, AppSettings, $state, $cookies, dialogs, $http, $admin, $timeout) {
    'ngInject';

    // change page title based on state
    $rootScope.$on('$stateChangeSuccess', (event, toState) => {
        $rootScope.pageTitle = '';
        if (toState.title) {
            $rootScope.pageTitle += toState.title;
            $rootScope.pageTitle += ' \u2014 ';
        }

        $rootScope.pageTitle += AppSettings.appTitle;
    });
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
        var currentUser = $cookies.get('currentUser');
        if (currentUser) {
            currentUser = JSON.parse(currentUser);
            if (currentUser.name == "admin") {
                $rootScope.enableEditing = true;
            } else {
                $rootScope.enableEditing = false;
            }
        } else {
            $rootScope.enableEditing = false;
        }
    });
    $rootScope.setAdmin = function (data) {
        var currentUser = {};
        currentUser.token = data.token;
        currentUser.name = data.name;
        $rootScope.enableEditing = true;
        $cookies.put('currentUser', JSON.stringify(currentUser));
        $timeout(() => dialogs.notify("", "Добро пожаловать!"), 500);
    }
    $rootScope.logout = function (sessionOver) {
        $rootScope.enableEditing = false;
        if ($rootScope.sessionCheckerState !== 0) {
            if (sessionOver === true) {
                $timeout(() => dialogs.notify("", "Время сессии закончилось"), 500);
            } else if (sessionOver === "invalid token") {
                $timeout(() => dialogs.notify("", "Неверные параметры сессии"), 500);
            } else {
                var token = $admin.getToken();
                $admin.logout();
                $timeout(() => dialogs.notify("", "До свидания!"), 500);
            }
        }
        $cookies.put('currentUser', '');
        $rootScope.sessionCheckerState = 0;
    }

    var sessionChecker = function () {
        $rootScope.sessionCheckerState = 2;
        var token = $admin.getToken();
        if (token) {
            $http.post('/checkSession', {}, {
                headers: {
                    'x-access-token': token
                }
            }).then(response => {
                if (response.data == "session over") {
                    $rootScope.logout(true);
                } else {
                    $rootScope.logout("invalid token");
                }
            }, () => {
                $rootScope.sessionCheckerState = 1;
            });
        } else {
            $rootScope.sessionCheckerState = 0;
        }
    }
    setInterval(() => {
        if ($rootScope.sessionCheckerState !== 2) {
            sessionChecker();
        }
    }, 2000);

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        debugger;
    });
    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        debugger;
    });
    $rootScope.$on('refreshCurrent', function () {
        $state.go($state.current, {}, {
            reload: true
        });
    });
    $rootScope.$on('refreshNavbars', function (event, data) {
        if (!data || !data.root) {
            $rootScope.$broadcast('refreshNavbars', {
                root: true
            });
        }
    });

}


export default OnRun;;

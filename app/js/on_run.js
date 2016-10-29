/*@ngInject*/
function OnRun($rootScope, AppSettings, $state) {
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
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {});
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

export default OnRun;

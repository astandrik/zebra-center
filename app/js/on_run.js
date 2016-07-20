function OnRun($rootScope, AppSettings, $state) {
  'ngInject';

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.pageTitle = '';

    if ( toState.title ) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    $rootScope.pageTitle += AppSettings.appTitle;
  });
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
  });
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      debugger;
  });
  $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
    debugger;
  });
  $rootScope.$on('refreshCurrent', function() {
      var refreshView =  function() {$state.go($state.current, {}, {reload: true});} ;
  });

}

export default OnRun;

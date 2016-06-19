function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('Home', {
    url: '/',
    views: {
      'content@': {
        title: 'Home'
      }
    }

  });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;

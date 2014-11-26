'use strict';

var myApp = angular.module('myApp',
  ['ngRoute',
  'ngAnimate',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/customer-list', {templateUrl: 'partials/customer-list.html', controller: 'customerListCtrl'});
    $routeProvider.when('/customer-detail/:id', {templateUrl: 'partials/customer-detail.html', controller: 'customerDetailCtrl'});
    $routeProvider.when('/customer-creation', {templateUrl: 'partials/customer-creation.html', controller: 'customerCreationCtrl'});
    $routeProvider.when('/reports/:id', {templateUrl: 'partials/reportsDaysRemaining.html', controller: 'reportsDaysRemaining'});
    $routeProvider.when('/reports/:id/:name', {templateUrl: 'partials/reportsDaysRemaining.html', controller: 'reportsDaysRemaining'});
    $routeProvider.when('/compare/:id/:name', {templateUrl: 'partials/customer-compare.html', controller: 'customerCompare'});
    $routeProvider.when('/login', {controller: 'loginController', templateUrl: 'partials/login.html', hideMenus: true});
    $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'Home'});
    $routeProvider.otherwise({redirectTo: '/login'})
}])
.run(['$rootScope', '$location', '$cookieStore', '$http', '$timeout',
    function ($rootScope, $location, $cookieStore, $http, $timeout) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            console.log('route change');
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $timeout(function(){
                $location.path('/login');
              }, 100);
            }
        });
    }]);
// Returns the days between a & b date objects...
function dateDiffInDays(a, b) {
    var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

// Calculate how many days between now and an event...
function daysTill(e) {
    var eventE = new Date(e);
    var today =  new Date();
    return dateDiffInDays(today, eventE);
}

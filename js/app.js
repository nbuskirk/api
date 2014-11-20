'use strict';
var myApp = angular.module('myApp', ['ngRoute','ngAnimate','myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/customer-list', {templateUrl: 'partials/customer-list.html', controller: 'customerListCtrl'});
  $routeProvider.when('/customer-detail/:id', {templateUrl: 'partials/customer-detail.html', controller: 'customerDetailCtrl'});
  $routeProvider.when('/customer-creation', {templateUrl: 'partials/customer-creation.html', controller: 'customerCreationCtrl'});
  $routeProvider.when('/reports/:id', {templateUrl: 'partials/reportsDaysRemaining.html', controller: 'reportsDaysRemaining'});
  $routeProvider.when('/reports/:id/:name', {templateUrl: 'partials/reportsDaysRemaining.html', controller: 'reportsDaysRemaining'});
  $routeProvider.when('/compare/:id/:name', {templateUrl: 'partials/customer-compare.html', controller: 'customerCompare'});
  $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'Home'});
  $routeProvider.otherwise({redirectTo: '/'})
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

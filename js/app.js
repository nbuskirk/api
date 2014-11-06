'use strict';

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute','myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/customer-list', {templateUrl: 'partials/customer-list.html', controller: 'customerListCtrl'});
        $routeProvider.when('/customer-detail/:id', {templateUrl: 'partials/customer-detail.html', controller: 'customerDetailCtrl'});
        $routeProvider.when('/customer-creation', {templateUrl: 'partials/customer-creation.html', controller: 'customerCreationCtrl'});
        $routeProvider.otherwise({redirectTo: '/', templateUrl: 'partials/home.html'});
    }]);

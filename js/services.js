'use strict';

var services = angular.module('myApp.services',[
  'ngResource'
]);

services.factory('CustomersFactory', function ($resource) {
    return $resource('http://localhost:8080/api/customer', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('CustomerFactory', function ($resource) {
    return $resource('http://localhost:8080/api/customer/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@_id'} },
        delete: { method: 'DELETE', params: {id: '@_id'} }
    })
});

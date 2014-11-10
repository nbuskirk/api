
var myApp = angular.module('myApp.controllers', []);

myApp.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});

myApp.controller('customerListCtrl', ['$scope', 'CustomersFactory', 'CustomerFactory', '$location',
  function ($scope, CustomersFactory, CustomerFactory, $location, $templateCache) {
      $scope.editCustomer = function (customerId) {
          $location.path('/customer-detail/' + customerId);
      };
      $scope.deleteCustomer = function (customerId) {
          CustomerFactory.delete({ id: customerId },function(){
            $scope.customers = CustomersFactory.query();
          });
      };
      $scope.createCustomer = function () {
          $location.path('/customer-creation');
      };
      $scope.customers = CustomersFactory.query();
    }]);

myApp.controller('customerDetailCtrl', ['$scope', '$routeParams', 'CustomerFactory', '$location',
    function ($scope, $routeParams, CustomerFactory, $location) {
        $scope.updateCustomer = function () {
            CustomerFactory.update($scope.customer, function(){
                $location.path('/customer-list');
            });

        };
        $scope.cancel = function () {
            $location.path('/customer-list');
        };
        $scope.customer = CustomerFactory.show({id: $routeParams.id});
    }]);

myApp.controller('customerCreationCtrl', ['$scope', 'CustomersFactory', '$location',
    function ($scope, CustomersFactory, $location) {
        $scope.createNewCustomer = function () {
            CustomersFactory.create($scope.customer);
            $location.path('/customer-list');
        };
        $scope.cancel = function () {
            $location.path('/customer-list');
        };
    }]
);

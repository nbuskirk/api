'use strict';

/* Controllers */
google.load('visualization', '1', {
  packages: ['corechart']
});

google.setOnLoadCallback(function() {
  angular.bootstrap(document.body, ['myApp']);
});

myApp.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});
angular.module('myApp.controllers', [])
  .controller('customerListCtrl', ['$scope','filterFilter', 'CustomersFactory', 'CustomerFactory', '$location',
  function ($scope, filterFilter, CustomersFactory, CustomerFactory, $location, $templateCache) {
      $scope.editCustomer = function (customerId) {
          $location.path('/customer-detail/' + customerId);
      };
      $scope.deleteCustomer = function (customerId) {
        if (confirm('Are you sure you wish to delete this customer?')) {
          CustomerFactory.delete({ id: customerId },function(){
            $scope.customers = CustomersFactory.query();
          });
        } else {
          //
        }

      };
      $scope.compareCustomers = function(){
        $location.path('/compare/'+$scope.selection[0]+'/'+$scope.selection[1]);
      };
      $scope.createCustomer = function () {
          $location.path('/customer-creation');
      };
      $scope.customers = CustomersFactory.query('',function(){
        angular.forEach($scope.customers, function (customer) {
          customer.contractvalue = parseFloat(customer.contractvalue); //convert our value for the sort on the front end
        });
      });
      $scope.orderProp = 'name';
      $scope.selection = [];
      $scope.selectedCustomers = function selectedCustomers() {
        return filterFilter($scope.customers, { selected: true });
      };
      // watch fruits for changes
      $scope.$watch('customers|filter:{selected:true}', function (nv) {
        $scope.selection = nv.map(function (customer) {
          return customer._id;
        });
      }, true);

  }])
  .controller('customerDetailCtrl', ['$scope', '$routeParams', 'CustomerFactory', '$location',
  function ($scope, $routeParams, CustomerFactory, $location) {
        $scope.updateCustomer = function () {
            $scope.customer.contractvalue = parseFloat($scope.customer.contractvalue); //convert our value for the sort on the front end
            $scope.customer.daysremaining = daysTill($scope.customer.enddate);
            CustomerFactory.update($scope.customer, function(){
                $location.path('/customer-list');
            });

        };
        $scope.cancel = function () {
            $location.path('/customer-list');
        };
        $scope.customer = CustomerFactory.show({id: $routeParams.id});
  }])
  .controller('customerCreationCtrl', ['$scope', 'CustomersFactory', '$location',
  function ($scope, CustomersFactory, $location) {
        /*$scope.createNewCustomer = function () {
            $scope.customer.contractvalue = parseFloat($scope.customer.contractvalue); //convert our value for the sort on the front end
            $scope.customer.daysremaining = daysTill($scope.customer.enddate);
            CustomersFactory.create($scope.customer, function(){
              $location.path('/customer-list');
            })
        };*/
        $scope.submitForm = function(isValid) {
          // check to make sure the form is completely valid
          if (isValid) {
              //lert('our form is amazing');
              $scope.customer.contractvalue = parseFloat($scope.customer.contractvalue); //convert our value for the sort on the front end
              $scope.customer.daysremaining = daysTill($scope.customer.enddate);
              CustomersFactory.create($scope.customer, function(){
                $location.path('/customer-list');
              })
          }
      };
        $scope.cancel = function () {
            $location.path('/customer-list');
        };
  }])
  .controller('reportsDaysRemaining', ['$scope', '$routeParams', 'CustomersFactory', 'CustomerFactory', '$location',
  function ($scope, $routeParams, CustomersFactory, CustomerFactory, $location, $templateCache) {
          $scope.renderChart = function(){
            $scope.chartdata = new google.visualization.DataTable();
            $scope.chartdata.addColumn('string', 'Customer');
            $scope.chartdata.addColumn('number', 'Days Remaining');
            $scope.chartoptions = {'title':'Days remaining in contracts','width':'100%','height':400};
            switch($routeParams.name){
              case "barChart":
                $scope.chart = new google.visualization.BarChart(document.getElementById('chart_div'));
                break;
              case "lineChart":
                $scope.chart = new google.visualization.LineChart(document.getElementById('chart_div'));
                break;
              case "areaChart":
                $scope.chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
                break;
              default :
                $scope.chart = new google.visualization.PieChart(document.getElementById('chart_div'));
                break;
            }
            angular.forEach($scope.customers, function(customer){
              var row = [customer.name, customer.daysremaining];
              $scope.chartdata.addRow(row);
            });
            $scope.chart.draw($scope.chartdata, $scope.chartoptions)
          }
          $scope.customers = CustomersFactory.query('',function(){
            $scope.renderChart();
          });
          $( window ).resize(function() {
            $scope.renderChart();
          });
      }
  ])
  .controller('customerCompare', ['$scope', '$routeParams', 'CustomerFactory', '$location',
  function ($scope, $routeParams, CustomerFactory, $location) {
        $scope.customer1 = CustomerFactory.show({id: $routeParams.id});
        $scope.customer2 = CustomerFactory.show({id: $routeParams.name});
  }])
  .controller('Home', ['$scope', '$routeParams', 'CustomersFactory', 'CustomerFactory', '$location',
  function ($scope, $routeParams, CustomersFactory, CustomerFactory, $location, $templateCache) {
        $scope.customers = CustomersFactory.query();
      }
  ])

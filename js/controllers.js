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
            window.history.back()
            //$location.path('/customer-list');
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
            //$location.path('/customer-list');
            window.history.back()
        };
  }])
  .controller('userCreationCtrl', ['$scope', 'UsersFactory', '$location',
  function ($scope, UsersFactory, $location) {
    $scope.submitForm = function(isValid) {
      if (isValid) {
        UsersFactory.create($scope.user, function(){
          $location.path('/user-list');
        })
      }
    };
    $scope.cancel = function () {
      window.history.back()
    };
  }])
  .controller('userListCtrl', ['$scope','filterFilter', 'UsersFactory', 'UserFactory', '$location',
  function ($scope, filterFilter, UsersFactory, UserFactory, $location, $templateCache) {
      $scope.editUser = function (userId) {
          $location.path('/user-detail/' + userId);
      };
      $scope.deleteUser = function (userId) {
        if (confirm('Are you sure you wish to delete this user?')) {
          UserFactory.delete({ id: userId },function(){
            $scope.users = UsersFactory.query();
          });
        }
      };
      $scope.createUser = function () {
          $location.path('/user-creation');
      };
      $scope.orderProp = 'name';
      $scope.users = UsersFactory.query();
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
        $scope.editCustomer = function (customerId) {
            $location.path('/customer-detail/' + customerId);
        };
  }])
  .controller('Navigation', ['$scope', '$rootScope', '$routeParams', 'AuthenticationService', '$location', '$cookieStore',
    function($scope, $rootScope, $routeParams, AuthenticationService, $location, $cookieStore) {
      $rootScope.globals = $cookieStore.get('globals') || {};
      $scope.logout = function() {
        AuthenticationService.ClearCredentials();
        $location.path('/login');
      }
    }])
  .controller('Home', ['$scope', '$routeParams', 'CustomersFactory', 'CustomerFactory', 'DeskFactory', '$location',
  function ($scope, $routeParams, CustomersFactory, CustomerFactory, DeskFactory, $location, $templateCache) {
        //localStorage.setItem('access_token','X1pzJCDYak7DdA2Sgvqg');
        //$http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization"}; //you probably don't need this line.  This lets me connect to my server on a different domain
        //$http.defaults.headers.common['Authorization'] = 'Basic cGF1bC5zY2htaXR6QGFwaWNhc3lzdGVtLmNvbTpab21iaWVfNjkh';
        //$scope.deskInfo = DeskFactory.query();
        $scope.totalcontracts = 0;
        $scope.mrr = 0;
        $scope.ppc = 0;
        $scope.ppcavg = 0;
        $scope.totalchecks = 0;
        $scope.customers = CustomersFactory.query('',function(){
          angular.forEach($scope.customers,function(customer){
            var mrr = Number(customer.contractvalue / customer.term);
            var ppc = mrr / Number(customer.checkscommitted);
            $scope.totalcontracts += Number(customer.contractvalue);
            $scope.mrr += mrr;
            $scope.ppc += ppc;
            $scope.ppcavg = $scope.ppc / $scope.customers.length;
            $scope.totalchecks += Number(customer.checkscommitted);
          })
        });
      }
  ])
  .controller('loginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);

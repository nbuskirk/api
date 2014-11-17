'use strict';

var services = angular.module('myApp.services',[
  'ngResource'
]);

services.factory('CustomersFactory', function ($resource) {
    return $resource('http://192.168.150.94:8080/api/customer', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('CustomerFactory', function ($resource) {
    return $resource('http://192.168.150.94:8080/api/customer/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@_id'} },
        delete: { method: 'DELETE', params: {id: '@_id'} }
    })
});

services.factory('ChartFactory', function(){
  return {
    showChart: function methodThatDoesAThing() {
      return "1";
    }
  }
})
/*
$scope.drawChart = function(){
  var chartSchema = {
    "cols": [
          {"id":"","label":"Topping","pattern":"","type":"string"},
          {"id":"","label":"Slices","pattern":"","type":"number"}
        ],
    "rows": [
          {"c":[{"v":"Mushrooms","f":null},{"v":3,"f":null}]},
          {"c":[{"v":"Onions","f":null},{"v":1,"f":null}]},
          {"c":[{"v":"Olives","f":null},{"v":1,"f":null}]},
          {"c":[{"v":"Zucchini","f":null},{"v":1,"f":null}]},
          {"c":[{"v":"Pepperoni","f":null},{"v":2,"f":null}]}
        ]
  }
  var chart_options = {
    title: 'Customer Errors',
    width: '100%',
    height: 240,
    vaxis: {title: 'Topping'}
  };
  var data = new google.visualization.DataTable(chartSchema);
  var chart = new google.visualization.BarChart(document.getElementById('chartdiv'));
  chart.draw(data, chart_options);
};
$(window).resize(function () {
  $scope.drawChart();
});
*/

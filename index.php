<!doctype html>
<html lang="en" ng-app="myApp">
<head>
  <meta charset="utf-8">
  <title>Apica</title>
  <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css">
  <link rel="stylesheet" href="css/app.css">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>

<!-- Main application template, main container start -->
<div class="container" >
  <?php include('partials/navigation.inc'); ?>
  <div ng-view></div>
  <?php include('partials/footer.inc'); ?>
</div>
<!-- end main application container -->

<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="node_modules/bootstrap/dist/js/bootstrap.js"></script>
<script src="node_modules/angular/angular.min.js"></script>
<script src="node_modules/angular-route/angular-route.min.js"></script>
<script src="node_modules/angular-resource/angular-resource.js"></script>

<script src="js/app.js"></script>
<script src="js/services.js"></script>
<script src="js/controllers.js"></script>
<script src="js/filters.js"></script>
<script src="js/directives.js"></script>

</body>
</html>

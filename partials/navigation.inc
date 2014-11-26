<!-- Static navbar -->
<div class="navbar navbar-inverse" role="navigation" ng-controller="Navigation" ng-if="globals.currentUser">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#"><img src="images/logo.png" style="height:100%;"></a>
    </div>
    <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav"><!-- logged in nav -->
        <li>
          <a href="#/">
          <span class="glyphicon glyphicon-home" aria-hidden="true"></span> Home
          </a>
        </li>
        <li class="dropdown">
        <a href="" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Customers <span class="caret"></span>

        </a>

          <ul class="dropdown-menu" role="menu">
            <li><a href="#/customer-list">Customer List</a></li>
            <li><a href="#/customer-creation">Create a Customer</a></li>
          </ul>
        </li>
        <li class="dropdown">
        <a href="" class="dropdown-toggle" data-toggle="dropdown">
          <span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span> Reports <span class="caret"></span></a>
          <ul class="dropdown-menu" role="menu">
            <li><a href="#/reports/daysRemaining/barChart">Contract Time Remaining</a></li>
          </ul>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><p style="color:#eeeeee; padding-top:15px">Logged in as: {{globals.currentUser.username}}</p></li>
        <li>
          <a ng-click="logout();">
            <span class="glyphicon glyphicon-off" aria-hidden="true"></span> Logout
          </a>
        </li>
      </ul>
    </div><!--/.nav-collapse -->
  </div><!--/.container-fluid -->
</div>

angular.module('SAScrm', ['ngRoute', 'SASController'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider

        .when("/home", { templateUrl: "partials/home.html", controller: "HomeCtrl" })
        .when("/statistics", { templateUrl: "partials/statistics.html", controller: "StatisticsCtrl" })
        .when("/setup", { templateUrl: "partials/setup.html", controller: "SetupCtrl" })
        .when("/login", { templateUrl: "partials/login.html", controller: "AuthCtrl" })
  
        // else 404
        .otherwise({ redirectTo: '/login' });
  
        $locationProvider
        $locationProvider.html5Mode(true);
    }]);
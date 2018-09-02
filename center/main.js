angular.module('SAScrm', ['ngRoute', 'SASController', 'SASService'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider

        .when("/home", { templateUrl: "partials/home.html", controller: "HomeCtrl" })
        .when("/recall", { templateUrl: "partials/recall.html", controller: "RecallCtrl" })
        .when("/schedule", { templateUrl: "partials/schedule.html", controller: "ScheduleCtrl" })
        .when("/unreg", { templateUrl: "partials/unreg.html", controller: "UnregCtrl" })
        .when("/calendar", { templateUrl: "partials/calendar.html", controller: "CalendarCtrl" })
        .when("/statistics", { templateUrl: "partials/statistics.html", controller: "StatisticsCtrl" })
        .when("/setup", { templateUrl: "partials/setup.html", controller: "SetupCtrl" })
        .when("/login", { templateUrl: "partials/login.html", controller: "AuthCtrl" })
  
        // else 404
        .otherwise({ redirectTo: '/login' });
  
        $locationProvider
        $locationProvider.html5Mode(true);
    }]);
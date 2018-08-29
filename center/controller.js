var sas = angular.module('SASController', ['ngRoute', 'btford.socket-io', 'ngDialog']);
sas
    .controller('AuthCtrl', function ($location, $scope, ngDialog, $timeout, Notifi) {

        $scope.login = function () {
            // ngDialog.open({ 
            //     template: 'templates/loading.html',
            //     className: 'ngdialog-theme-default',
            //     paint: true,
            //     showClose: false,
            //     closeByDocument: false,
            //     closeByEscape: false
            //  });

            if ($scope.username === undefined || $scope.username === '' || $scope.password === undefined || $scope.password === '') {
                Notifi._error('Please enter Username and Password');
                return;
            } else {
                $location.path('/home');
            }
        }
    })
    .controller('MenuCtrl', function ($location, $scope) {
        var active = localStorage.getItem('isactive');
        if (active === null) {
            $scope.isactive = 1;
        } else {
            $scope.isactive = parseInt(active);
        }


        // go home
        $scope.go_home = function () {
            $location.path('/home');
            $scope.isactive = 1;
            localStorage.setItem('isactive', $scope.isactive);
        }

        // go notcalled
        $scope.go_notcalled = function () {
            $location.path('/home');
            $scope.isactive = 2;
            localStorage.setItem('isactive', $scope.isactive);
        }

        // go recall
        $scope.go_recall = function () {
            $location.path('/home');
            $scope.isactive = 3;
            localStorage.setItem('isactive', $scope.isactive);
        }

        // go schedule 
        $scope.go_schedule = function () {
            $location.path('/home');
            $scope.isactive = 4;
            localStorage.setItem('isactive', $scope.isactive);
        }

        // go notreg
        $scope.go_notreg = function () {
            $location.path('/home');
            $scope.isactive = 5;
            localStorage.setItem('isactive', $scope.isactive);
        }

        // go send
        $scope.go_send = function () {
            $location.path('/home');
            $scope.isactive = 6;
            localStorage.setItem('isactive', $scope.isactive);
        }

        // go calendar
        $scope.go_calendar = function () {
            $location.path('/home');
            $scope.isactive = 7;
            localStorage.setItem('isactive', $scope.isactive);
        }

        // go statistics
        $scope.go_statistics = function () {
            $location.path('/statistics');
            $scope.isactive = 8;
            localStorage.setItem('isactive', $scope.isactive);
        }

        // go setup
        $scope.go_setup = function () {
            $location.path('/setup');
            $scope.isactive = 9;
            localStorage.setItem('isactive', $scope.isactive);
        }
    })
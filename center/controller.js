var sas = angular.module('SASController', ['ngRoute', 'btford.socket-io', 'datatables', 'ngDialog', 'angular-md5']);
sas
    .controller('AuthCtrl', function ($location, $scope, $rootScope, ngDialog, $timeout, Notifi, DataServices, md5, Thesocket) {

        $scope.login = function () {
            if ($scope.username === undefined || $scope.username === '' || $scope.password === undefined || $scope.password === '') {
                Notifi._error('Please enter Username and Password');
                return;
            } else {
                ngDialog.open({
                    template: 'templates/loading.html',
                    className: 'ngdialog-theme-default',
                    paint: true,
                    showClose: false,
                    closeByDocument: false,
                    closeByEscape: false
                });
                let pass = md5.createHash($scope.username + $scope.password);
                DataServices.signIn($scope.username, pass).then(function (repsonse) {
                    var data_result = repsonse.data;
                    if (data_result.error_code === 0) {
                        $timeout(function () {
                            if (data_result.auth.Role[0].id === 1 || data_result.auth.Role[0].id === 0) {
                                ngDialog.close();
                                $rootScope.auth = data_result.auth;
                                localStorage.setItem('Auth', JSON.stringify(data_result.auth));
                                // Notifi._success('Đăng nhập thành công');
                                Thesocket.emit('connection');

                                $location.path('/home');
                                location.reload(true);
                            } else {
                                alert('marketing')
                            }
                        }, 1500);
                    } if (data_result.error_code === 1) {
                        $timeout(function () {
                            ngDialog.close();
                            Notifi._error('Có lỗi trong quá trình xử lý vui lòng thử lại.');
                            return;
                        }, 1500)
                    } if (data_result.error_code === 2) {
                        $timeout(function () {
                            ngDialog.close();
                            Notifi._error('Username hoặc Password không chính xác.');
                            return;
                        }, 1500)
                    } if (data_result.error_code === 3) {
                        $timeout(function () {
                            ngDialog.close();
                            Notifi._error('Tài khoản chưa được đăng ký.');
                            return;
                        }, 1500)
                    } if (data_result.error_code === 4) {
                        $timeout(function () {
                            ngDialog.close();
                            Notifi._error('Tài khoản đang tạm khóa liên hệ Admin để kích hoạt.');
                            return;
                        }, 1500)
                    }
                })

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
            $location.path('/notcall');
            $scope.isactive = 2;
            localStorage.setItem('isactive', $scope.isactive);
        }

        // go recall
        $scope.go_recall = function () {
            $location.path('/recall');
            $scope.isactive = 3;
            localStorage.setItem('isactive', $scope.isactive);
        }

        // go schedule 
        $scope.go_schedule = function () {
            $location.path('/schedule');
            $scope.isactive = 4;
            localStorage.setItem('isactive', $scope.isactive);
        }

        // go unreg
        $scope.go_unreg = function () {
            $location.path('/unreg');
            $scope.isactive = 5;
            localStorage.setItem('isactive', $scope.isactive);
        }

        // go send
        $scope.go_send = function () {
            $location.path('/send');
            $scope.isactive = 6;
            localStorage.setItem('isactive', $scope.isactive);
        }

        // go calendar
        $scope.go_calendar = function () {
            $location.path('/calendar');
            $scope.isactive = 7;
            localStorage.setItem('isactive', $scope.isactive);
        }

        // go statistics
        $scope.go_statistics = function () {
            alert('Trang đang hoàn thiện vui lòng quay lại sau.')
            // $location.path('/statistics');
            $scope.isactive = 8;
            localStorage.setItem('isactive', $scope.isactive);
        }

        // go setup
        $scope.go_setup = function () {
            // $location.path('/setup');
            alert('Trang đang hoàn thiện vui lòng quay lại sau.')
            $scope.isactive = 9;
            localStorage.setItem('isactive', $scope.isactive);
        }
    })
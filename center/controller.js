var sas = angular.module('SASController', ['ngRoute', 'btford.socket-io', 'datatables', 'ngDialog', 'angular-md5', 'chart.js']);
sas
    .controller('AuthCtrl', function ($location, $scope, $rootScope, ngDialog, $timeout, Notifi, DataServices, md5, Thesocket) {

        $scope.login = function () {
            if ($scope.username === undefined || $scope.username === '' || $scope.password === undefined || $scope.password === '') {
                Notifi._error('Please enter Username and Password');
                return;
            } else {
                // Notifi._loading();
                let pass = md5.createHash($scope.username + $scope.password);
                DataServices.signIn($scope.username, pass).then(function (repsonse) {
                    var data_result = repsonse.data;
                    if (data_result.error_code === 0) {
                        // $timeout(function () {
                        if (data_result.auth.Role[0].id === 0) {
                            // Notifi._close();
                            $rootScope.auth = data_result.auth;
                            localStorage.setItem('Auth', JSON.stringify(data_result.auth));
                            // Notifi._success('Đăng nhập thành công');
                            Thesocket.emit('connection');
                            $('#choose').modal('show');
                        }
                        if (data_result.auth.Role[0].id === 1) {
                            // Notifi._close();
                            $rootScope.auth = data_result.auth;
                            localStorage.setItem('Auth', JSON.stringify(data_result.auth));
                            // Notifi._success('Đăng nhập thành công');
                            Thesocket.emit('connection');

                            $location.path('/home');
                            $scope.$on('$locationChangeSuccess', () => {
                                window.location.reload(true);
                            });
                        } else if (data_result.auth.Role[0].id === 2) {
                            // Notifi._close();
                            $rootScope.auth = data_result.auth;
                            localStorage.setItem('Auth', JSON.stringify(data_result.auth));
                            // Notifi._success('Đăng nhập thành công');
                            Thesocket.emit('connection');
                            $location.path('/marketing');
                            $scope.$on('$locationChangeSuccess', () => {
                                window.location.reload(true);
                            });
                        }
                        // }, 1500);
                    }
                    if (data_result.error_code === 1) {
                        // $timeout(function () {
                        // Notifi._close();
                        Notifi._error('Có lỗi trong quá trình xử lý vui lòng thử lại.');
                        return;
                        // }, 1500)
                    }
                    if (data_result.error_code === 2) {
                        // $timeout(function () {
                        // Notifi._close();
                        Notifi._error('Username hoặc Password không chính xác.');
                        return;
                        // }, 1500)
                    }
                    if (data_result.error_code === 3) {
                        // $timeout(function () {
                        // Notifi._close();
                        Notifi._error('Tài khoản chưa được đăng ký.');
                        return;
                        // }, 1500)
                    }
                    if (data_result.error_code === 4) {
                        // $timeout(function () {
                        // Notifi._close();
                        Notifi._error('Tài khoản đang tạm khóa liên hệ Admin để kích hoạt.');
                        return;
                        // }, 1500)
                    }
                })

                //choose page
                $scope.choosepage = function (id) {
                    if (id === 1) {
                        $location.path('/home');
                        $scope.$on('$locationChangeSuccess', () => {
                            window.location.reload(true);
                        });
                    } else {
                        $location.path('/marketing');
                        $scope.$on('$locationChangeSuccess', () => {
                            window.location.reload(true);
                        });
                    }
                }
            }
        }
    })
    .controller('MenuCtrl', function ($location, $scope, $rootScope, $routeParams) {
        $rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
        if (!$rootScope.auth) {
            $location.path('/login');
        } else {
            var active = localStorage.getItem('isactive');
            var pid = localStorage.getItem('pid');
            if (active === null) {
                if ($rootScope.auth.Role[0].id === 2) {
                    $scope.isactive = 10;
                } else if ($rootScope.auth.Role[0].id === 1) {
                    $scope.isactive = 1;
                } else if ($rootScope.auth.Role[0].id === 0) {
                    if (window.location.href.includes('home')) {
                        $scope.pageId = 1;
                        localStorage.setItem('pid', $scope.pageId);
                        $scope.isactive = 1;
                    } else {
                        $scope.pageId = 2;
                        localStorage.setItem('pid', $scope.pageId);
                        $scope.isactive = 10;
                    }
                }
            } else {

                if ($rootScope.auth.Role[0].id === 0) {
                    if (window.location.href.includes('home')) {
                        $scope.pageId = parseInt(pid);
                        $scope.isactive = parseInt(active);
                    } else {
                        $scope.pageId = parseInt(pid);;
                        $scope.isactive = parseInt(active);
                    }
                } else {
                    $scope.isactive = parseInt(active);
                }
            }
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
            // alert('Trang đang hoàn thiện vui lòng quay lại sau.')
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

        // go scenter
        $scope.go_center = function () {
            $location.path('/scenter');

            $scope.isactive = 17;
            localStorage.setItem('isactive', $scope.isactive);
        }

        // go srating
        $scope.go_rating = function () {
            $location.path('/srating');

            $scope.isactive = 18;
            localStorage.setItem('isactive', $scope.isactive);
        }


        // makerting

        $scope.go_thongke = function () {
            $location.path('/marketing');

            $scope.isactive = 10;
            localStorage.setItem('isactive', $scope.isactive);
        }

        $scope.go_danhsach = function () {
            $location.path('/list');

            $scope.isactive = 11;
            localStorage.setItem('isactive', $scope.isactive);
        }

        $scope.go_doc = function () {
            $location.path('/doc');

            $scope.isactive = 12;
            localStorage.setItem('isactive', $scope.isactive);
        }

        $scope.go_hd = function () {
            $location.path('/tutorial');

            $scope.isactive = 13;
            localStorage.setItem('isactive', $scope.isactive);
        }

        $scope.go_msetup = function () {
            $location.path('/msetup');

            $scope.isactive = 14;
            localStorage.setItem('isactive', $scope.isactive);
        }

        $scope.go_mrating = function () {
            $location.path('/rating');

            $scope.isactive = 15;
            localStorage.setItem('isactive', $scope.isactive);
        }

        $scope.go_mcenter = function () {
            $location.path('/centers');

            $scope.isactive = 16;
            localStorage.setItem('isactive', $scope.isactive);
        }
    })
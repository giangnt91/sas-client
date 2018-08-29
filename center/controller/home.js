sas
    .controller('HomeCtrl', function ($location, $scope, $window, $timeout, Notifi) {

        // thay đổi mật khẩu
        $scope.changepass = function () {
            if ($scope.pass === undefined || $scope.pass === '') {
                Notifi._error('Please enter your password');
                return;
            } else {
                $scope.pass = '';
                $('#chagepas').modal('hide');
                alert('ok')
            }
        }

        // thoát tài khoản
        $scope.logout = function () {
            localStorage.clear();
            $location.path('/login');
        }
    })
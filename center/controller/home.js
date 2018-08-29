sas
    .controller('HomeCtrl', function ($location, $scope, $rootScope, Notifi, DataServices, md5) {
        // check exit user
        $rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
        if (!$rootScope.auth) {
            $location.path('/login');
        }
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

        // tạo tài khoản
        $scope.signup = function (data) {
            if (data === undefined ||
                data.uname === undefined ||
                data.uname === '' ||
                data.ufullname === undefined ||
                data.ufullname === '' ||
                data.uemail === undefined ||
                data.uemail === '' ||
                data.uphone === undefined ||
                data.uphone === '' ||
                data.urole === undefined ||
                data.urole === "Choose...") {
                Notifi._error('Nhập đầy đủ thông tin để tạo user.')
                return;
            } else {

                let pass = md5.createHash(data.uname + '12345678');
                var role;
                if (data.urole === '1') {
                    role = {
                        id: 1,
                        name: 'Telesale'
                    }
                } else {
                    role = {
                        id: 2,
                        name: 'Makerting'
                    }
                }
                DataServices.signUp(data.uname, pass, data.ufullname, data.uemail, data.uphone, role).then(function (response) {
                    if (response.data.error_code === 0) {
                        Notifi._success('Tài khoản được tạo thành công.')
                        data.uname = '';
                        data.ufullname = '';
                        data.uemail = '';
                        data.uphone = '';
                        data.urole = '';
                    } if (response.data.error_code === 1) {
                        Notifi._error('Có lỗi trong quá trình xử lý vui lòng thử lại.')
                    } if (response.data.error_code === 2) {
                        Notifi._error('Username đã tồn tại vui lòng thử lại.')
                        data.uname = '';
                    }
                })
            }
        }

        // thoát tài khoản
        $scope.logout = function () {
            localStorage.clear();
            $location.path('/login');
        }
    })
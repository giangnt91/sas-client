sas
    .controller('SetupCtrl', function ($location, DataServices, Notifi, $rootScope, $scope) {
        // check exit user
        $rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
        if (!$rootScope.auth) {
            $location.path('/login');
        } else {
            DataServices.GetallUser().then(function (repsonse) {
                if (repsonse.data.error_code === 0) {
                    $scope.users = repsonse.data.users;
                } else {
                    Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.')
                }
            });

            $scope.ChangeStatus = function (data, check) {
                DataServices.UpdateStatus(data._id, check).then(function (repsonse) {
                    if (repsonse.data.error_code === 0) {
                        Notifi._success('Cập nhật thông tin thành công');
                    } else {
                        Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.')
                    }
                })
            }

            $scope.Share = function (data) {
                DataServices.ShareStudent(data).then(function (repsonse) {
                    if (repsonse.data.error_code === 0) {
                        Notifi._success('Học viên đã được chuyển cho các Telesale còn lại');
                    } else if (repsonse.data.error_code === 3) {
                        Notifi._error('Telesale không còn học viên để chuyển');
                    }
                })
            }
        }
    })
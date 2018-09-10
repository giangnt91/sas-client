sas
    .controller('MlistCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket) {
        // check exit user
        $rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
        if (!$rootScope.auth) {
            $location.path('/login');
        } else {

            // lấy danh sách form từ danh sách user
            function getUsers() {
                DataServices.GetallUSerforGroup().then(function (repsonse) {
                    if (repsonse.data.error_code === 0) {
                        if (repsonse.data.users.length > 0) {
                            _result = repsonse.data.users;
                            $scope.Markets = [{
                                id: null,
                                name: 'Tất cả'
                            }];
                            _result.forEach(element => {
                                if (element.Role[0].id === 2 && element.SheetID !== null) {
                                    let tmp = {
                                        id: element.SheetID[0].id,
                                        name: element.SheetID[0].name
                                    }
                                    $scope.Markets.push(tmp);
                                }
                            });
                        }
                    } else {
                        // Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.')
                    }
                });
            }
            getUsers();

            // lấy danh sách học viên
            function get_null_query() {

                if ($rootScope.auth.Role[0].id !== 0) {
                    _mform = $rootScope.auth.SheetID[0].id;
                } else {
                    _mform = null;
                }

                DataServices.GetallQuery($rootScope.auth.Role, $rootScope.auth.Username, null, null, null, _mform).then(function (response) {
                    if (response.data.error_code === 0) {
                        $scope.all_students = response.data.student;

                        $scope.newdtOptions = DTOptionsBuilder.newOptions()
                            .withDisplayLength(10)
                            .withOption('bLengthChange', true)
                            .withOption('iDisplayLength', 10)
                            .withDOM('Zlfrtip')
                    }
                })
            }

            get_null_query();

            //filter theo ngày tháng và trạng thái, form
            $scope._status = [
                {
                    id: null,
                    name: 'Tất cả'
                },
                {
                    id: 1,
                    name: 'Online không trùng'
                },
                {
                    id: 2,
                    name: 'Đã đăng ký'
                },
                {
                    id: 3,
                    name: 'Trùng'
                },
                {
                    id: 4,
                    name: 'Không tiềm năng'
                }
            ]
            $scope.mstatus = $scope._status[0];
            $timeout(function () {
                $scope.mform = $scope.Markets[0];
            }, 500)


            $scope.Search_mk = function () {
                let _fromday = $('#mkday').val();
                let _today = $('#mkday2').val();
                let _mform;

                if (_fromday === '') {
                    _fromday = null
                }

                if (_today === '') {
                    _today = null
                }

                if ($rootScope.auth.Role[0].id !== 0) {
                    _mform = $rootScope.auth.SheetID[0].id;
                } else {
                    _mform = $scope.mform.id;
                }

                DataServices.GetallQuery($rootScope.auth.Role, $rootScope.auth.Username, _fromday, _today, $scope.mstatus.id, _mform).then(function (response) {
                    if (response.data.error_code === 0) {
                        $scope.all_students = response.data.student;

                        $scope.newdtOptions = DTOptionsBuilder.newOptions()
                            .withDisplayLength(10)
                            .withOption('bLengthChange', true)
                            .withOption('iDisplayLength', 10)
                            .withDOM('Zlfrtip')
                    }
                })

            }

            // xem chi tiết nhân viên
            $scope.view = function (data) {
                $scope._details = data;
                $('#mdetail').modal('show');
            }

        }

    })
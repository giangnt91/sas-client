sas
    .controller('MlistCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket) {
        // check exit user
        $rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
        if (!$rootScope.auth) {
            $location.path('/login');
        } else {

            // lấy danh sách học viên
            function get_null_query() {
                DataServices.GetallQuery($rootScope.auth.Role, $rootScope.auth.Username, null, null, null, null).then(function (response) {
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

            //filter theo ngày tháng và group
            $scope.Search_mk = function () {
                let _fromday = $('#mkday').val();
                let _today = $('#mkday2').val();
                let list_mk = [];
                if ($scope.mgroup.id !== null) {
                    $scope.Makertings.forEach(element => {
                        if ($scope.mgroup._id === element.Zone[0].id) {
                            list_mk.push(element);
                        }
                    });
                } else {
                    list_mk = $scope.Makertings;
                }

                if (_fromday === '') {
                    _fromday = null
                }

                if (_today === '') {
                    _today = null
                }

                $scope._Makerting = [];
                if ($scope.auth.Role[0].id === 0) {
                    list_mk.forEach(element => {
                        DataServices.GettqMakert($rootScope.auth.Role, element.Username, element.Fullname, null, null).then(function (response) {
                            if (response.data.error_code === 0) {
                                $scope._Makerting.push(response.data.mkt);
                            }
                        })
                    });
                } else {
                    DataServices.GettqMakert($rootScope.auth.Role, $rootScope.auth.Username, $rootScope.auth.Fullname, null, null).then(function (response) {
                        if (response.data.error_code === 0) {
                            $scope._Makerting.push(response.data.mkt);
                        }
                    })
                }

            }

            // xem chi tiết nhân viên
            $scope.view = function (data) {
                $scope._details = data;
                $('#mdetail').modal('show');
            }

        }

    })
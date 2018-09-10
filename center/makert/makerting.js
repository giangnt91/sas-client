sas
    .controller('MakertingCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket) {
        // check exit user
        $rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
        if (!$rootScope.auth) {
            $location.path('/login');
        } else {
            function getAllmakert() {
                DataServices.GetallMakerting().then(function (response) {
                    if (response.data.error_code === 0) {
                        $scope.Makertings = response.data.makert;
                        $scope._Makerting = [];
                        if ($scope.auth.Role[0].id === 0) {
                            $scope.Makertings.forEach(element => {
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

                        $scope.newdtOptions = DTOptionsBuilder.newOptions()
                            .withDisplayLength(10)
                            .withOption('bLengthChange', true)
                            .withOption('iDisplayLength', 10)
                            .withDOM('Zlfrtip')
                    }
                })
            }
            getAllmakert();

            // lấy tất cả các group
            function Getallgroup() {
                DataServices.GetallGgroup().then(function (response) {
                    if (response.data.error_code === 0) {
                        $scope.AllGroups = [{
                            id: null,
                            Name: 'Chọn'
                        }];
                        $scope.mgroup = $scope.AllGroups[0];
                        response.data.groups.forEach(element => {
                            if (element.Gtype[0].id === 2) {
                                $scope.AllGroups.push(element);
                            }
                        });
                    }
                })
            }
            Getallgroup();

            // thông báo trùng
            Thesocket.on('mkduplicate', function (list_duplicate) {

                var last_id = localStorage.getItem('last_id');
                list_duplicate.forEach(element => {
                    if (element.mketer === $rootScope.auth.Username) {
                        localStorage.setItem('last_id', element.mketer);
                        if (last_id !== element.mketer) {
                            Notifi._notifi(
                                'Học viên ' + element.student + '<br> có số điện thoại ' + element.stphone + '<br> đã được đăng ký vào lúc ' + element.pretime + ' <br> bởi ' + element.premname + ' có username ' + element.premid
                            )
                        }
                    }
                });
            })
            //


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


        }

    })
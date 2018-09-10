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

            function tongquan() {
                getAllmakert();

                let _fromday = $('#mkday').val();
                let _today = $('#mkday2').val();

                if (_fromday === '') {
                    _fromday = null
                }

                if (_today === '') {
                    _today = null
                }

                $scope.tbMakerting = [];
                $scope.Makertings.forEach(element => {
                    DataServices.GettqMakert(element.Username, _fromday, _today).then(function (response) {
                        if (response.data.error_code === 0) {
                            $scope.tbMakerting.push(response.data.mk);

                            $scope.newdtOptions = DTOptionsBuilder.newOptions()
                                .withDisplayLength(10)
                                .withOption('bLengthChange', true)
                                .withOption('iDisplayLength', 10)
                                .withDOM('Zlfrtip')
                        }
                    })
                });
            }
            $timeout(function () {
                tongquan();
            }, 500)

        }
    })
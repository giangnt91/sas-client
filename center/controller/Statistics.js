sas
    // Optional configuration
    .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            chartColors: ['#00BCD4', '#F44336', '#9C27B0', '#FF9800'],
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                }]
            },
            legend: { display: true }
        });
        // Configure all line charts
        ChartJsProvider.setOptions('line', {
            showLines: false
        });
    }])
    .controller('StatisticsCtrl', function ($scope, $rootScope, $timeout, DataServices, Notifi) {
        // lấy danh sách user
        function getUsers() {
            // lấy danh sách user
            DataServices.GetallUser().then(function (repsonse) {
                if (repsonse.data.error_code === 0) {
                    if (repsonse.data.users.length > 0) {
                        $scope.users = repsonse.data.users;
                    }
                } else {
                    Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.')
                }
            });
        }

        // check exit user
        $rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
        if (!$rootScope.auth) {
            $location.path('/login');
        } else {
            getUsers();
            $scope.isactive = 1;

            if ($scope.isactive === 1) {
                $scope.labels1 = [];
                var dataOn = [];
                var dataOut = [];
                var dataIn = [];
                var dataFriend = [];

                $timeout(function () {
                    $scope.users.forEach(element => {
                        DataServices.GetforchartDefault(element.Username, null, null).then(function (res) {
                            if (res.data.error_code === 0) {
                                var _result = res.data.student;
                                if (_result.length > 0) {
                                    dataOn.push(_result[0].On.length);
                                    dataIn.push(_result[0].In.length);
                                    dataOut.push(_result[0].Out.length);
                                    dataFriend.push(_result[0].Fri.length);
                                }
                            }
                        })
                        $scope.labels1.push(element.Fullname);
                    });

                    $scope.data = [
                        dataOn,
                        dataOut,
                        dataIn,
                        dataFriend
                    ];
                    $scope.series = ['Online', 'Out', 'In', 'Friend'];
                }, 500)

            }

            // lọc theo ngày
            $scope.fillbyday = function () {
                getUsers();
                let _fromday = $('#fromd').val();
                let _today = $('#tod').val();

                if (_fromday === '') {
                    _fromday = null
                }

                if (_today === '') {
                    _today = null
                }

                //Kiểm tra isactive để lọc dữ liệu
                switch ($scope.isactive) {
                    case 2:
                        $scope.labels2 = [];
                        var notcall = [];
                        $scope.users.forEach(element => {

                            DataServices.GetforchartNotcall(element.Username, _fromday, _today).then(function (res) {
                                if (res.data.error_code === 0) {
                                    var _result = res.data.notcall;
                                    notcall.push(_result.length);
                                }
                            })
                            $scope.labels2.push(element.Fullname);
                        });

                        $scope.data2 = [
                            notcall
                        ];
                        $scope.series2 = ['Chưa gọi'];
                        break;
                    case 3:
                        $scope.labels3 = [];
                        var relcall = [];
                        $scope.users.forEach(element => {

                            DataServices.GetforchartRecall(element.Username, _fromday, _today).then(function (res) {
                                if (res.data.error_code === 0) {
                                    var _result = res.data.recall;
                                    relcall.push(_result.length);
                                }
                            })
                            $scope.labels3.push(element.Fullname);
                        });

                        $scope.data3 = [
                            relcall
                        ];
                        $scope.series3 = ['Gọi lại'];
                        break;
                    case 4:
                        $scope.tl = [];
                        $scope.users.forEach(element => {
                            DataServices.Gettl(element.Username, _fromday, _today).then(function (res) {
                                if (res.data.error_code === 0) {
                                    var _result = res.data.tl;
                                    $scope.tl.push(_result);
                                }
                            })
                        });

                        break;
                    case 5:
                        var hcd = [];
                        $scope.labels5 = [];
                        $scope.users.forEach(element => {

                            DataServices.GetforchartHcd(element.Username, _fromday, _today).then(function (res) {
                                if (res.data.error_code === 0) {
                                    var _result = res.data.hcd;
                                    hcd.push(_result.length);
                                }
                            })
                            $scope.labels5.push(element.Fullname);
                        });

                        $scope.data5 = [
                            hcd
                        ];
                        $scope.series5 = ['Hẹn chưa đến'];
                        break;
                    case 6:
                        var dcdk = [];
                        $scope.labels6 = [];
                        $scope.users.forEach(element => {

                            DataServices.GetforchartDcdk(element.Username, _fromday, _today).then(function (res) {
                                if (res.data.error_code === 0) {
                                    var _result = res.data.dcdk;
                                    dcdk.push(_result.length);
                                }
                            })
                            $scope.labels6.push(element.Fullname);
                        });

                        $scope.data6 = [
                            dcdk
                        ];
                        $scope.series6 = ['Đến chưa đăng ký'];
                        break;
                    case 7:
                        var cdk = [];
                        $scope.labels7 = [];
                        $scope.users.forEach(element => {

                            DataServices.GetforchartCdk(element.Username, _fromday, _today).then(function (res) {
                                if (res.data.error_code === 0) {
                                    var _result = res.data.cdk;
                                    cdk.push(_result.length);
                                }
                            })
                            $scope.labels7.push(element.Fullname);
                        });

                        $scope.data7 = [
                            cdk
                        ];
                        $scope.series7 = ['Chưa đăng ký'];
                        break;
                    case 8:
                        var ktn = [];
                        $scope.labels8 = [];
                        $scope.users.forEach(element => {

                            DataServices.GetforchartKtn(element.Username, _fromday, _today).then(function (res) {
                                if (res.data.error_code === 0) {
                                    var _result = res.data.ktn;
                                    ktn.push(_result.length);
                                }
                            })
                            $scope.labels8.push(element.Fullname);
                        });

                        $scope.data8 = [
                            ktn
                        ];
                        $scope.series8 = ['Không tiềm năng'];
                        break;
                    case 9:
                        $scope.lh = [];
                        $scope.users.forEach(element => {
                            DataServices.Getlh(element.Username, _fromday, _today).then(function (res) {
                                if (res.data.error_code === 0) {
                                    var _result = res.data.lh;
                                    $scope.lh.push(_result);
                                }
                            })
                        });
                        break;
                    default:
                        $scope.labels1 = [];
                        var dataOn = [];
                        var dataOut = [];
                        var dataIn = [];
                        var dataFriend = [];
                        $scope.users.forEach(element => {
                            DataServices.GetforchartDefault(element.Username, _fromday, _today).then(function (res) {
                                if (res.data.error_code === 0) {
                                    var _result = res.data.student;
                                    if (_result.length > 0) {
                                        dataOn.push(_result[0].On.length);
                                        dataIn.push(_result[0].In.length);
                                        dataOut.push(_result[0].Out.length);
                                        dataFriend.push(_result[0].Fri.length);
                                    }
                                }
                            })
                            $scope.labels1.push(element.Fullname);
                        });

                        $scope.data = [
                            dataOn,
                            dataOut,
                            dataIn,
                            dataFriend
                        ];
                        $scope.series = ['Online', 'Out', 'In', 'Friend'];
                }

            }

            // tổng quan
            $scope.tq = function () {
                $scope.isactive = 1;
            }

            // chưa gọi
            $scope.cg = function () {
                getUsers();
                $scope.isactive = 2;

                $scope.labels2 = [];
                var notcall = [];
                $timeout(function () {
                    $scope.users.forEach(element => {

                        DataServices.GetforchartNotcall(element.Username, null, null).then(function (res) {
                            if (res.data.error_code === 0) {
                                var _result = res.data.notcall;
                                if (_result.length > 0) {
                                    notcall.push(_result.length);
                                }
                            }
                        })
                        $scope.labels2.push(element.Fullname);
                    });

                    $scope.data2 = [
                        notcall
                    ];
                    $scope.series2 = ['Chưa gọi'];
                }, 500)
            }

            // gọi lại
            $scope.gl = function () {
                getUsers();
                $scope.isactive = 3;
                $scope.labels3 = [];
                var relcall = [];
                $timeout(function () {
                    $scope.users.forEach(element => {

                        DataServices.GetforchartRecall(element.Username, null, null).then(function (res) {
                            if (res.data.error_code === 0) {
                                var _result = res.data.recall;
                                relcall.push(_result.length);
                            }
                        })
                        $scope.labels3.push(element.Fullname);
                    });

                    $scope.data3 = [
                        relcall
                    ];
                    $scope.series3 = ['Gọi lại'];
                }, 500)

            }

            // tỷ lệ
            $scope._tl = function () {
                $scope.isactive = 4;

                $scope.tl = [];
                $scope.users.forEach(element => {
                    DataServices.Gettl(element.Username, null, null).then(function (res) {
                        if (res.data.error_code === 0) {
                            var _result = res.data.tl;
                            $scope.tl.push(_result);
                        }
                    })
                });
            }

            // hẹn chưa đến
            $scope.hcd = function () {
                $scope.isactive = 5;
                getUsers();

                $scope.labels5 = [];
                var hcd = [];
                $timeout(function () {
                    $scope.users.forEach(element => {

                        DataServices.GetforchartHcd(element.Username, null, null).then(function (res) {
                            if (res.data.error_code === 0) {
                                var _result = res.data.hcd;
                                hcd.push(_result.length);
                            }
                        })
                        $scope.labels5.push(element.Fullname);
                    });

                    $scope.data5 = [
                        hcd
                    ];
                    $scope.series5 = ['Hẹn chưa đến'];
                }, 500)
            }

            // đến chưa đăng ký
            $scope.dcdk = function () {
                $scope.isactive = 6;
                getUsers();

                var dcdk = [];
                $scope.labels6 = [];
                $timeout(function () {
                    $scope.users.forEach(element => {

                        DataServices.GetforchartDcdk(element.Username, null, null).then(function (res) {
                            if (res.data.error_code === 0) {
                                var _result = res.data.dcdk;
                                dcdk.push(_result.length);
                            }
                        })
                        $scope.labels6.push(element.Fullname);
                    });

                    $scope.data6 = [
                        dcdk
                    ];
                    $scope.series6 = ['Đến chưa đăng ký'];
                }, 500)
            }

            // chưa đăng ký
            $scope.cdk = function () {
                $scope.isactive = 7;

                getUsers();

                var cdk = [];
                $scope.labels7 = [];
                $timeout(function () {
                    $scope.users.forEach(element => {

                        DataServices.GetforchartCdk(element.Username, null, null).then(function (res) {
                            if (res.data.error_code === 0) {
                                var _result = res.data.cdk;
                                cdk.push(_result.length);
                            }
                        })
                        $scope.labels7.push(element.Fullname);
                    });

                    $scope.data7 = [
                        cdk
                    ];
                    $scope.series7 = ['Chưa đăng ký'];
                }, 500)
            }

            // không tiềm năng
            $scope.ktn = function () {
                $scope.isactive = 8;

                getUsers();

                var ktn = [];
                $scope.labels8 = [];
                $timeout(function () {
                    $scope.users.forEach(element => {

                        DataServices.GetforchartKtn(element.Username, null, null).then(function (res) {
                            if (res.data.error_code === 0) {
                                var _result = res.data.ktn;
                                ktn.push(_result.length);
                            }
                        })
                        $scope.labels8.push(element.Fullname);
                    });

                    $scope.data8 = [
                        ktn
                    ];
                    $scope.series8 = ['Không tiềm năng'];
                }, 500)
            }

            // lịch hẹn
            $scope._lh = function () {
                $scope.isactive = 9;

                getUsers();

                $scope.lh = [];
                $timeout(function () {
                    $scope.users.forEach(element => {
                        DataServices.Getlh(element.Username, null, null).then(function (res) {
                            if (res.data.error_code === 0) {
                                var _result = res.data.lh;
                                $scope.lh.push(_result);
                            }
                        })
                    });
                }, 500)
            }
        }
    })
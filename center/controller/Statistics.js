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
        // cập nhật ngày tháng
        function convertup(x) {
            var parts = x.split("-");
            return parts[2] + '/' + parts[1] + '/' + parts[0];
        }
        // check exit user
        $rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
        if (!$rootScope.auth) {
            $location.path('/login');
        } else {
            // lấy danh sách user
            DataServices.GetallUser().then(function (repsonse) {
                if (repsonse.data.error_code === 0) {
                    if (repsonse.data.users.length > 0) {
                        $scope.users = repsonse.data.users;
                        $scope.labels1 = [];
                        var dataOn = [];
                        var dataOut = [];
                        var dataIn = [];
                        var dataFriend = [];

                        $scope.users.forEach(element => {

                            DataServices.GetforcharDefault(element.Username, null, null).then(function (res) {
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
                } else {
                    Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.')
                }
            });

            $scope.isactive = 1;

            // lọc theo ngày
            $scope.fillbyday = function () {
                let _fromday = $('#fromd').val();
                let _today = $('#tod').val();

                if (_fromday === '') {
                    _fromday = null
                } else {
                    _fromday = convertup(_fromday);
                }

                if (_today === '') {
                    _today = null
                } else {
                    _today = convertup(_today)
                }

                $scope.labels1 = [];
                var dataOn = [];
                var dataOut = [];
                var dataIn = [];
                var dataFriend = [];

                $scope.users.forEach(element => {

                    DataServices.GetforcharDefault(element.Username, _fromday, _today).then(function (res) {
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

            }

            // tổng quan
            $scope.tq = function () {
                $scope.isactive = 1;

            }

            // chưa gọi
            $scope.cg = function () {
                $scope.isactive = 2;
            }

            // gọi lại
            $scope.gl = function () {
                $scope.isactive = 3;
            }

            // tỷ lệ
            $scope.tl = function () {
                $scope.isactive = 4;
            }

            // hẹn chưa đến
            $scope.hcd = function () {
                $scope.isactive = 5;
            }

            // đến chưa đăng ký
            $scope.dcdk = function () {
                $scope.isactive = 6;
            }

            // chưa đăng ký
            $scope.cdk = function () {
                $scope.isactive = 7;
            }

            // không tiềm năng
            $scope.ktn = function () {
                $scope.isactive = 8;
            }

            // hủy
            $scope.h = function () {
                $scope.isactive = 9;
            }

            // lịch hẹn
            $scope.lh = function () {
                $scope.isactive = 10;
            }

            // cá nhân
            $scope.cn = function () {
                $scope.isactive = 11;
            }
        }
    })
sas
    // Optional configuration
    .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            chartColors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD'],
            responsive: false
        });
        // Configure all line charts
        ChartJsProvider.setOptions('line', {
            showLines: false
        });
    }])
    .controller('StatisticsCtrl', function ($scope, $timeout) {

        $scope.isactive = 1;
        $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Series A', 'Series B'];

        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];

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
    })
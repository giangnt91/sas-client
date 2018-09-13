sas
    .controller('MsetupCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket) {
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
                            $scope.Markets = [];
                            if ($rootScope.auth.Role[0].id === 0) {
                                _result.forEach(element => {
                                    if (element.Role[0].id === 2 && element.SheetID !== null) {
                                        if (element.SheetID.length > 0) {
                                            $scope.Markets.push(element);
                                        }
                                    }
                                });
                            } else {
                                _result.forEach(element => {
                                    if (element.Username === $rootScope.auth.Username && element.SheetID !== null) {
                                        if (element.SheetID.length > 0) {
                                            $scope.Markets.push(element);
                                        }
                                    }
                                });
                            }

                        }
                    } else {
                        // Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.')
                    }
                });
            }
            getUsers();

            $scope.createForm = function (data) {
                if (data === undefined || data.formname === undefined || data.formname === '' || data.spreadsheet === undefined || data.spreadsheet === '') {
                    Notifi._error('Vui lòng nhập tên form và id spreadsheet để tạo form');
                    return
                } else {

                    let urlads;
                    let fnote;
                    if (data.urlads !== undefined && data.urlads !== '') {
                        urlads = data.urlads;
                    } else {
                        urlads = null;
                    }

                    if (data.fnote !== '' && data.fnote !== undefined) {
                        fnote = data.fnote;
                    } else {
                        fnote = null;
                    }

                    if ($rootScope.auth.SheetID === null) {
                        $rootScope.auth.SheetID = [{
                            name: data.formname,
                            id: data.spreadsheet,
                            urlads: urlads,
                            note: fnote,
                            isready: true
                        }]
                    } else {
                        let _tmp = {
                            name: data.formname,
                            id: data.spreadsheet,
                            urlads: urlads,
                            note: fnote,
                            isready: true
                        }

                        $rootScope.auth.SheetID.push(_tmp);
                    }


                    DataServices.UpdateUser($rootScope.auth).then(function (response) {
                        if (response.data.error_code === 0) {
                            getUsers();
                            Notifi._success('Tạo Form thành công');
                            $('#addform').modal('hide');
                            data.formname = '';
                            data.spreadsheet = '';
                            data.urlads = '';
                            data.fnote = '';
                        } else {
                            Notifi._error('Có lỗi trong quá trình xử lý vui lòng thử lại');
                        }
                    })
                }
            }

            $scope.ChangeSheet = function (data, check, _detail) {
                if (check === undefined) {
                    check = false;
                }

                _detail.SheetID.forEach(element => {
                    if (data.name === element.name) {
                        if (check === false) {
                            element.isready = false;
                        } else {
                            element.isready = true;
                        }
                    }
                });

                $scope._detail = angular.fromJson(angular.toJson(_detail));
                DataServices.UpdateUser($scope._detail).then(function (response) {
                    if (response.data.error_code === 0) {
                        getUsers();
                        Notifi._success('Cập nhật trạng thái thành công');
                        $('#upform').modal('hide');
                    } else {
                        Notifi._error('Có lỗi trong quá trình xử lý vui lòng thử lại');
                    }
                })
            }

            // cập nhật form
            $scope.show_form = function (sheet, _detail) {
                $scope._detail = _detail;
                $scope._sheet = sheet;
                $('#upform').modal('show');
            }

            $scope.Updateform = function (data) {
                $scope._detail.SheetID.forEach(element => {
                    if (data.name === element.name) {
                        element = data;
                    }
                });
                $scope._detail = angular.fromJson(angular.toJson($scope._detail));

                DataServices.UpdateUser($scope._detail).then(function (response) {
                    if (response.data.error_code === 0) {
                        getUsers();
                        Notifi._success('Cập nhật Form thành công');
                        $('#upform').modal('hide');
                    } else {
                        Notifi._error('Có lỗi trong quá trình xử lý vui lòng thử lại');
                    }
                })
            }

        }
    })
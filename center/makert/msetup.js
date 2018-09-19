sas
    .controller('MsetupCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket) {
        // check exit user
        $rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
        if (!$rootScope.auth) {
            $location.path('/login');
        } else {

            // lấy tất cả các group
            function Getallgroup() {
                DataServices.GetallGgroup().then(function (response) {
                    if (response.data.error_code === 0) {
                        $scope.AllGroups = response.data.groups;
                    }
                })
            }
            Getallgroup();

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
                            DataServices.withOut($rootScope.auth._id).then(function (res) {
                                if (res.data.error_code === 0) {
                                    $rootScope.auth = res.data.user;
                                    localStorage.setItem('Auth', JSON.stringify(res.data.user));
                                }
                            });
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

                $scope.AllGroups.forEach(element => {
                    if (element.Sheet !== null) {
                        element.Sheet.forEach(el => {
                            if (el.muser === $scope._detail.Username) {
                                $scope._detail_group = element;
                            }
                        });
                    }
                });

                var _notexit = false;
                if ($scope._detail_group !== undefined) {
                    $scope._detail_group.Sheet.forEach(function (sheet, index) {
                        if (sheet.muser === $scope._detail.Username && sheet.sheetname === data.name) {
                            if (check === false) {
                                $scope._detail_group.Sheet.splice(index, 1);
                            } else {
                                sheet.id = data.id
                            }
                        } else {
                            _notexit = true;
                        }
                    });
                }

                if (_notexit === true) {
                    if (check === true) {
                        let tmp = {
                            name: $scope._detail.Fullname,
                            muser: $scope._detail.Username,
                            id: data.id,
                            sheetname: data.name,
                            isready: check,
                            group: $scope._detail_group.Name
                        }
                        $scope._detail_group.Sheet.push(tmp);
                    }
                }

                DataServices.UpdateUser($scope._detail).then(function (response) {
                    if (response.data.error_code === 0) {
                        if ($scope._detail_group !== undefined) {
                            DataServices.UpGroup($scope._detail_group).then(function (repsonse) { });
                        }

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

                $scope._detail_group = [];
                $scope.AllGroups.forEach(element => {
                    if (element.Sheet !== null) {
                        element.Sheet.forEach(el => {
                            if (el.muser === $scope._detail.Username) {
                                $scope._detail_group.push(element);
                            }
                        });
                    }
                });

                if ($scope._detail_group !== undefined) {
                    $scope._detail_group.forEach(element => {
                        element.Sheet.forEach(sheet => {
                            if (sheet.muser === $scope._detail.Username && sheet.sheetname === data.name) {
                                sheet.id = data.id
                            }
                        });
                    });

                }

                DataServices.UpdateUser($scope._detail).then(function (response) {
                    if (response.data.error_code === 0) {
                        if ($scope._detail_group !== undefined) {
                            if ($scope._detail_group.length > 0) {
                                $scope._detail_group.forEach(element => {
                                    DataServices.UpGroup(element).then(function (repsonse) { });
                                })
                            }
                        }

                        DataServices.withOut($rootScope.auth._id).then(function (res) {
                            if (res.data.error_code === 0) {
                                $rootScope.auth = res.data.user;
                                localStorage.setItem('Auth', JSON.stringify(res.data.user));
                            }
                        });
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
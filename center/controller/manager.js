sas
    .controller('ManagerUserCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket) {
        // check exit user
        $rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
        if (!$rootScope.auth) {
            $location.path('/login');
        } else {

            // lấy danh user marketing
            function getUsersMK() {
                DataServices.GetallUSerforGroup().then(function (response) {
                    if (response.data.error_code === 0) {
                        var _result = response.data.users;
                        if (_result.length > 0) {
                            $scope.UsersMK = [];
                            _result.forEach(element => {
                                if (element.Role[0].id === 2) {
                                    $scope.UsersMK.push(element);
                                }
                            });
                        }
                    }
                })
            }
            getUsersMK();

            // view detail makert
            $scope.getdetailmakert = function () {
                // lấy leader name
                $scope.AllGroups.forEach(element => {
                    if (element._id === $rootScope.auth.Zone[0].id) {
                        $scope._lead = element.Leader[0].name;
                    }
                });

                $('#gdetailmakerting').modal('show');
            }

            $scope.cn = false;
            $scope.hide = function () {
                $scope.cn = true;
            }

            // view detail telesale
            $scope.getdetailtele = function () {
                $scope.AllGroups.forEach(element => {
                    if (element._id === $rootScope.auth.Zone[0].id) {
                        $scope._detailGroup = element;
                    }
                });


                //lấy danh sách các user makerting có sheetid
                $scope.Sheeter = [];
                $scope.UsersMK.forEach(element => {
                    if (element.SheetID !== null && element.SheetID[0].isready === true) {
                        $scope.Sheeter.push(element);
                    }
                });

                // lấy danh sách các group có makerting cho sheetid
                $scope.Groupter = [];
                $scope.UsersMK.forEach(element => {
                    if (element.SheetID !== null && element.SheetID[0].isready === true) {
                        $scope.AllGroups.forEach(gelement => {
                            if (gelement._id === element.Zone[0].id) {
                                if ($scope.Groupter.length > 0) {
                                    $scope.Groupter.forEach(el => {
                                        if (el._id !== element.Zone[0].id) {
                                            $scope.Groupter.push(gelement);
                                        }
                                    });
                                } else {
                                    $scope.Groupter.push(gelement);
                                }
                            }
                        });
                    }
                });

                $('#gdetail').modal('show');
            }

            // cập nhật link sheet cho group của tele

            // lấy danh sách các makerter dc chọn
            $scope.Makerts = [];
            $scope.ChangeCheckMk = function (data, check) {
                if (check === true) {
                    $scope.Makerts.push(data)
                } else {
                    $scope.Makerts.forEach(function (element, index) {
                        if (element._id === data._id) {
                            $scope.Makerts.splice(index, 1);
                        }
                    });
                }
            }

            // lấy danh sách các group được chọn
            $scope.Groupmk = [];
            $scope.ChangeCheckGMk = function (data, check) {
                if (check === true) {
                    $scope.Groupmk.push(data)
                } else {
                    $scope.Groupmk.forEach(function (element, index) {
                        if (element._id === data._id) {
                            $scope.Groupmk.splice(index, 1);
                        }
                    });
                }
            }


            // cập nhật sheet list cho group telesale
            $scope.UpdateSheetForGroup = function () {
                let Sheet_list = [];
                if ($scope.Makerts.length > 0) {
                    $scope.Makerts.forEach(element => {
                        let tmp = {
                            name: element.Fullname,
                            id: element.SheetID[0].id,
                            group: null
                        }
                        Sheet_list.push(tmp);
                    });
                }

                if ($scope.Groupmk.length > 0) {
                    $scope.Groupmk.forEach(g => {
                        $scope.Sheeter.forEach(s => {
                            if (s.Zone[0].id === g._id) {
                                let tmp = {
                                    name: s.Fullname,
                                    id: s.SheetID[0].id,
                                    group: g.Name
                                }
                                Sheet_list.push(tmp);
                            }
                        });
                    });
                }

                $scope._detailGroup.Sheet = Sheet_list;

                DataServices.UpGroup($scope._detailGroup).then(function (response) {
                    if (response.data.error_code === 0) {
                        Notifi._success('Cập nhật thông tin thành công');
                    } else {
                        Notifi._error('Có lỗi trong quá trình xử lý vui lòng thử lại sau');
                    }
                })
            }

            // lấy tất cả các group
            function Getallgroup() {
                DataServices.GetallGgroup().then(function (response) {

                    if (response.data.error_code === 0) {
                        $scope.AllGroups = response.data.groups;
                    }
                })
            }
            Getallgroup();

            // lấy danh sách user
            function getUsers() {
                DataServices.GetUserforGroup($rootScope.auth.Zone[0].id, $rootScope.auth.Role).then(function (response) {
                    if (response.data.error_code === 0) {
                        $scope.Users = response.data.users;
                    }
                })
            }
            getUsers();

            $scope._Role = [
                {
                    id: null,
                    value: 'Chọn'
                },
                {
                    id: 1,
                    value: 'Telesale'
                },
                {
                    id: 2,
                    value: 'Marketing'
                }
            ]


            // tạo tài khoản
            $scope.mrole = $scope._Role[0];

            $scope.getgroupforrole = function () {
                $scope.GroupSignup = [];
                if ($scope.mrole.id !== null) {
                    if ($scope.mrole.id === 1) {
                        $scope.AllGroups.forEach(element => {
                            if (element.Gtype[0].id === 1) {
                                $scope.GroupSignup.push(element);
                            }
                        });
                    } else {
                        $scope.AllGroups.forEach(element => {
                            if (element.Gtype[0].id === 2) {
                                $scope.GroupSignup.push(element);
                            }
                        });
                    }
                }
            }

            $scope.signup = function (data) {
                var mday = $('#mday').val();
                if ($rootScope.auth.Role[0].id !== 0) {
                    $scope.mrole = $rootScope.auth.Role[0];
                    $scope.mgroup = {
                        _id: $rootScope.auth.Zone[0].id,
                        Name: $rootScope.auth.Zone[0].name,
                        Gtype: $rootScope.auth.Zone[0].Gtype
                    };
                }

                if (data === undefined ||
                    data.musername === undefined ||
                    data.musername === '' ||
                    data.mfullname === undefined ||
                    data.mfullname === '' ||
                    data.memail === undefined ||
                    data.memail === '' ||
                    data.mphone === undefined ||
                    data.mphone === '' ||
                    mday === '' ||
                    $scope.mrole.id === null ||
                    $scope.mgroup === undefined ||
                    $scope.mgroup === null
                ) {
                    Notifi._error('Nhập đầy đủ thông tin để tạo user.')
                    return;
                } else {

                    let pass = md5.createHash(data.musername + '12345678');
                    var role;
                    let zone;

                    if ($scope.mrole.id === 1) {
                        role = {
                            id: 1,
                            name: 'Telesale'
                        }
                    } else {
                        role = {
                            id: 2,
                            name: 'Makerting'
                        }
                    }

                    zone = {
                        id: $scope.mgroup._id,
                        name: $scope.mgroup.Name,
                        Gtype: $scope.mgroup.Gtype
                    }

                    DataServices.signUp(data.musername, pass, data.mfullname, data.memail, data.mphone, mday, role, zone).then(function (response) {
                        if (response.data.error_code === 0) {
                            getUsers();
                            Notifi._success('Tài khoản được tạo thành công.')
                            data.musername = '';
                            data.mfullname = '';
                            data.memail = '';
                            data.mphone = '';
                            $scope.mrole = $scope._Role[0];
                            $scope.mgroup = '';
                            $('#mday').val(null);
                        } if (response.data.error_code === 1) {
                            Notifi._error('Có lỗi trong quá trình xử lý vui lòng thử lại.')
                        } if (response.data.error_code === 2) {
                            Notifi._error('Username đã tồn tại vui lòng thử lại.')
                            data.uname = '';
                        }
                    })
                }
            }

            $scope.changeforupdate = function () {
                $scope.GroupUpdate = [];
                if ($scope.uprole.id !== null) {
                    if ($scope.uprole.id === 1) {
                        $scope.AllGroups.forEach(element => {
                            if (element.Gtype[0].id === 1) {
                                $scope.GroupUpdate.push(element);
                            }
                        });
                    } else {
                        $scope.AllGroups.forEach(element => {
                            if (element.Gtype[0].id === 2) {
                                $scope.GroupUpdate.push(element);
                            }
                        });
                    }
                }
            }

            // Sửa thông tin user
            $scope.OpeneditUser = function (detail) {
                $('#upday').val(detail.Birthday);
                $scope._Role.forEach(element => {
                    if (element.id === detail.Role[0].id) {
                        $scope.uprole = element;

                        $scope.changeforupdate();
                    }
                });
                $scope.AllGroups.forEach(element => {
                    if (element._id === detail.Zone[0].id) {
                        $scope.mgroup = element;
                    }
                });
                $scope._detail = detail;
                $('#updateuser').modal('show');
            }

            $scope.UpdateUser = function (detail) {
                let bday = $('#upday').val();
                let _role;
                if (bday !== '') {
                    detail.Birthday = bday;
                }
                if ($scope.uprole.id !== detail.Role[0].id) {
                    if ($scope.uprole.id !== null) {
                        _role = [{
                            id: $scope.uprole.id,
                            name: $scope.uprole.value
                        }]
                        detail.Role = _role;
                    }
                }

                if ($scope.mgroup !== null) {
                    if ($scope.mgroup._id !== detail.Zone[0].id) {
                        detail.Zone = [{
                            id: $scope.mgroup._id,
                            name: $scope.mgroup.Name,
                            Gtype: $scope.mgroup.Gtype
                        }]
                    }
                }

                DataServices.UpdateUser(detail).then(function (response) {
                    if (response.data.error_code === 0) {
                        getUsers();
                        Notifi._success('Cập nhật thông tin thành công');
                    } else {
                        Notifi._error('Có lỗi trong quá trình xử lý vui lòng thử lại');
                    }
                })
            }

            // xóa user
            $scope.Opendel = function (deluser) {
                $scope.deluser = deluser;
                $('#deluser').modal('show');
            }

            $scope.Del = function (_id) {
                DataServices.DeleteUser(_id).then(function (response) {
                    if (response.data.error_code === 0) {
                        getUsers();
                        $('#deluser').modal('hide');
                        Notifi._success('Xóa User thành công');
                    } else {
                        Notifi._error('Có lỗi trong quá trình xử lý dữ liệu vui lòng thử lại');
                    }
                })
            }

            // reset mật khẩu mặc định
            $scope.OpenReset = function (ruser) {
                $scope.ruser = ruser;
                $('#reuser').modal('show');
            }

            $scope.Re = function (_user) {
                let _newpass = md5.createHash(_user.Username + '12345678');
                DataServices.Resetpass(_user._id, _newpass).then(function (response) {
                    if (response.data.error_code === 0) {
                        getUsers();
                        Notifi._success('Mật khẩu được cập nhật thành công');
                        $('#reuser').modal('hide');
                    } else {
                        Notifi._error('Có lỗi trong quá trình xử lý dữ liệu vui lòng thử lại');
                    }
                })
            }

        }
    })

    .controller('ManagerGroupCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket) {
        function getUsers() {
            DataServices.GetallUSerforGroup().then(function (response) {
                if (response.data.error_code === 0) {
                    var _result = response.data.users;
                    if (_result.length > 0) {
                        $scope.Users = [];
                        _result.forEach(element => {
                            if (element.Role[0].id !== 0) {
                                let user = {
                                    id: element.Username,
                                    name: element.Fullname,
                                    role: element.Role[0].id
                                }
                                $scope.Users.push(user);
                            }
                        });
                    }
                }
            })
        }
        getUsers();

        // lấy tất cả các group
        function Getallgroup() {
            DataServices.GetallGgroup().then(function (response) {
                if (response.data.error_code === 0) {
                    $scope.AllGroups = response.data.groups;
                }
            })
        }
        Getallgroup();

        $scope.Groups = [
            {
                id: null,
                name: 'Chọn'
            },
            {
                id: 1,
                name: 'Telesale'
            },
            {
                id: 2,
                name: 'Makerting'
            }
        ];

        $scope.group = $scope.Groups[0];

        $scope.getUserforchange = function () {
            $scope.Leaders = [];
            if ($scope.group.id !== null) {
                if ($scope.group.id === 1) {
                    $scope.Users.forEach(element => {
                        if (element.role === 1 && element.Leader === false) {
                            $scope.Leaders.push(element);
                        }
                    });
                } else {
                    $scope.Users.forEach(element => {
                        if (element.role === 2 && element.Leader === false) {
                            $scope.Leaders.push(element);
                        }
                    });
                }
            }
        }

        $scope.createGroup = function () {
            if (
                $scope.groupname === undefined ||
                $scope.groupname === '' ||
                $scope.group.id === null
            ) {
                Notifi._error('Nhập đầy đủ thông tin để tạo group.')
            } else {
                let Gtype;
                let _leader;
                if ($scope.group.id === 1) {
                    Gtype = {
                        id: 1,
                        name: 'Telesale'
                    }
                } else {
                    Gtype = {
                        id: 2,
                        name: 'Makerting'
                    }
                }

                if ($scope.Leader !== undefined) {
                    _leader = {
                        id: $scope.Leader.id,
                        name: $scope.Leader.name
                    }
                } else {
                    _leader = null;
                }


                DataServices.Cgroup($scope.groupname, Gtype, _leader).then(function (response) {
                    if (response.data.error_code === 0) {
                        if (_leader !== null) {
                            let Zone = [{
                                id: response.data.message,
                                name: $scope.groupname,
                                Gtype: Gtype
                            }]
                            DataServices.UpdateZoneUser(Zone, _leader.id).then(function (response) { })
                        }
                        Getallgroup();
                        Notifi._success('Tạo nhóm thành công');
                        $scope.Leader = '';
                        $scope.group = $scope.Groups[0];
                        $scope.groupname = '';
                    } else {
                        Notifi._error('Có lỗi trong quá trình xử lý vui lòng thử lại');
                    }
                })
            }
        }

        // cập nhật group

        $scope.getUserforupchange = function () {
            $scope.upLeaders = [];
            if ($scope.upgroup.id !== null) {
                if ($scope.upgroup.id === 1) {
                    $scope.Users.forEach(element => {
                        if (element.role === 1) {
                            $scope.upLeaders.push(element);
                        }
                    });
                } else {
                    $scope.Users.forEach(element => {
                        if (element.role === 2) {
                            $scope.upLeaders.push(element);
                        }
                    });
                }
            }
        }

        $scope.OpeneditGroup = function (_detail) {
            $scope.update_g = _detail;
            $scope.Groups.forEach(element => {
                if (_detail.Gtype[0].id === element.id) {
                    $scope.upgroup = element;
                    $scope.upLeaders = [];
                    if ($scope.upgroup.id !== null) {
                        if ($scope.upgroup.id === 1) {
                            $scope.Users.forEach(element => {
                                if (element.role === 1) {
                                    $scope.upLeaders.push(element);
                                }
                            });
                        } else {
                            $scope.Users.forEach(element => {
                                if (element.role === 2) {
                                    $scope.upLeaders.push(element);
                                }
                            });
                        }
                    }
                }
            });

            if (_detail.Leader !== null) {
                $scope.upLeader = _detail.Leader[0];
                $scope.upLeaders.forEach(element => {
                    if (element.id === $scope.upLeader.id) {
                        $scope.upLeader = element;
                    }
                });
            } else {
                $scope.upLeader = null;
            }

            $scope.upgroupname = _detail.Name;
            $scope.upGroup = _detail;
            $('#upgroup').modal('show');
        }

        $scope.UpdateGroup = function () {
            if ($scope.upgroup.id !== $scope.update_g.Gtype[0].id) {
                if ($scope.upgroup.id !== null) {
                    $scope.update_g.Gtype[0] = {
                        id: $scope.upgroup.id,
                        name: $scope.upgroup.name
                    }
                }
            }

            if ($scope.upgroupname !== $scope.update_g.Name) {
                if ($scope.upgroupname !== '') {
                    $scope.update_g.Name = $scope.upgroupname;
                }
            }

            if ($scope.upLeader !== null) {
                if ($scope.update_g.Leader !== null) {
                    if ($scope.upLeader.id !== $scope.update_g.Leader[0].id) {
                        var pre_leader = $scope.update_g.Leader[0].id;
                        $scope.update_g.Leader[0] = {
                            id: $scope.upLeader.id,
                            name: $scope.upLeader.name
                        }
                    }
                } else {
                    $scope.update_g.Leader = [{
                        id: $scope.upLeader.id,
                        name: $scope.upLeader.name
                    }]
                }

                var Zone = [
                    {
                        id: $scope.update_g._id,
                        name: $scope.update_g.Name,
                        Gtype: $scope.update_g.Gtype
                    }
                ]
            }

            DataServices.UpGroup($scope.update_g).then(function (response) {
                if (response.data.error_code === 0) {
                    DataServices.UpdateZoneUser(Zone, $scope.update_g.Leader[0].id).then(function (response) { })
                    if (pre_leader !== null) {
                        DataServices.Updatermleader(pre_leader).then(function (response) { })
                    }
                    Getallgroup();
                    Notifi._success('Cập nhật thông tin thành công');
                    $('#upgroup').modal('hide');
                } else {
                    Notifi._error('Có lỗi trong quá trình xử lý vui lòng thử lại sau');
                }
            })
        }

        // xóa group
        $scope.Opendelg = function (_detail) {
            $scope.delg = _detail;
            $('#delgroup').modal('show');
        }

        $scope.Delg = function (_id) {
            DataServices.DelGroup(_id).then(function (response) {
                if (response.data.error_code === 0) {
                    Getallgroup();
                    Notifi._success('Xóa group thành công');
                    $('#delgroup').modal('hide');
                } else {
                    Notifi._error('Có lỗi trong quá trình xử lý dữ liệu vui lòng thử lại');
                }
            })
        }
    })
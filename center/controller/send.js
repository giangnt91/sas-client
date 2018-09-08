sas
    .controller('SendCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket) {
        // hiển thị ngày tháng
        function convertshow(x) {
            var parts = x.split("/");
            return parts[2] + '-' + parts[1] + '-' + parts[0];
        }

        // cập nhật ngày tháng
        function convertup(x) {
            var parts = x.split("-");
            return parts[2] + '/' + parts[1] + '/' + parts[0];
        }

        // giới tính
        $scope.Sex = [
            {
                name: 'Chọn',
                value: null
            },
            {
                name: 'Nam',
                value: 1
            },
            {
                name: 'Nữ',
                value: 0
            }
        ];

        // địa chỉ
        $scope.Address = [
            {
                name: 'Chọn',
                value: null
            }, {
                name: 'Quận 1',
                value: 1
            }, {
                name: 'Quận 2',
                value: 2
            }, {
                name: 'Quận 3',
                value: 3
            }, {
                name: 'Quận 4',
                value: 4
            }, {
                name: 'Quận 5',
                value: 5
            }, {
                name: 'Quận 6',
                value: 6
            }, {
                name: 'Quận 7',
                value: 7
            }, {
                name: 'Quận 8',
                value: 8
            }, {
                name: 'Quận 9',
                value: 9
            }, {
                name: 'Quận 10',
                value: 10
            }, {
                name: 'Quận 11',
                value: 11
            }, {
                name: 'Quận 12',
                value: 12
            }, {
                name: 'Quận Thủ Đức',
                value: 13
            }, {
                name: 'Quận Gò Vấp',
                value: 14
            }, {
                name: 'Quận Bình Thạnh',
                value: 15
            }, {
                name: 'Quận Tân Bình',
                value: 16
            }, {
                name: 'Quận Tân Phú',
                value: 17
            }, {
                name: 'Quận Phú Nhuận',
                value: 18
            }, {
                name: 'Quận Bình Tân',
                value: 19
            }, {
                name: 'Huyện Củ Chi',
                value: 20
            }, {
                name: 'Huyện Hóc Môn',
                value: 21
            }, {
                name: 'Huyện Bình Chánh',
                value: 22
            }, {
                name: 'Huyện Nhà Bè',
                value: 23
            }, {
                name: 'Huyện Cần Giờ',
                value: 24
            }, {
                name: 'Đồng Nai',
                value: 25
            }, {
                name: 'Bình Dương',
                value: 26
            }, {
                name: 'Đà Nẵng',
                value: 27
            }, {
                name: 'Khác',
                value: 28
            }
        ]

        // cơ sở
        $scope.Center = [
            {
                name: 'Chọn',
                value: null
            }, {
                name: 'Bạch Đằng',
                value: 1
            }, {
                name: 'Lạc Long Quân',
                value: 2
            }, {
                name: 'Bác Ái',
                value: 3
            }, {
                name: 'Lê Hồng Phong',
                value: 4
            }, {
                name: 'Trần Thị Nghỉ',
                value: 5
            }, {
                name: 'Trần Bình Trọng',
                value: 6
            }, {
                name: '79 DIS 7',
                value: 7
            }, {
                name: 'Tây Thạnh',
                value: 8
            }, {
                name: 'Trần Khánh Dư',
                value: 9
            }, {
                name: 'Bàu Cát',
                value: 10
            }, {
                name: 'Lý Chiêu Hoàng',
                value: 11
            }, {
                name: 'Hoa Lan',
                value: 12
            }, {
                name: 'Lê Văn Việt',
                value: 13
            }, {
                name: 'Phạm Thị Tánh',
                value: 14
            }, {
                name: 'Đại Lộ Bình Dương',
                value: 15
            }, {
                name: 'Chánh Nghĩa',
                value: 16
            }, {
                name: 'Biên Hòa',
                value: 17
            }, {
                name: 'Đà Nẵng',
                value: 18
            }, {
                name: 'Thanh Khê',
                value: 19
            }, {
                name: 'Hà Huy Giáp',
                value: 20
            }, {
                name: 'Điện Biên Phủ',
                value: 21
            }, {
                name: 'Trần Văn Hoài CT',
                value: 22
            }, {
                name: '30/4 CT',
                value: 23
            }, {
                name: 'Tân Sơn Nhì',
                value: 24
            }
        ]

        // trạng thái
        $scope.Status = [
            {
                name: 'Chọn',
                value: null
            },
            {
                name: 'Chưa đăng ký',
                value: 0
            },
            {
                name: 'Không tiềm năng',
                value: 1
            },
            {
                name: 'Đến chưa đăng ký',
                value: 2
            },
            {
                name: 'Đã đăng ký',
                value: 3
            },
            {
                name: 'Hủy',
                value: 4
            }
        ]

        // giờ hẹn
        $scope.Appointment_time = [
            {
                name: 'Chọn',
                value: null
            },
            {
                name: '8:00',
                value: 1
            },
            {
                name: '8:30',
                value: 2
            },
            {
                name: '9:00',
                value: 3
            },
            {
                name: '9:30',
                value: 4
            },
            {
                name: '10:00',
                value: 5
            },
            {
                name: '10:30',
                value: 6
            },
            {
                name: '11:00',
                value: 7
            },
            {
                name: '11:30',
                value: 8
            },
            {
                name: '12:00',
                value: 9
            },
            {
                name: '12:30',
                value: 10
            },
            {
                name: '13:00',
                value: 11
            },
            {
                name: '13:30',
                value: 12
            },
            {
                name: '14:00',
                value: 13
            },
            {
                name: '14:30',
                value: 14
            },
            {
                name: '15:00',
                value: 15
            },
            {
                name: '15:30',
                value: 16
            },
            {
                name: '16:00',
                value: 17
            },
            {
                name: '16:30',
                value: 18
            },
            {
                name: '17:00',
                value: 19
            },
            {
                name: '17:30',
                value: 20
            },
            {
                name: '18:00',
                value: 21
            },
            {
                name: '18:30',
                value: 22
            },
            {
                name: '19:00',
                value: 23
            },
            {
                name: '19:30',
                value: 24
            },
            {
                name: '20:00',
                value: 25
            },
            {
                name: '20:30',
                value: 26
            },
            {
                name: '21:00',
                value: 27
            }
        ];

        // custom tìm kiếm
        function getUsers() {
            DataServices.GetallUser().then(function (response) {
                if (response.data.error_code === 0) {
                    var _result = response.data.users;
                    if (_result.length > 0) {
                        $scope.Users = [{
                            id: null,
                            name: 'Chọn'
                        }];
                        _result.forEach(element => {
                            if (element.Role[0].id === 1) {
                                let user = {
                                    id: element.Username,
                                    name: element.Fullname
                                }
                                $scope.Users.push(user);
                            }
                        });
                    }
                }
            })
        }
        getUsers();

        $timeout(function () {
            $scope.Sesale = $scope.Users[0];
        }, 500)
        $scope.Searchwith = function () {
            var Sesale;
            var Seregday;
            var Seregday2;

            var _Seregday = $('#Seregday').val();
            var _Seregday2 = $('#Seregday2').val();

            if (_Seregday !== '') {
                Seregday = _Seregday;
            } else {
                Seregday = null;
            }

            if (_Seregday2 !== '') {
                Seregday2 = _Seregday2;
            } else {
                Seregday2 = null;
            }

            if ($scope.Sesale !== null) {
                if ($scope.Sesale.id !== null) {
                    Sesale = $scope.Sesale.id;
                } else {
                    Sesale = null;
                }

            } else {
                Sesale = null;
            }

            DataServices.SearchS(Seregday, Seregday2, Sesale).then(function (response) {
                if (response.data.error_code === 0) {
                    $scope.list_student = response.data.students;
                    Notifi._success('Lọc dữ liệu thành công');
                } else if (response.data.error_code === 1) {
                    Notifi._error('Có lỗi trong quá trình xử lý vui lòng thử lại')
                } else if (response.data.error_code === 2) {
                    Notifi._error('Không có dữ liệu phù hợp với thông số tìm kiếm')
                }
            })

        }

        $scope.Clear = function () {
            $('#Seregday').val(null);
            $('#Seregday2').val(null);
            $scope.Sesale = $scope.Users[0];
            getStudent($rootScope.auth.Username, $rootScope.auth.Role);
        }

        // lấy danh sách học viên
        function getStudent(username, role) {
            DataServices.Getall(username, role).then(function (response) {
                if (response.data.error_code === 0) {
                    $scope.list_student = [];
                    response.data.student.forEach(element => {
                        if (element.Center !== null && element.Center[0].id !== null) {
                            $scope.list_student.push(element);
                        }
                    });

                    $scope.newdtOptions = DTOptionsBuilder.newOptions()
                        .withDisplayLength(10)
                        .withOption('bLengthChange', true)
                        .withOption('iDisplayLength', 10)
                        .withDOM('Zlfrtip')
                } else {
                    Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.')
                }
            });
        }

        // tạo học viên mới từ thêm bạn
        function CstudentF(Fullname, Email, Phone, Sex, Address, Regday, Note, Center, Appointment_day, Appointment_dayiso, Appointment_time, Status_student, Manager) {
            DataServices.CstudentF(Fullname, Email, Phone, Sex, Address, Regday, Note, Center, Appointment_day, Appointment_dayiso, Appointment_time, Status_student, Manager).then(function (response) {
                if (response.data.error_code === 0) {
                    getStudent($rootScope.auth.Username, $rootScope.auth.Role);
                    $scope.friendId = response.data._id;
                    update_student($scope._details);
                    Notifi._success('Tạo học viên thành công.');
                } else {
                    Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.');
                }
            })
        }

        // cập nhật thông tin học viên
        function update_student(student) {
            if ($scope.friendId !== undefined) {
                let new_friend = {
                    id: $scope.friendId,
                    name: $scope._fullname
                }

                if (student.ListFriend !== null) {
                    var listfriend = student.ListFriend;
                    listfriend.push(new_friend);
                } else {
                    var listfriend = [];
                    listfriend.push(new_friend);
                }

                student.ListFriend = listfriend;
            }

            DataServices.UpStudent(student).then(function (response) {
                if (response.data.error_code === 0) {
                    getStudent($rootScope.auth.Username, $rootScope.auth.Role);
                    Notifi._success('Cập nhật thông tin thành công.');
                } else {
                    Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.');
                }
            })
        }

        // check exit user
        $rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
        if (!$rootScope.auth) {
            $location.path('/login');
        } else {

            // auto notify
            Thesocket.on('alert', function (list_user) {
                var last_time = localStorage.getItem('lasttime');
                var last_id = 0;
                if (list_user.length > 0) {
                    list_user.forEach(element => {
                        if (element.user === $rootScope.auth.Username) {
                            if (element.time !== last_time) {
                                localStorage.setItem('lasttime', element.time);
                                DataServices.GetforNotif($rootScope.auth.Username, $rootScope.auth.Role, element.time, element.day).then(function (response) {
                                    if (response.data.error_code === 0) {
                                        var notify = response.data.student;
                                        if (notify.length > 0) {
                                            if (last_id !== 1) {
                                                notify.forEach(el => {
                                                    Notifi._notifi(
                                                        'Học viên ' + el.Fullname + '<br> có ID ' + el._id + '<br> cần được liên hệ vào lúc ' + element.time
                                                    )
                                                });
                                                last_id = 1;
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            })

            getStudent($rootScope.auth.Username, $rootScope.auth.Role);

            // thông tin chi tiết của học viên
            $scope.detail = function detailStudent(id) {

                // giới tính
                $scope.Sex = [
                    {
                        name: 'Chọn',
                        value: null
                    },
                    {
                        name: 'Nam',
                        value: 1
                    },
                    {
                        name: 'Nữ',
                        value: 0
                    }
                ];

                // địa chỉ
                $scope.Address = [
                    {
                        name: 'Chọn',
                        value: null
                    }, {
                        name: 'Quận 1',
                        value: 1
                    }, {
                        name: 'Quận 2',
                        value: 2
                    }, {
                        name: 'Quận 3',
                        value: 3
                    }, {
                        name: 'Quận 4',
                        value: 4
                    }, {
                        name: 'Quận 5',
                        value: 5
                    }, {
                        name: 'Quận 6',
                        value: 6
                    }, {
                        name: 'Quận 7',
                        value: 7
                    }, {
                        name: 'Quận 8',
                        value: 8
                    }, {
                        name: 'Quận 9',
                        value: 9
                    }, {
                        name: 'Quận 10',
                        value: 10
                    }, {
                        name: 'Quận 11',
                        value: 11
                    }, {
                        name: 'Quận 12',
                        value: 12
                    }, {
                        name: 'Quận Thủ Đức',
                        value: 13
                    }, {
                        name: 'Quận Gò Vấp',
                        value: 14
                    }, {
                        name: 'Quận Bình Thạnh',
                        value: 15
                    }, {
                        name: 'Quận Tân Bình',
                        value: 16
                    }, {
                        name: 'Quận Tân Phú',
                        value: 17
                    }, {
                        name: 'Quận Phú Nhuận',
                        value: 18
                    }, {
                        name: 'Quận Bình Tân',
                        value: 19
                    }, {
                        name: 'Huyện Củ Chi',
                        value: 20
                    }, {
                        name: 'Huyện Hóc Môn',
                        value: 21
                    }, {
                        name: 'Huyện Bình Chánh',
                        value: 22
                    }, {
                        name: 'Huyện Nhà Bè',
                        value: 23
                    }, {
                        name: 'Huyện Cần Giờ',
                        value: 24
                    }, {
                        name: 'Đồng Nai',
                        value: 25
                    }, {
                        name: 'Bình Dương',
                        value: 26
                    }, {
                        name: 'Đà Nẵng',
                        value: 27
                    }, {
                        name: 'Khác',
                        value: 28
                    }
                ]

                // cơ sở
                $scope.Center = [
                    {
                        name: 'Chọn',
                        value: null
                    }, {
                        name: 'Bạch Đằng',
                        value: 1
                    }, {
                        name: 'Lạc Long Quân',
                        value: 2
                    }, {
                        name: 'Bác Ái',
                        value: 3
                    }, {
                        name: 'Lê Hồng Phong',
                        value: 4
                    }, {
                        name: 'Trần Thị Nghỉ',
                        value: 5
                    }, {
                        name: 'Trần Bình Trọng',
                        value: 6
                    }, {
                        name: '79 DIS 7',
                        value: 7
                    }, {
                        name: 'Tây Thạnh',
                        value: 8
                    }, {
                        name: 'Trần Khánh Dư',
                        value: 9
                    }, {
                        name: 'Bàu Cát',
                        value: 10
                    }, {
                        name: 'Lý Chiêu Hoàng',
                        value: 11
                    }, {
                        name: 'Hoa Lan',
                        value: 12
                    }, {
                        name: 'Lê Văn Việt',
                        value: 13
                    }, {
                        name: 'Phạm Thị Tánh',
                        value: 14
                    }, {
                        name: 'Đại Lộ Bình Dương',
                        value: 15
                    }, {
                        name: 'Chánh Nghĩa',
                        value: 16
                    }, {
                        name: 'Biên Hòa',
                        value: 17
                    }, {
                        name: 'Đà Nẵng',
                        value: 18
                    }, {
                        name: 'Thanh Khê',
                        value: 19
                    }, {
                        name: 'Hà Huy Giáp',
                        value: 20
                    }, {
                        name: 'Điện Biên Phủ',
                        value: 21
                    }, {
                        name: 'Trần Văn Hoài CT',
                        value: 22
                    }, {
                        name: '30/4 CT',
                        value: 23
                    }, {
                        name: 'Tân Sơn Nhì',
                        value: 24
                    }
                ]

                // trạng thái
                $scope.Status = [
                    {
                        name: 'Chọn',
                        value: null
                    },
                    {
                        name: 'Chưa đăng ký',
                        value: 0
                    },
                    {
                        name: 'Không tiềm năng',
                        value: 1
                    },
                    {
                        name: 'Đến chưa đăng ký',
                        value: 2
                    },
                    {
                        name: 'Đã đăng ký',
                        value: 3
                    },
                    {
                        name: 'Hủy',
                        value: 4
                    }
                ]

                // giờ hẹn
                $scope.Appointment_time = [
                    {
                        name: 'Chọn',
                        value: null
                    },
                    {
                        name: '8:00',
                        value: 1
                    },
                    {
                        name: '8:30',
                        value: 2
                    },
                    {
                        name: '9:00',
                        value: 3
                    },
                    {
                        name: '9:30',
                        value: 4
                    },
                    {
                        name: '10:00',
                        value: 5
                    },
                    {
                        name: '10:30',
                        value: 6
                    },
                    {
                        name: '11:00',
                        value: 7
                    },
                    {
                        name: '11:30',
                        value: 8
                    },
                    {
                        name: '12:00',
                        value: 9
                    },
                    {
                        name: '12:30',
                        value: 10
                    },
                    {
                        name: '13:00',
                        value: 11
                    },
                    {
                        name: '13:30',
                        value: 12
                    },
                    {
                        name: '14:00',
                        value: 13
                    },
                    {
                        name: '14:30',
                        value: 14
                    },
                    {
                        name: '15:00',
                        value: 15
                    },
                    {
                        name: '15:30',
                        value: 16
                    },
                    {
                        name: '16:00',
                        value: 17
                    },
                    {
                        name: '16:30',
                        value: 18
                    },
                    {
                        name: '17:00',
                        value: 19
                    },
                    {
                        name: '17:30',
                        value: 20
                    },
                    {
                        name: '18:00',
                        value: 21
                    },
                    {
                        name: '18:30',
                        value: 22
                    },
                    {
                        name: '19:00',
                        value: 23
                    },
                    {
                        name: '19:30',
                        value: 24
                    },
                    {
                        name: '20:00',
                        value: 25
                    },
                    {
                        name: '20:30',
                        value: 26
                    },
                    {
                        name: '21:00',
                        value: 27
                    }
                ];

                $scope.list_student.forEach(element => {
                    if (element._id === id) {
                        $scope._details = element;

                        // kiểm tra giới tính
                        if (element.Sex !== null) {
                            for (let i = 0; i < $scope.Sex.length; i++) {
                                if ($scope.Sex[i].value === element.Sex[0].id) {
                                    $scope.selectedSex = $scope.Sex[i];
                                }
                            }
                        } else {
                            $scope.selectedSex = $scope.Sex[0];
                        }

                        // kiểm tra địa chỉ
                        if (element.Address !== null) {
                            for (let i = 0; i < $scope.Address.length; i++) {
                                if ($scope.Address[i].value === element.Address[0].id) {
                                    $scope.selectedAddress = $scope.Address[i];
                                }
                            }
                        } else {
                            $scope.selectedAddress = $scope.Address[0];
                        }

                        // kiểm tra ngày báo danh
                        if ($scope._details.Regday2 !== null) {
                            $('#dayreg2').val(convertshow($scope._details.Regday2));
                        } else {
                            $('#dayreg2').val(null);
                        }

                        // kiểm tra cơ sở
                        if (element.Center !== null) {
                            for (let i = 0; i < $scope.Center.length; i++) {
                                if ($scope.Center[i].value === element.Center[0].id) {
                                    $scope.selectedCenter = $scope.Center[i];
                                }
                            }
                        } else {
                            $scope.selectedCenter = $scope.Center[0];
                        }

                        // kiểm tra trạng thái
                        if (element.Status_student !== null) {
                            for (let i = 0; i < $scope.Status.length; i++) {
                                if ($scope.Status[i].value === element.Status_student[0].id) {
                                    $scope.selectedStatus = $scope.Status[i];
                                }
                            }
                        } else {
                            $scope.selectedStatus = $scope.Status[0];
                        }

                        // kiểm tra ngày hẹn
                        if ($scope._details.Appointment_day !== null) {
                            $('#dngayhen').val(convertshow($scope._details.Appointment_day));
                        } else {
                            $('#dngayhen').val(null);
                        }

                        // kiểm tra giờ hẹn
                        if (element.Appointment_time !== null) {
                            for (let i = 0; i < $scope.Appointment_time.length; i++) {
                                if ($scope.Appointment_time[i].value === element.Appointment_time[0].id) {
                                    $scope.selectedTime = $scope.Appointment_time[i];
                                }
                            }
                        } else {
                            $scope.selectedTime = $scope.Appointment_time[0];
                        }

                        // kiểm tra giờ gọi lại và ngày gọi lại
                        if ($scope._details.Time_recall !== null) {
                            if ($scope._details.Time_recall[0].day !== null) {
                                $('#dngaygoilai').val(convertshow($scope._details.Time_recall[0].day));
                            } else {
                                $('#dngaygoilai').val(null);
                            }
                        } else {
                            $('#dngaygoilai').val(null);
                        }

                        if (element.Time_recall !== null) {
                            for (let i = 0; i < $scope.Appointment_time.length; i++) {
                                if ($scope.Appointment_time[i].value === element.Time_recall[0].time[0].id) {
                                    $scope.selectedTime2 = $scope.Appointment_time[i];
                                }
                            }
                        } else {
                            $scope.selectedTime2 = $scope.Appointment_time[0];
                        }

                        // kiểm tra 3 check box
                        if (element.Appointment_1st === false) {
                            $scope.st1 = false;
                        } else {
                            $scope.st1 = true;
                        }

                        if (element.Appointment_not_1st === false) {
                            $scope.not1st = false;
                        } else {
                            $scope.not1st = true;
                        }

                        if (element.unregistered === false) {
                            $scope.unreg = false;
                        } else {
                            $scope.unreg = true;
                        }

                    }
                });


                $('#detail').modal('show');
            }

            // gọi lại
            $scope.recall = function () {
                $scope._details.Recall = true;
                update_student($scope._details);
            }

            // cập nhật thông tin học viên
            $scope.up_detail = function () {

                // kiểm tra ngày báo danh
                let _tmpdaybd = $('#dayreg2').val();
                if (_tmpdaybd !== '') {
                    $scope._details.Regday2 = convertup(_tmpdaybd);
                }

                // kiểm tra địa chỉ
                if ($scope.selectedAddress !== null) {
                    var tmpAddress = [
                        {
                            id: $scope.selectedAddress.value,
                            name: $scope.selectedAddress.name
                        }
                    ]
                    $scope._details.Address = tmpAddress;
                }


                // kiểm tra giới tính
                if ($scope.selectedSex !== null) {
                    var tmpSex = [
                        {
                            id: $scope.selectedSex.value,
                            name: $scope.selectedSex.name
                        }
                    ]
                    $scope._details.Sex = tmpSex;
                }

                // kiểm tra ngày hẹn
                let _tmpday = $('#dngayhen').val();
                if (_tmpday !== '') {
                    $scope._details.Appointment_day = convertup(_tmpday);
                    $scope._details.Appointment_dayiso = _tmpday;
                }

                // kiểm tra cơ sở
                if ($scope.selectedCenter !== null) {
                    var tmpCenter = [
                        {
                            id: $scope.selectedCenter.value,
                            name: $scope.selectedCenter.name
                        }
                    ]
                    $scope._details.Center = tmpCenter;
                }

                // kiểm tra trạng thái
                if ($scope.selectedStatus !== null) {
                    var tmpStatus = [
                        {
                            id: $scope.selectedStatus.value,
                            name: $scope.selectedStatus.name
                        }
                    ]
                    if ($scope.selectedStatus.value === 3) {
                        var today = new Date();
                        var dd = today.getDate();
                        var mm = today.getMonth() + 1;
                        var yyyy = today.getFullYear();
                        if (dd < 10) {
                            dd = '0' + dd
                        }
                        if (mm < 10) {
                            mm = '0' + mm
                        }
                        today = dd + '/' + mm + '/' + yyyy;
                        $scope._details.Dayenrollment = today;
                    }
                    $scope._details.Status_student = tmpStatus;
                }

                // kiểm tra giờ hẹn
                if ($scope.selectedTime !== null) {
                    var tmpTime = [
                        {
                            id: $scope.selectedTime.value,
                            name: $scope.selectedTime.name
                        }
                    ]
                    $scope._details.Appointment_time = tmpTime;
                }

                // kiểm tra sale
                //  if($scope.selectedManager !== null){
                //     var tmpManager = [
                //         {
                //             id: $scope.selectedManager.Username,
                //             name: $scope.selectedManager.Fullname
                //         }
                //     ]
                //     $scope._details.Manager = tmpManager;
                // }

                update_student($scope._details);
            }

            // cập nhật thông tin học viên 2
            $scope.up_detail_2 = function () {
                var _tmpday = $('#dngaygoilai').val();
                var _day = null;
                var tmpTime;
                if ($scope._details.Time_recall !== null) {
                    // kiểm tra ngày hẹn
                    if (_tmpday !== '') {
                        $scope._details.Time_recall[0].day = convertup(_tmpday);
                    }

                    // kiểm tra giờ hẹn
                    if ($scope.selectedTime2 !== null) {
                        tmpTime = [
                            {
                                id: $scope.selectedTime2.value,
                                name: $scope.selectedTime2.name
                            }
                        ]
                        $scope._details.Time_recall[0].time = tmpTime;
                    }
                } else {
                    if (_tmpday !== '') {
                        _day = convertup(_tmpday);
                    }

                    if ($scope.selectedTime2 !== null) {
                        tmpTime = [
                            {
                                id: $scope.selectedTime2.value,
                                name: $scope.selectedTime2.name
                            }
                        ]
                    }

                    var time_recall = [
                        {
                            day: _day,
                            time: tmpTime
                        }
                    ]

                    $scope._details.Time_recall = time_recall;
                }
                update_student($scope._details);
            }

            // kiểm tra checkbox
            $scope.check1st = function (value) {
                $scope._details.Appointment_1st = value;
                update_student($scope._details);
            }

            $scope.checknot1st = function (value) {
                $scope._details.Appointment_not_1st = value;
                update_student($scope._details);
            }

            $scope.checkunreg = function (value) {
                $scope._details.unregistered = value;
                update_student($scope._details);
            }

            // Thêm bạn
            $scope.addfriend = function (id) {
                $scope.addNote = "Bạn của học viên " + id;
                $('#add2').modal('show');
            }

            $scope.addnewfromaddFriend = function (data) {
                var _tmpregday = $('#adddayreg').val();
                var _tmpdayhen = $('#addngayhen').val();
                var _manager = [{
                    id: $scope.auth.Username,
                    name: $scope.auth.Fullname
                }]
                if (data === undefined ||
                    data.fullname === undefined ||
                    data.email === undefined ||
                    data.phone === undefined ||
                    $scope.addselectedSex === undefined ||
                    $scope.addselectedAddress === undefined ||
                    _tmpregday === ''
                ) {
                    Notifi._error('Nhập đầy đủ thông tin để tạo user.')
                    return;
                } else {
                    $scope._fullname = data.fullname;
                    var henday;
                    var hendayiso;
                    var tmp_center;
                    var tmp_status;
                    var tmp_time;

                    let regday = convertup(_tmpregday);

                    let tmp_sex = [{
                        id: $scope.addselectedSex.value,
                        name: $scope.addselectedSex.name
                    }]
                    let tmp_address = [{
                        id: $scope.addselectedAddress.value,
                        name: $scope.addselectedAddress.name
                    }]

                    if ($scope.addselectedCenter !== undefined) {
                        tmp_center = [{
                            id: $scope.addselectedCenter.value,
                            name: $scope.addselectedCenter.name
                        }]
                    } else {
                        tmp_center = null;
                    }

                    if ($scope.addselectedStatus !== undefined) {
                        tmp_status = [{
                            id: $scope.addselectedStatus.value,
                            name: $scope.addselectedStatus.name
                        }]
                    } else {
                        tmp_status = {
                            id: 0,
                            name: 'Chưa đăng ký'
                        }
                    }

                    if (_tmpdayhen !== '') {
                        henday = convertup(_tmpdayhen);
                        hendayiso = _tmpdayhen;
                    } else {
                        henday = null;
                        hendayiso = null;
                    }

                    if ($scope.addselectedTime !== undefined) {
                        tmp_time = [{
                            id: $scope.addselectedTime.value,
                            name: $scope.addselectedTime.name
                        }]
                    } else {
                        tmp_time = null;
                    }


                    if ($scope.addNote === undefined || $scope.addNote === '') {
                        $scope.addNote = null;
                    }

                    CstudentF(data.fullname, data.email, data.phone, tmp_sex, tmp_address, regday, $scope.addNote, tmp_center, henday, hendayiso, tmp_time, tmp_status, _manager);
                }
            }
        }
    })
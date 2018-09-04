sas
    .controller('HomeCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket) {
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

        // lấy danh sách sale
        function getSale() {
            DataServices.GetallUser().then(function (repsonse) {
                if (repsonse.data.error_code === 0) {
                    $scope.users = repsonse.data.users;
                } else {
                    Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.')
                }
            });
        }

        // lấy danh sách học viên
        function getStudent(username, role) {
            DataServices.Getall(username, role).then(function (response) {
                if (response.data.error_code === 0) {
                    $scope.list_student = response.data.student;

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
        function CstudentF(Fullname, Email, Phone, Sex, Address, Regday, Note, Center, Appointment_day, Appointment_time, Status_student, Manager) {
            DataServices.CstudentF(Fullname, Email, Phone, Sex, Address, Regday, Note, Center, Appointment_day, Appointment_time, Status_student, Manager).then(function (response) {
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

        // tạo học viên bình thường
        function Cstudent(Fullname, Email, Phone, Sex, Address, Regday, Note, Center, Appointment_day, Appointment_time, Status_student, Manager) {
            DataServices.CstudentF(Fullname, Email, Phone, Sex, Address, Regday, Note, Center, Appointment_day, Appointment_time, Status_student, Manager).then(function (response) {
                if (response.data.error_code === 0) {
                    getStudent($rootScope.auth.Username, $rootScope.auth.Role);
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
            // getSale($rootScope.auth.Username);
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

                        // kiểm tra telesale
                        // for (let i = 0; i < $scope.users.length; i++) {
                        //     if($scope.users[i].Username === element.Manager[0].id){
                        //         $scope.selectedManager = $scope.users[i];
                        //     }
                        // }

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
                    _tmpregday === '' ||
                    $scope.addNote === undefined ||
                    $scope.addselectedCenter === undefined ||
                    $scope.addselectedStatus === undefined ||
                    _tmpdayhen === '' ||
                    $scope.addselectedTime === undefined
                ) {
                    Notifi._error('Nhập đầy đủ thông tin để tạo user.')
                    return;
                } else {
                    $scope._fullname = data.fullname;
                    let regday = convertup(_tmpregday);
                    let henday = convertup(_tmpdayhen);
                    let tmp_sex = [{
                        id: $scope.addselectedSex.value,
                        name: $scope.addselectedSex.name
                    }]
                    let tmp_address = [{
                        id: $scope.addselectedAddress.value,
                        name: $scope.addselectedAddress.name
                    }]
                    let tmp_center = [{
                        id: $scope.addselectedCenter.value,
                        name: $scope.addselectedCenter.name
                    }]
                    let tmp_status = [{
                        id: $scope.addselectedStatus.value,
                        name: $scope.addselectedStatus.name
                    }]
                    let tmp_time = [{
                        id: $scope.addselectedTime.value,
                        name: $scope.addselectedTime.name
                    }]

                    CstudentF(data.fullname, data.email, data.phone, tmp_sex, tmp_address, regday, $scope.addNote, tmp_center, henday, tmp_time, tmp_status, _manager);
                }
            }

            // Thêm học viên mới
            $scope.maddselectedSex = $scope.Sex[0];
            $scope.maddselectedAddress = $scope.Address[0];
            $scope.maddselectedCenter = $scope.Center[0];
            $scope.maddselectedStatus = $scope.Status[0];
            $scope.maddselectedTime = $scope.Appointment_time[0];
            $scope.AddStudent = function (data) {
                var _tmpregday = $('#madddayreg').val();
                var _tmpdayhen = $('#maddngayhen').val();
                var _manager = [{
                    id: $scope.auth.Username,
                    name: $scope.auth.Fullname
                }]
                if (data === undefined ||
                    data.fullname === undefined ||
                    data.email === undefined ||
                    data.phone === undefined ||
                    $scope.maddselectedSex === undefined ||
                    $scope.maddselectedAddress === undefined ||
                    _tmpregday === '' ||
                    $scope.maddNote === undefined ||
                    $scope.maddselectedCenter === undefined ||
                    $scope.maddselectedStatus === undefined ||
                    _tmpdayhen === '' ||
                    $scope.maddselectedTime === undefined
                ) {
                    Notifi._error('Nhập đầy đủ thông tin để tạo user.')
                    return;
                } else {
                    let regday = convertup(_tmpregday);
                    let henday = convertup(_tmpdayhen);
                    let tmp_sex = [{
                        id: $scope.maddselectedSex.value,
                        name: $scope.maddselectedSex.name
                    }]
                    let tmp_address = [{
                        id: $scope.maddselectedAddress.value,
                        name: $scope.maddselectedAddress.name
                    }]
                    let tmp_center = [{
                        id: $scope.maddselectedCenter.value,
                        name: $scope.maddselectedCenter.name
                    }]
                    let tmp_status = [{
                        id: $scope.maddselectedStatus.value,
                        name: $scope.maddselectedStatus.name
                    }]
                    let tmp_time = [{
                        id: $scope.maddselectedTime.value,
                        name: $scope.maddselectedTime.name
                    }]

                    Cstudent(data.fullname, data.email, data.phone, tmp_sex, tmp_address, regday, $scope.addNote, tmp_center, henday, tmp_time, tmp_status, _manager);
                }
            }

            // thay đổi mật khẩu
            $scope.update = function () {
                if ($scope.oldpass == undefined || $scope.oldpass === '') {
                    Notifi._error('Vui lòng nhập đúng mật khẩu cũ.');
                    return;
                } else {
                    let _oldpass = md5.createHash($scope.auth.Username + $scope.oldpass);
                    if ($scope.auth.Password === _oldpass) {
                        if ($scope.newpass === undefined || $scope.newpass === '') {
                            Notifi._error('Nhập mật khẩu mới để cập nhật mật khẩu.');
                            return;
                        } else {
                            let _newpass = md5.createHash($scope.auth.Username + $scope.newpass);
                            DataServices.Update($scope.auth.Username, _newpass).then(function (response) {
                                let data_result = response.data;
                                if (data_result.error_code === 0) {
                                    Notifi._success('Cập nhật thành công');
                                    $scope.oldpass = '';
                                    $scope.newpass = '';
                                    $('#update').modal('hide');
                                } else {
                                    Notifi._error('Có lỗi trong quá trình xử lý vui lòng thử lại sau');
                                    $scope.oldpass = '';
                                    $scope.newpass = '';
                                }
                            })
                            $('#chagepas').modal('hide');
                        }
                    } else {
                        Notifi._error('Mật khẩu cũ không đúng vui lòng thử lại.')
                        return;
                    }
                }
            }

            // tạo tài khoản
            $scope.signup = function (data) {
                if (data === undefined ||
                    data.uname === undefined ||
                    data.uname === '' ||
                    data.ufullname === undefined ||
                    data.ufullname === '' ||
                    data.uemail === undefined ||
                    data.uemail === '' ||
                    data.uphone === undefined ||
                    data.uphone === '' ||
                    data.urole === undefined ||
                    data.urole === "Choose...") {
                    Notifi._error('Nhập đầy đủ thông tin để tạo user.')
                    return;
                } else {

                    let pass = md5.createHash(data.uname + '12345678');
                    var role;
                    if (data.urole === '1') {
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
                    DataServices.signUp(data.uname, pass, data.ufullname, data.uemail, data.uphone, role).then(function (response) {
                        if (response.data.error_code === 0) {
                            Notifi._success('Tài khoản được tạo thành công.')
                            data.uname = '';
                            data.ufullname = '';
                            data.uemail = '';
                            data.uphone = '';
                            data.urole = '';
                        } if (response.data.error_code === 1) {
                            Notifi._error('Có lỗi trong quá trình xử lý vui lòng thử lại.')
                        } if (response.data.error_code === 2) {
                            Notifi._error('Username đã tồn tại vui lòng thử lại.')
                            data.uname = '';
                        }
                    })
                }
            }

            // thoát tài khoản
            $scope.logout = function () {
                localStorage.clear();
                $location.path('/login');
            }
        }
    })
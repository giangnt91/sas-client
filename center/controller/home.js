sas
.controller('HomeCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket, SMSService, $http) {
	// go manager
	$scope.go_manageruser = function () {
		$location.path('/manageruser');
	}
	
	$scope.go_managergroup = function () {
		$location.path('/managergroup');
	}
	
	$scope.go_connectgroup = function () {
		$location.path('/connectgroup');
	}
	
	// thời gian trùng
	$scope.list_time_dup = [
		{
			id: null,
			name: 'Chọn'
		},
		{
			id: 1,
			name: '30 Ngày'
		},
		{
			id: 2,
			name: '60 Ngày'
		},
		{
			id: 3,
			name: '90 Ngày'
		}
	]
	
	$scope.choose_time_dup = $scope.list_time_dup[0];
	$scope.Time_dupicate = function () {
		$scope.list_time_dup.forEach(element => {
			if ($rootScope.auth.TimeForAdmin !== null) {
				if (element.id === $rootScope.auth.TimeForAdmin.id) {
					$scope.choose_time_dup = $rootScope.auth.TimeForAdmin;
				}
			}
		});
		
		$location.path('/home');
		$timeout(function () {
			$('#timeduplicate').modal('show');
		}, 500)
	}
	
	$scope.updateTimeDup = function () {
		a = 0;
		DataServices.AllUser().then(function (u) {
			if (u.data.error_code === 0) {
				let _result = u.data.users;
				if (_result !== undefined) {
					_result.forEach(element => {
						let _dup = [];
						if ($scope.choose_time_dup.id !== null) {
							_dup = [{
								id: $scope.choose_time_dup.id,
								name: $scope.choose_time_dup.name
							}]
                            } else {
							_dup = [{
								id: element.TimeForAdmin[0].id,
								name: element.TimeForAdmin[0].name
							}]
						}
						element.TimeForAdmin = _dup;
						
						DataServices.UpdateUser(element).then(function (repsonse) {
							if (repsonse.data.error_code === 0) {
								DataServices.withOut($rootScope.auth._id).then(function (res) {
									if (res.data.error_code === 0) {
										$rootScope.auth = res.data.user;
										localStorage.setItem('Auth', JSON.stringify(res.data.user));
										$('#timeduplicate').modal('hide');
										$timeout(function () {
											window.history.back();
										}, 300)
									}
								})
								if (a !== 1) {
									Notifi._success('Cập nhật thành công');
									a = 1;
								}
								
                                } else {
								if (a !== 1) {
									Notifi._error('Có lỗi trong quá trình xử lý vui lòng thử lại sau');
									a = 1;
								}
							}
						})
					});
				}
			}
		})
		
	}
	
	$scope.close_Time = function () {
		$('#timeduplicate').modal('hide');
		$timeout(function () {
			window.history.back();
		}, 300)
	}
	
	
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
	function getCenter(){
		DataServices.GetCenter().then(function(response){
			if(response.data.error_code === 0){
				$scope.Center = [{
					Name: 'Chọn',
					Id: null
				}]
				response.data.center.forEach( element => {
					$scope.Center.push(element);
				})
			}
		});
	}
	getCenter();
	
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
		}
	]
	
	// trạng thái
	$scope.Status2 = [
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
	
	// custom tìm kiếm
	$timeout(function(){
		$scope.HCenter = $scope.Center[0];
	}, 500)
	
	$scope.HStatus = $scope.Status[0];
	
	$scope.Searchwith = function () {
		var HStatus;
		var hregday;
		var hregday2;
		var HCenter;
		
		var _hregday = $('#hregday').val();
		var _hregday2 = $('#hregday2').val();
		
		if (_hregday === '') {
			hregday = null;
            } else {
			hregday = _hregday;
		}
		
		if (_hregday2 === '') {
			hregday2 = null;
            } else {
			hregday2 = _hregday2;
		}
		
		
		if ($scope.HCenter !== null) {
			if ($scope.HCenter.Id !== null) {
				HCenter = $scope.HCenter._id;
                } else {
				HCenter = null;
			}
			
            } else {
			HCenter = null;
		}
		
		if ($scope.HStatus !== null) {
			if ($scope.HStatus.value !== null) {
				HStatus = $scope.HStatus.value;
                } else {
				HStatus = null;
			}
			
            } else {
			HStatus = null;
		}
		
		DataServices.SearchH($rootScope.auth.Role, $rootScope.auth.Username, hregday, hregday2, HCenter, HStatus).then(function (response) {
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
		$('#hregday').val(null);
		$('#hregday2').val(null);
		$scope.HCenter = $scope.Center[0];
		$scope.HStatus = $scope.Status[0];
		getStudent($rootScope.auth.Username, $rootScope.auth.Role);
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
	function CstudentF(Fullname, Email, Phone, Sex, Address, Regday, Note, Center, Appointment_day, Appointment_dayiso, Appointment_time, Status_student, Manager) {
		DataServices.CstudentF(Fullname, Email, Phone, Sex, Address, Regday, Note, Center, Appointment_day, Appointment_dayiso, Appointment_time, Status_student, Manager).then(function (response) {
			if (response.data.error_code === 0) {
				getStudent($rootScope.auth.Username, $rootScope.auth.Role);
				$scope.friendId = response.data._id;
				update_student($scope._details);
				Notifi._success('Tạo học viên thành công.');
				} else if (response.data.error_code === 1) {
				Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.');
				} else if (response.data.error_code === 2) {
				Notifi._error('Số điện thoại đã tồn tại không thể tạo học viên.');
			}
		})
	}
	
	// tạo học viên bình thường
	function Cstudent(Fullname, Email, Phone, Sex, Address, Regday, Note, Center, Appointment_day, Appointment_dayiso, Appointment_time, Status_student, Manager) {
		DataServices.CstudentF(Fullname, Email, Phone, Sex, Address, Regday, Note, Center, Appointment_day, Appointment_dayiso, Appointment_time, Status_student, Manager).then(function (response) {
			if (response.data.error_code === 0) {
				getStudent($rootScope.auth.Username, $rootScope.auth.Role);
				Notifi._success('Tạo học viên thành công.');
                } else if (response.data.error_code === 1) {
				Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.');
                } else if (response.data.error_code === 2) {
				Notifi._error('Số điện thoại đã tồn tại không thể tạo học viên.');
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
		});
		
		
		// auto duplicate
		Thesocket.on('duplicate', function (list_duplicate) {
			var last_id = localStorage.getItem('last_id');;
			if (list_duplicate.length > 0) {
				list_duplicate.forEach(element => {
					if (element.teleid === $rootScope.auth.Username) {
						localStorage.setItem('last_id', element.teleid);
						if (last_id !== element.teleid) {
							Notifi._notifi(
							'Học viên ' + element.student + '<br> có số điện thoại ' + element.stphone + '<br> đã được đăng ký vào lúc ' + element.pretime + ' <br> bởi ' + element.prename + ' có Username là ' + element.preid
							)
						}
					}
				});
			}
		})
		// end
		
		getStudent($rootScope.auth.Username, $rootScope.auth.Role);
		// getSale($rootScope.auth.Username);
		// thông tin chi tiết của học viên
		$scope.detail = function detailStudent(id) {
			
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
							if ($scope.Center[i]._id === element.Center[0]._id) {
								$scope.selectedCenter = $scope.Center[i];
							}
						}
                    } else {
						$scope.selectedCenter = $scope.Center[0];
					}
					
					// kiểm tra trạng thái
					if (element.Status_student !== null) {
						if(element.Status_student[0].id !== 3){
							for (let i = 0; i < $scope.Status.length; i++) {
								if ($scope.Status[i].value === element.Status_student[0].id) {
									$scope.selectedStatus = $scope.Status[i];
								}
							}
						}else if(element.Status_student[0].id === 3){
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
								}
							]
							for (let i = 0; i < $scope.Status.length; i++) {
								if ($scope.Status[i].value === element.Status_student[0].id) {
									$scope.selectedStatus = $scope.Status[i];
								}
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
						_id: $scope.selectedCenter._id,
						SheetId: $scope.selectedCenter.SheetId,
						Name: $scope.selectedCenter.Name,
						Id: $scope.selectedCenter.Id, 
						Info: $scope.selectedCenter.Info
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
		
		// Cập nhật user header
		$scope.updateheaderUser = function () {
			$location.path('/home');
			$timeout(function () {
				$('#update').modal('show');
			}, 500)
		}
		
		// Thêm user header
		$scope.addheaderUser = function () {
			$('#user').modal('show');
		}
		
		// Thêm bạn header
		$rootScope.addheader = function () {
			$location.path('/home');
			$timeout(function () {
				$('#add').modal('show');
			}, 500)
			
		}
		
		// Thêm bạn 2
		$scope.addfriend = function (id) {
			$scope.addselectedCenter = $scope.Center[0];
			$scope.addselectedStatus = $scope.Status[0];
			$scope.addselectedTime = $scope.Appointment_time[0];
			$scope.addselectedAddress = $scope.Address[0];
			$scope.addselectedSex = $scope.Sex[0];
			$scope.addNote = "Bạn của học viên " + id;
			$('#add2').modal('show');
		}
		
		$scope.addnewfromaddFriend = function (data) {
			var _tmpregday = $('#adddayreg').val();
			var _tmpdayhen = $('#addngayhen').val();
			var _manager = [{
				id: $scope.auth.Username,
				name: $scope.auth.Fullname,
				sheetId: null,
				mid: null,
				mname: null
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
						_id: $scope.addselectedCenter._id,
						SheetId: $scope.addselectedCenter.SheetId,
						Name: $scope.addselectedCenter.Name,
						Id: $scope.addselectedCenter.Id,
						Info: $scope.addselectedCenter.Info
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
		
		// Thêm học viên mới
		$scope.maddselectedSex = $scope.Sex[0];
		$scope.maddselectedAddress = $scope.Address[0];
		$timeout(function(){
			$scope.maddselectedCenter = $scope.Center[0];
		}, 500)
		
		$scope.maddselectedStatus = $scope.Status2[0];
		$scope.maddselectedTime = $scope.Appointment_time[0];
		$scope.AddStudent = function (data) {
			
			var _tmpregday = $('#madddayreg').val();
			var _tmpdayhen = $('#maddngayhen').val();
			var _manager = [{
				id: $scope.auth.Username,
				name: $scope.auth.Fullname,
				sheetId: null,
				mid: null,
				mname: null
			}]
			if (data === undefined ||
			data.fullname === undefined ||
			data.email === undefined ||
			data.phone === undefined ||
			$scope.maddselectedSex === undefined ||
			$scope.maddselectedAddress === undefined ||
			_tmpregday === ''
			) {
				Notifi._error('Nhập đầy đủ thông tin để tạo user.')
				return;
				} else {
				
				let regday = convertup(_tmpregday);
				
				var tmp_center;
				var tmp_status;
				var henday;
				var hendayiso;
				var tmp_time;
				
				let tmp_sex = [{
					id: $scope.maddselectedSex.value,
					name: $scope.maddselectedSex.name
				}]
				let tmp_address = [{
					id: $scope.maddselectedAddress.value,
					name: $scope.maddselectedAddress.name
				}]
				
				if ($scope.maddselectedCenter !== undefined) {
					tmp_center = [{
						_id: $scope.maddselectedCenter._id,
						SheetId: $scope.maddselectedCenter.SheetId,
						Name: $scope.maddselectedCenter.Name,
						Id: $scope.maddselectedCenter.Id,
						Info: $scope.maddselectedCenter.Info
					}]
					} else {
					tmp_center = null;
				}
				
				if ($scope.maddselectedStatus !== undefined) {
					tmp_status = [{
						id: $scope.maddselectedStatus.value,
						name: $scope.maddselectedStatus.name
					}]
					} else {
					tmp_status = {
						id: 0,
						name: 'Chưa đăng ký'
					}
				}
				
				if ($scope.maddselectedTime !== undefined) {
					tmp_time = [{
						id: $scope.maddselectedTime.value,
						name: $scope.maddselectedTime.name
					}]
					} else {
					tmp_time = null;
				}
				
				if (_tmpdayhen !== '') {
					henday = convertup(_tmpdayhen);
					hendayiso = _tmpdayhen;
					} else {
					henday = null;
					hendayiso = null;
				}
				
				if ($scope.maddNote === undefined || $scope.maddNote === '') {
					$scope.maddNote = null;
				}
				
				Cstudent(data.fullname, data.email, data.phone, tmp_sex, tmp_address, regday, $scope.maddNote, tmp_center, henday, hendayiso, tmp_time, tmp_status, _manager);
			}
		}
		
		// thay đổi mật khẩu
		$scope._close = function () {
			window.history.back();
			window.location.reload(true);
		}
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
								
								$timeout(function () {
									alert('Đăng nhập lại để mật khẩu mới có hiệu lực !');
									$location.path('/login');
								}, 500)
								
								
								} else {
								Notifi._error('Có lỗi trong quá trình xử lý vui lòng thử lại sau');
								$scope.oldpass = '';
								$scope.newpass = '';
							}
						})
						
						// $timeout(function () {
						//     $location.path('/login');
						//     window.location.reload(true);
						// }, 1500)
						
						// $('#chagepas').modal('hide');    
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
		
		// Điện thoại
		$scope.openPhoneTab = function (Phone) {
			var top = window.screen.height - 300;
			top = top > 0 ? top / 2 : 0;
			
			var left = window.screen.width - 400;
			left = left > 0 ? left / 2 : 0;
			
			let url = 'http://sascall.slk.vn/?phone=' + Phone + '&user=' + $rootScope.auth.Username + '&pass=' + $rootScope.auth.Password
			var ThePhone = window.open(url, "Upload Chapter content", "width=540,height=540" + ",top=" + top + ",left=" + left);
			ThePhone.moveTo(left, top);
			ThePhone.focus();
		}
		
		// SMS Service
		function change_alias(alias) {
			var str = alias;
			str = str.toLowerCase();
			str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
			str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
			str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
			str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
			str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
			str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
			str = str.replace(/đ/g, "d");
			str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
			str = str.replace(/ + /g, " ");
			str = str.trim();
			return str;
		}
		
		function get_day() {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1; //January is 0!
			var yyyy = today.getFullYear();
			
			if (dd < 10) {
				dd = '0' + dd
			}
			
			if (mm < 10) {
				mm = '0' + mm
			}
			
			today = dd + '/' + mm + '/' + yyyy;
			return today;
		}
		
		
		function get_time() {
			var time = new Date();
			let tmp = (time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
			return tmp;
		}
		
		
		$scope.showsms = function (data) {
			$scope.content = data;
			$scope._phone = data.Phone;
			get_sms();
			$('#sms').modal('show');
		}
		
		$scope.send = function (data) {
			SMSService.SendSMS($scope._phone, $scope.nd_sms_mau).then(function (resms) {
				let _result = parseInt(resms.data);
				if (_result > 0) {
					h = get_time();
					d = get_day();
					let _day = h + ' ' + d;
					let _sms = {
						SendUser: $rootScope.auth.Username,
						SendFullname: $rootScope.auth.Fullname,
						SMS: $scope.nd_sms_mau,
						Time: _day,
						_Status: 'gửi thành công'
					}
					
					if ($scope.content.SMS !== undefined) {
						if ($scope.content.SMS !== null) {
							$scope.content.SMS.unshift(_sms);
							$scope.content.SMS = angular.fromJson(angular.toJson($scope.content.SMS));
							} else {
							$scope.content.SMS = [_sms];
						}
					}
					
					DataServices.UpStudent($scope.content).then(function (response) {
						if (response.data.error_code === 0) {
							Notifi._success('Gửi tin nhắn thành công.');
							getStudent($rootScope.auth.Username, $rootScope.auth.Role);
						}
					})
					} else {
					switch (parseInt(_result)) {
						case -1:
						Notifi._error('Chưa nhập đầy đủ thông tin các trường');
						break;
						case -2:
						Notifi._error('Không thể kết nối máy chủ trong thời gian này');
						break;
						case -3:
						Notifi._error('Thông tin tài khoản chưa chính xác');
						break;
						case -4:
						Notifi._error('Tài khoản đang bị khoá');
						break;
						case -5:
						Notifi._error('Thông tin xác thực tài khoản chưa chính xác (mã lập trình)');
						break;
						case -6:
						Notifi._error('Chức năng gửi API chưa được kích hoạt');
						break;
						case -7:
						Notifi._error('IP bị giới hạn truy cập');
						break;
						case -8:
						Notifi._error('Tên người gửi (from) chưa được khai báo.)');
						break;
						case -9:
						Notifi._error('Tài khoản hết credits gửi tin (dành cho trả trước)');
						break;
						case -10:
						Notifi._error('Số điện thoại không đúng');
						break;
						case -11:
						Notifi._error('Số điện thoại nằm trong danh sách từ chối nhận tin');
						break;
						case -14:
						Notifi._error('Tin nhắn có chứa nội dung quảng cáo');
						break;
						case -16:
						Notifi._error('Không được gửi liên tục số ĐT này');
						break;
						case -18:
						Notifi._error('Nội dung có chứa quảng cáo');
						break;
					}
					
				}
			})
		}
		
		$scope.clear_sms = function () {
			$scope.nd_sms_mau = '';
		}
		
		// định nghĩa thay từ khóa trong tin nhắn mẫu
		let gioi_tinh = '#@gioitinh';
		let _name = '#@name';
		let thoigiantest = '#@thoigiantest';
		let coso = '#@coso';
		let thoigiantest2 = '#@thoigiantest2';
		
		function replace_sms_string(nd) {
			for (let i = 0; i < nd.length; i++) {
				nd = nd.replace(_name, change_alias($scope._details.Fullname));
				
				if ($scope._details.Sex !== null) {
					if ($scope._details.Sex[0].id === 1) {
						nd = nd.replace(gioi_tinh, 'Anh')
					}
					if ($scope._details.Sex[0].id === 2) {
						nd = nd.replace(gioi_tinh, 'Chi')
                        } if ($scope._details.Sex[0].id === null) {
						nd = nd.replace(gioi_tinh, 'A/C')
					}
					
					} else {
					nd = nd.replace(gioi_tinh, 'A/C');
				}
				
				if ($scope._details.Appointment_time !== null) {
					nd = nd.replace(thoigiantest, $scope._details.Appointment_time[0].name)
					} else {
					nd = nd.replace(thoigiantest, 'thoi gian thich hop')
				}
				
				if ($scope._details.Appointment_day !== null) {
					nd = nd.replace(thoigiantest2, $scope._details.Appointment_day)
					} else {
					nd = nd.replace(thoigiantest2, 'thoi gian thich hop')
				}
				
				if ($scope._details.Center !== null) {
					nd = nd.replace(coso, change_alias($scope._details.Center[0].name))
					} else {
					nd = nd.replace(coso, 'trung tam SAS gan nhat')
				}
			}
			
			return nd;
		}
		
		function get_sms() {
			DataServices.GetSMSDemo().then(function (response) {
				if (response.data.error_code === 0) {
					$scope.Mau = response.data.sms;
					$scope.nd_sms_mau = replace_sms_string($scope.Mau[0].SMS);
				}
			})
		}
		
		
		$scope.GetMau = function () {
			$('#smsmau').modal('show');
		}
		
		$scope.chonmau = function (data) {
			let tmp_nd = data.SMS;
			$scope.nd_sms_mau = replace_sms_string(tmp_nd);
			$('#smsmau').modal('hide');
		}
		
	}
})						
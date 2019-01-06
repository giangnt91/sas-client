sas
.controller('CalendarCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, DTColumnBuilder, Thesocket, SMSService) {
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
	$scope.Sex = [{
			name: 'Chọn',
			value: null
		}, {
			name: 'Nam',
			value: 1
		}, {
			name: 'Nữ',
			value: 0
		}
	];

	// địa chỉ
	$scope.Address = [{
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
	function getCenter() {
		DataServices.GetCenter().then(function (response) {
			if (response.data.error_code === 0) {
				$scope.Center = [{
						Name: 'Chọn',
						Id: null
					}
				]
				response.data.center.forEach(element => {
					$scope.Center.push(element);
				})
			}
		});
	}
	getCenter();

	// trạng thái

	$scope.Status = [{
			name: 'Chọn',
			value: null
		}, {
			name: 'Chưa đăng ký',
			value: 0
		}, {
			name: 'Không tiềm năng',
			value: 1
		}, {
			name: 'Đến chưa đăng ký',
			value: 2
		}, {
			name: 'Hủy',
			value: 4
		}
	]

	// giờ hẹn
	$scope.Appointment_time = [{
			name: 'Chọn',
			value: null
		}, {
			name: '8:00',
			value: 1
		}, {
			name: '8:30',
			value: 2
		}, {
			name: '9:00',
			value: 3
		}, {
			name: '9:30',
			value: 4
		}, {
			name: '10:00',
			value: 5
		}, {
			name: '10:30',
			value: 6
		}, {
			name: '11:00',
			value: 7
		}, {
			name: '11:30',
			value: 8
		}, {
			name: '12:00',
			value: 9
		}, {
			name: '12:30',
			value: 10
		}, {
			name: '13:00',
			value: 11
		}, {
			name: '13:30',
			value: 12
		}, {
			name: '14:00',
			value: 13
		}, {
			name: '14:30',
			value: 14
		}, {
			name: '15:00',
			value: 15
		}, {
			name: '15:30',
			value: 16
		}, {
			name: '16:00',
			value: 17
		}, {
			name: '16:30',
			value: 18
		}, {
			name: '17:00',
			value: 19
		}, {
			name: '17:30',
			value: 20
		}, {
			name: '18:00',
			value: 21
		}, {
			name: '18:30',
			value: 22
		}, {
			name: '19:00',
			value: 23
		}, {
			name: '19:30',
			value: 24
		}, {
			name: '20:00',
			value: 25
		}, {
			name: '20:30',
			value: 26
		}, {
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
						}
					];
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
		if ($scope.Center !== undefined) {
			$scope.proCenter = $scope.Center[0];
		}

		if ($scope.Users !== undefined) {
			$scope.proSale = $scope.Users[0];
		}
	}, 1000)
	$scope.proAddress = $scope.Address[0];

	$scope.proSearch = function () {

		let a = 0;

		// đặt trước mới có thể reload ajax dc
		$scope.dtInstance.DataTable.ajax.reload();

		$scope.newdtOptions = DTOptionsBuilder.newOptions()
			.withFnServerData(serverData)
			.withDataProp('data')
			.withOption('processing', true)
			.withOption('serverSide', true)
			.withPaginationType('full_numbers')
			.withDisplayLength(10)
			.withOption('bLengthChange', true)
			.withOption('iDisplayLength', 10)
			.withDOM('Zlfrtip')
			.withOption('createdRow', function (row, data, dataIndex) {
				$(row).children(':nth-child(10)').addClass('text-center');
				$(row).children(':nth-child(1)').addClass('text-center');
			})
			.withOption('rowCallback', function (row, data, dataIndex) {
				$('td', row).unbind('click');
				$('td', row).bind('click', function () {
					$scope.$apply(function () {
						$scope.detail(data._id);
						$scope.checkDuplicator(data, 1);
					});
				});
				return row;
			});

		function serverData(sSource, aoData, fnCallback, oSettings) {

			let proname;
			let procenter;
			let prosale;
			let proadress;

			if ($scope.proName !== undefined && $scope.proName !== '') {
				proname = $scope.proName;
			} else {
				proname = '';
			}

			if ($scope.proCenter.Id !== null) {
				procenter = $scope.proCenter._id;
			} else {
				procenter = null;
			}

			proadress = $scope.proAddress.value;

			if ($scope.proSale !== undefined) {
				prosale = $scope.proSale.id;
			}

			//All the parameters you need is in the aoData variable
			var draw = aoData[0].value;
			var order = aoData[2].value;
			var start = aoData[3].value;
			var length = aoData[4].value;
			var search = aoData[5].value;

			DataServices.SearchPro(proname, procenter, proadress, prosale, start, length, search).then(function (response) {
				if (response.data.error_code === 0) {
					var _list_student = [];
					response.data.students.forEach(element => {
						if (element.Appointment_day !== null) {
							_list_student.push(element);
						}
					});

					if (a === 0) {
						Notifi._success('Lọc dữ liệu thành công');
					}
					a = 1;
					if (_list_student.length > 0) {
						$scope.list_student = _list_student;
						var records = {
							'draw': draw,
							'recordsTotal': response.data.total,
							'recordsFiltered': response.data.filtered,
							'data': response.data.students
						};
						fnCallback(records);
					}
				} else if (response.data.error_code === 1) {
					Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.')
					var records = {
						'draw': draw,
						'recordsTotal': 0,
						'recordsFiltered': 0,
						'data': 0
					};
					fnCallback(records);
				} else if (response.data.error_code === 2) {
					Notifi._error('Không có dữ liệu phù hợp với thông số tìm kiếm')
					var records = {
						'draw': draw,
						'recordsTotal': 0,
						'recordsFiltered': 0,
						'data': 0
					};
					fnCallback(records);
				}
			});
		}
	}

	$timeout(function () {
		if ($scope.Users !== undefined) {
			$scope.Csale = $scope.Users[0];
		}
	}, 1000)

	$scope.Searchwith = function () {

		let a = 0;
		$scope.dtInstance.DataTable.ajax.reload();

		$scope.newdtOptions = DTOptionsBuilder.newOptions()
			.withFnServerData(serverData)
			.withDataProp('data')
			.withOption('processing', true)
			.withOption('serverSide', true)
			.withPaginationType('full_numbers')
			.withDisplayLength(10)
			.withOption('bLengthChange', true)
			.withOption('iDisplayLength', 10)
			.withDOM('Zlfrtip')
			.withOption('createdRow', function (row, data, dataIndex) {
				$(row).children(':nth-child(10)').addClass('text-center');
				$(row).children(':nth-child(1)').addClass('text-center');
			})
			.withOption('rowCallback', function (row, data, dataIndex) {
				$('td', row).unbind('click');
				$('td', row).bind('click', function () {
					$scope.$apply(function () {
						$scope.detail(data._id);
						$scope.checkDuplicator(data, 1);
					});
				});
				return row;
			});

		function serverData(sSource, aoData, fnCallback, oSettings) {

			var Csale;
			var Cday;
			var Cday2;

			var _Cday = $('#Cday').val();
			var _Cday2 = $('#Cday2').val();

			if (_Cday !== '') {
				Cday = convertshow(_Cday);
			} else {
				Cday = null;
			}

			if (_Cday2 !== '') {
				Cday2 = convertshow(_Cday2);
			} else {
				Cday2 = null;
			}

			if ($scope.Csale !== null && $scope.Csale !== undefined) {
				if ($scope.Csale.id !== null) {
					Csale = $scope.Csale.id;
				} else {
					Csale = null;
				}

			} else {
				Csale = null;
			}

			//All the parameters you need is in the aoData variable
			var draw = aoData[0].value;
			var order = aoData[2].value;
			var start = aoData[3].value;
			var length = aoData[4].value;
			var search = aoData[5].value;

			DataServices.SearchC($rootScope.auth.Role, $rootScope.auth.Username, Cday, Cday2, Csale, start, length, search).then(function (response) {
				if (response.data.error_code === 0) {
					$scope.list_student = response.data.students;
					if (a === 0) {
						Notifi._success('Lọc dữ liệu thành công');
					}
					a = 1;

					var records = {
						'draw': draw,
						'recordsTotal': response.data.total,
						'recordsFiltered': response.data.filtered,
						'data': response.data.students
					};
					fnCallback(records);
				} else if (response.data.error_code === 1) {
					if (a === 0) {
						Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.')
					}
					a = 1;

					var records = {
						'draw': draw,
						'recordsTotal': 0,
						'recordsFiltered': 0,
						'data': 0
					};
					fnCallback(records);
				} else if (response.data.error_code === 2) {
					if (a === 0) {
						Notifi._error('Không có dữ liệu phù hợp với thông số tìm kiếm')
					}
					a = 1;

					var records = {
						'draw': draw,
						'recordsTotal': 0,
						'recordsFiltered': 0,
						'data': 0
					};
					fnCallback(records);
				}
			});
		}
	}

	$scope.Clear = function () {
		$scope.Csale = $scope.Users[0];
		// $('#Cday').val(null);
		// $('#Cday2').val(null);
		var d = new Date();
        var currMonth = d.getMonth();
        var currYear = d.getFullYear();
        var startDate = new Date(currYear, currMonth, 1);

        $("#Cday").datepicker({
            changeYear: true,
            changeMonth: true,
            dateFormat: "dd/mm/yy"
        }).datepicker("setDate", startDate);

        $("#Cday2").datepicker({
            changeYear: true,
            changeMonth: true,
            dateFormat: "dd/mm/yy"
        }).datepicker("setDate", new Date());

		$scope.proAddress = $scope.Address[0];
		$scope.proCenter = $scope.Center[0];
		$scope.proName = '';
		$scope.proSale = $scope.Users[0];
		// $scope.list_student = $scope.clearList;
		getStudent($rootScope.auth.Username, $rootScope.auth.Role);
	}

	// lấy danh sách học viên
	function getStudent(username, role) {

		function renderTime(data, type, row, meta) {
			// if (row.Regtime === null) {
			// 	return row.Regday;
			// } else {
			// 	return row.Regday + ' ' + row.Regtime;
			// }
			return row.Appointment_day;
		}

		function index(data, type, row, meta) {
			return meta.row + 1;
		}

		function render(data) {
			return ' <a href="#" class="btn cbtn cbtn-left sas-bk btn-sm" data-tooltip="' + data[0].name + '"> ' + data[0].id + '</a>';
		}

		$scope.dtInstance = {};

		$scope.dtColumns = [
			DTColumnBuilder.newColumn('').withTitle('STT').renderWith(index),
			DTColumnBuilder.newColumn('Regday').withTitle('Time').renderWith(renderTime),
			DTColumnBuilder.newColumn('_id').withTitle('ID'),
			DTColumnBuilder.newColumn('Fistname').withTitle('Họ'),
			DTColumnBuilder.newColumn('Lastname').withTitle('Tên'),
			DTColumnBuilder.newColumn('Sex[0].name').withTitle('Giới tính'),
			DTColumnBuilder.newColumn('Phone').withTitle('Số điện thoại'),
			DTColumnBuilder.newColumn('Note').withTitle('Ghi chú'),
		];

		$scope.newdtOptions = DTOptionsBuilder.newOptions()
			.withFnServerData(serverData)
			.withDataProp('data')
			.withOption('processing', true)
			.withOption('serverSide', true)
			.withPaginationType('full_numbers')
			.withDisplayLength(10)
			.withOption('bLengthChange', true)
			.withOption('iDisplayLength', 10)
			.withDOM('Zlfrtip')
			.withOption('Destroy', true)
			.withOption('createdRow', function (row, data, dataIndex) {
				$(row).children(':nth-child(10)').addClass('text-center');
				$(row).children(':nth-child(1)').addClass('text-center');
			})
			.withOption('rowCallback', function (row, data, dataIndex) {
				$('td', row).unbind('click');
				$('td', row).bind('click', function () {
					$scope.$apply(function () {
						$scope.detail(data._id);
						$scope.checkDuplicator(data, 1);
					});
				});
				return row;
			});

		function serverData(sSource, aoData, fnCallback, oSettings) {

			//All the parameters you need is in the aoData variable
			var draw = aoData[0].value;
			var order = aoData[2].value;
			var start = aoData[3].value;
			var length = aoData[4].value;
			var search = aoData[5].value;

			var cd = new Date();
			var currMonth = cd.getMonth();
			var currYear = cd.getFullYear();
			var startDate = new Date(currYear, currMonth, 1);
			
			if($scope.detect === undefined){
				DataServices.SearchC(role, username, startDate, null, null, start, length, search).then(function (response) {
					if (response.data.error_code === 0) {
						$scope.list_student = response.data.students;
						$scope.detect = 1;

						var records = {
							'draw': draw,
							'recordsTotal': response.data.total,
							'recordsFiltered': response.data.filtered,
							'data': response.data.students
						};
						fnCallback(records);
					} else if (response.data.error_code === 1) {
						$scope.detect = 1;

						var records = {
							'draw': draw,
							'recordsTotal': 0,
							'recordsFiltered': 0,
							'data': 0
						};
						fnCallback(records);
					} else if (response.data.error_code === 2) {
						$scope.detect = 1;

						var records = {
							'draw': draw,
							'recordsTotal': 0,
							'recordsFiltered': 0,
							'data': 0
						};
						fnCallback(records);
					}
				});
			}
		}
	}

	// tạo học viên mới từ thêm bạn
	function CstudentF(Fistname, Lastname, Fullname, Email, Phone, Sex, Address, Regday, Note, Center, Appointment_day, Appointment_time, Status_student, Manager) {
		DataServices.CstudentF(Fistname, Lastname, Fullname, Email, Phone, Sex, Address, Regday, Note, Center, Appointment_day, Appointment_time, Status_student, Manager).then(function (response) {
			if (response.data.error_code === 0) {
				$timeout(function () {
					getStudent($rootScope.auth.Username, $rootScope.auth.Role);
				}, 1000);

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

	// kiểm tra số điện thoại khi nhập
	$scope.checkphone = function (sdt) {
		if (sdt.toString().length > 8) {
			DataServices.SearchByPhone(sdt, 0, 10, {value: ''}).then(function (response) {
				if (response.data.error_code === 0) {
					var list = [];
					response.data.students.forEach(element => {
						if (element.Duplicate === null) {
							list.push(element);
						}
					})
					$scope.Duplicator = list;
					$timeout(function () {
						$('#addduplicator').modal('show');
					}, 300);
					// response.data.students.forEach(element =>{
					// Notifi._error('Số điện thoại đã được nhập ngày '+ element.Regday +'<br/> cho học viên '+ element.Fullname +'<br/> bởi '+ element.Manager[0].name + ' - '+ element.Manager[0].id);
					// })
				}
			});
		}
	}

	// kiểm tra học viên trùng
	$scope.checkDuplicator = function (data, id) {
		if (id === 1) {
			if (data.Duplicate !== null) {
				DataServices.SearchByPhone(data.Phone, 0, 10, {value: ''}).then(function (response) {
					if (response.data.error_code === 0) {
						if (response.data.students.length > 0) {
							var list = [];
							response.data.students.forEach(element => {
								if (element.Duplicate === null) {
									list.push(element);
								}
							})
							$scope.Duplicator = list;
							$timeout(function () {
								$('#duplicator').modal('show');
							}, 300);
						}
					}
				})
			}
		} else {
			DataServices.SearchByPhone(data.Phone, 0, 10, {value: ''}).then(function (response) {
				if (response.data.error_code === 0) {
					if (response.data.students.length > 0) {
						var list = [];
						response.data.students.forEach(element => {
							if (element.Duplicate === null) {
								list.push(element);
							}
						})
						$scope.Duplicator = list;
						$timeout(function () {
							$('#duplicator').modal('show');
						}, 300);
					}
				}
			})
		}
	}

	// chuyển học viên cho sale cũ quản lý
	$scope.sendStudent = function (data) {
		let manager = [{
				mname: $scope._details.Manager[0].mname,
				mid: $scope._details.Manager[0].mid,
				sheetId: $scope._details.Manager[0].sheetId,
				gtele: $scope._details.Manager[0].gtele,
				name: data.Manager[0].name,
				id: data.Manager[0].id
			}
		]

		$scope._details.Manager = manager;
		DataServices.SendStudentById(angular.fromJson(angular.toJson($scope._details))).then(function (response) {
			if (response.data.error_code === 0) {
				Notifi._success('Chuyển học viên thành công');
			} else {
				Notifi._error('Có lỗi trong quá trình xử lý vui lòng thử lại');
			}
		});
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

				$timeout(function () {
					getStudent($rootScope.auth.Username, $rootScope.auth.Role);
				}, 1000);

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
													'Học viên ' + el.Fullname + '<br> có ID ' + el._id + '<br> cần được liên hệ vào lúc ' + element.time)
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

			$scope.list_student.forEach(element => {
				if (element._id === id) {
					$scope._details = element;
					$scope._lastPhone = element.Phone;
					$scope._lastnote = element.Note;

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
					if ($scope._details.Regday !== null) {
						$('#dayreg2').val(convertshow($scope._details.Regday));
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
						if (element.Status_student[0].id !== 3) {
							for (let i = 0; i < $scope.Status.length; i++) {
								if ($scope.Status[i].value === element.Status_student[0].id) {
									$scope.selectedStatus = $scope.Status[i];
								}
							}
						} else if (element.Status_student[0].id === 3) {
							// trạng thái
							$scope.Status = [{
									name: 'Chọn',
									value: null
								}, {
									name: 'Chưa đăng ký',
									value: 0
								}, {
									name: 'Không tiềm năng',
									value: 1
								}, {
									name: 'Đến chưa đăng ký',
									value: 2
								}, {
									name: 'Đã đăng ký',
									value: 3
								}, {
									name: 'Hủy',
									value: 4
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
			$timeout(function () {
				$('#detail').modal('hide');
			}, 500)
		}

		// cập nhật thông tin học viên
		$scope.up_detail = function () {

			// kiểm tra thay đổi số điện thoại
			if ($scope._details.Phone !== $scope._lastPhone) {
				let d = new Date();
				let _day = d.getDate();
				let _month = d.getMonth() + 1;
				let _year = d.getFullYear();
				let _h = d.getHours();
				let _m = d.getMinutes();
				let _s = d.getSeconds();
				let today = _h + ':' + _m + ':' + _s + ' ' + _day + '/' + _month + '/' + _year;

				var _edit = {
					Username: $rootScope.auth.Username,
					Fullname: $rootScope.auth.Fullname,
					Lastphone: $scope._lastPhone,
					Newphone: $scope._details.Phone,
					Daychange: today
				}

				if ($scope._details.EditHistory !== null) {
					var tmphistory = $scope._details.EditHistory;
					tmphistory.unshift(_edit);
					$scope._details.EditHistory = angular.fromJson(angular.toJson(tmphistory));
				} else {
					$scope._details.EditHistory = _edit;
				}
			}

			// kiểm tra ngày báo danh
			// let _tmpdaybd = $('#dayreg2').val();
			// if (_tmpdaybd !== '') {
			// $scope._details.Regday2 = convertup(_tmpdaybd);
			// }

			// kiểm tra địa chỉ
			if ($scope.selectedAddress !== null) {
				var tmpAddress = [{
						id: $scope.selectedAddress.value,
						name: $scope.selectedAddress.name
					}
				]
				$scope._details.Address = tmpAddress;
			}

			// kiểm tra giới tính
			if ($scope.selectedSex !== null) {
				var tmpSex = [{
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
			} else {
				$scope._details.Appointment_day = null;
				$scope._details.Appointment_dayiso = null;
			}

			// kiểm tra cơ sở
			if ($scope.selectedCenter !== null) {
				var tmpCenter = [{
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
				var tmpStatus = [{
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
				var tmpTime = [{
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

			update_student(angular.fromJson(angular.toJson($scope._details)));
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
					tmpTime = [{
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
					tmpTime = [{
							id: $scope.selectedTime2.value,
							name: $scope.selectedTime2.name
						}
					]
				}

				var time_recall = [{
						day: _day,
						time: tmpTime
					}
				]

				$scope._details.Time_recall = time_recall;
			}
			update_student($scope._details);
			$timeout(function () {
				$('#time').modal('hide');
			}, 500)
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
			$scope.addselectedCenter = $scope.Center[0];
			$scope.addselectedStatus = $scope.Status[0];
			$scope.addselectedTime = $scope.Appointment_time[0];
			$scope.addselectedAddress = $scope.Address[0];
			$scope.addselectedSex = $scope.Sex[0];
			$scope.addNote = "Bạn của học viên " + id;
			$('#add2').modal('show');
		}

		$scope.addnewfromaddFriend = function (data) {
			// var _tmpregday = $('#adddayreg').val();
			var today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth() + 1;
			let yyyy = today.getFullYear();
			if (dd < 10) {
				dd = '0' + dd
			}
			if (mm < 10) {
				mm = '0' + mm
			}
			let regday = dd + '/' + mm + '/' + yyyy;

			var _tmpdayhen = $('#addngayhen').val();
			var _manager = [{
					id: $scope.auth.Username,
					name: $scope.auth.Fullname,
					sheetId: null,
					gtele: $rootScope.auth.Zone[0].id,
					mid: null,
					mname: null
				}
			]
			if (data === undefined ||
				data.fullname === undefined ||
				data.phone === undefined ||
				$scope.addselectedSex === undefined ||
				$scope.addselectedAddress === undefined ||
				_tmpregday === '') {
				Notifi._error('Nhập đầy đủ thông tin để tạo user.')
				return;
			} else {
				$scope._fullname = data.fullname;
				var henday;
				var tmp_center;
				var tmp_status;
				var tmp_time;
				var tmp_email;
				var tmp_fistname;
				var tmp_lastname;

				if (data.fistname !== undefined) {
					tmp_fistname = data.fistname;
				} else {
					tmp_fistname = '';
				}

				if (data.lastname !== undefined) {
					tmp_lastname = data.lastname;
				} else {
					tmp_lastname = '';
				}

				if (data.email !== undefined) {
					tmp_email = data.email;
				} else {
					tmp_email = '';
				}

				// let regday = convertup(_tmpregday);

				let tmp_sex = [{
						id: $scope.addselectedSex.value,
						name: $scope.addselectedSex.name
					}
				]
				let tmp_address = [{
						id: $scope.addselectedAddress.value,
						name: $scope.addselectedAddress.name
					}
				]

				if ($scope.addselectedCenter !== undefined) {
					tmp_center = [{
							_id: $scope.addselectedCenter._id,
							SheetId: $scope.addselectedCenter.SheetId,
							Name: $scope.addselectedCenter.Name,
							Id: $scope.addselectedCenter.Id,
							Info: $scope.addselectedCenter.Info
						}
					]
				} else {
					tmp_center = null;
				}

				if ($scope.addselectedStatus !== undefined) {
					tmp_status = [{
							id: $scope.addselectedStatus.value,
							name: $scope.addselectedStatus.name
						}
					]
				} else {
					tmp_status = {
						id: 0,
						name: 'Chưa đăng ký'
					}
				}

				if (_tmpdayhen !== '') {
					henday = convertup(_tmpdayhen);
				} else {
					henday = null;
				}

				if ($scope.addselectedTime !== undefined) {
					tmp_time = [{
							id: $scope.addselectedTime.value,
							name: $scope.addselectedTime.name
						}
					]
				} else {
					tmp_time = null;
				}

				if ($scope.addNote === undefined || $scope.addNote === '') {
					$scope.addNote = null;
				}

				CstudentF(tmp_fistname, tmp_lastname, data.fullname, tmp_email, data.phone, tmp_sex, tmp_address, regday, $scope.addNote, tmp_center, henday, tmp_time, tmp_status, _manager);
			}
		}

		// lịch sử chỉnh sửa
		$scope.open_history = function () {
			$('#history').modal('show');
		}

		// không cho xóa note chỉ cho update
		$scope.check_length_note = function () {
			let min_length = $scope._lastnote.length;

			if ($scope._details.Note.length < min_length) {
				$scope._details.Note = $scope._lastnote;
			}
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
			$('#sms2').modal('show');
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
					if ($scope._details.Sex[0].id === 0) {
						nd = nd.replace(gioi_tinh, 'Chi')
					}
					if ($scope._details.Sex[0].id === null) {
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
			$('#smsmau2').modal('show');
		}

		$scope.chonmau = function (data) {
			let tmp_nd = data.SMS;
			$scope.nd_sms_mau = replace_sms_string(tmp_nd);
			$('#smsmau2').modal('hide');
		}

	}
})

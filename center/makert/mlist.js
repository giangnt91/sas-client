sas
.controller('MlistCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, DTColumnBuilder, Thesocket) {
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
						$scope.Markets = [{
								id: null,
								name: 'Tất cả'
							}
						];
						$scope.mform = $scope.Markets[0];
						if ($scope.auth.Role[0].id === 0) {
							_result.forEach(element => {
								if (element.Role[0].id === 2 && element.SheetID !== null) {
									if (element.SheetID.length > 0) {
										element.SheetID.forEach(element => {
											let tmp = {
												id: element.id,
												name: element.name
											}
											$scope.Markets.push(tmp);
										});
									}

								}
							});
						} else {
							if ($rootScope.auth.SheetID !== null) {
								$rootScope.auth.SheetID.forEach(element => {
									let tmp = {
										id: element.id,
										name: element.name
									}
									$scope.Markets.push(tmp);
								});
							}
						}

					}
				} else {
					// Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.')
				}
			});
		}
		getUsers();

		// lấy danh sách học viên
		function get_null_query() {

			function renderTime(data, type, row, meta) {
				if (row.Regtime === null) {
					return row.Regday;
				} else {
					return row.Regday + ' ' + row.Regtime;
				}
			}

			function index(data, type, row, meta) {
				return meta.row + 1;
			}

			$scope.dtInstance = {};

			$scope.dtColumns = [
				DTColumnBuilder.newColumn('').withTitle('STT').renderWith(index),
				DTColumnBuilder.newColumn('Regday').withTitle('Time').renderWith(renderTime),
				DTColumnBuilder.newColumn('_id').withTitle('ID'),
				DTColumnBuilder.newColumn('Fullname').withTitle('Họ Tên'),
				DTColumnBuilder.newColumn('Phone').withTitle('Số điện thoại'),
				DTColumnBuilder.newColumn('Note').withTitle('Ghi chú'),
				DTColumnBuilder.newColumn('Manager[0].id').withTitle('Tele')
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
							$scope.view(data);
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
				
				if($scope.detect === undefined){
					DataServices.GetallQuery($rootScope.auth.Role, $rootScope.auth.Username, null, null, null, null, start, length, search).then(function (response) {
						if (response.data.error_code === 0) {
							$scope.detect = 1;
							$scope.all_students = response.data.student;
							var records = {
								'draw': draw,
								'recordsTotal': response.data.total,
								'recordsFiltered': response.data.filtered,
								'data': $scope.all_students
							};
							fnCallback(records);

						} else {
							Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.')
						}
					});
				}
			}
		}
		
		get_null_query();
		

		//filter theo ngày tháng và trạng thái, form
		$scope._status = [{
				id: null,
				name: 'Tất cả'
			}, {
				id: 1,
				name: 'Online không trùng'
			}, {
				id: 2,
				name: 'Đã đăng ký'
			}, {
				id: 3,
				name: 'Trùng'
			}, {
				id: 4,
				name: 'Không tiềm năng'
			}
		]
		$scope.mstatus = $scope._status[0];

		$scope.Search_mk = function () {

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
							$scope.view(data);
						});
					});
					return row;
				});

			function serverData(sSource, aoData, fnCallback, oSettings) {

				let _fromday = $('#mkday').val();
				let _today = $('#mkday2').val();
				let _mform;

				if (_fromday === '') {
					_fromday = null
				}

				if (_today === '') {
					_today = null
				}

				if ($scope.mform !== undefined) {
					_mform = $scope.mform.id;
				}

				//All the parameters you need is in the aoData variable
				var draw = aoData[0].value;
				var order = aoData[2].value;
				var start = aoData[3].value;
				var length = aoData[4].value;
				var search = aoData[5].value;

				DataServices.GetallQuery($rootScope.auth.Role, $rootScope.auth.Username, _fromday, _today, $scope.mstatus.id, _mform, start, length, search).then(function (response) {
					if (response.data.error_code === 0) {
						$scope.all_students = response.data.student;

						var records = {
							'draw': draw,
							'recordsTotal': response.data.total,
							'recordsFiltered': response.data.filtered,
							'data': $scope.all_students
						};
						fnCallback(records);
					} else if (response.data.error_code === 1) {

						var records = {
							'draw': draw,
							'recordsTotal': 0,
							'recordsFiltered': 0,
							'data': 0
						};
						fnCallback(records);
					} else if (response.data.error_code === 2) {

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

		// xem chi tiết nhân viên
		$scope.view = function (data) {
			$scope._details = data;
			$('#mdetail').modal('show');
		}

	}

})

.controller('CenterCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket) {
	// check exit user
	$rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
	if (!$rootScope.auth) {
		$location.path('/login');
	} else {

		// hiển thị ngày tháng
		function convertshow(x) {
			var parts = x.split("/");
			return parts[2] + '-' + parts[1] + '-' + parts[0];
		}

		// lấy tất cả các group
		function Getallgroup() {
			DataServices.GetallGgroup().then(function (response) {
				if (response.data.error_code === 0) {
					if (response.data.groups.length > 0) {
						$scope.AllGroups = [{
								_id: null,
								Name: 'Tất cả'
							}
						];

						$scope.mgroup = $scope.AllGroups[0];
						response.data.groups.forEach(element => {
							if (element.Gtype[0].id === 2) {
								$scope.AllGroups.push(element);
							}
						});
					}
				}
			})
		}
		Getallgroup();

		function getAllmakert() {
			DataServices.GetallMakerting().then(function (response) {
				if (response.data.error_code === 0) {
					$scope.Makertings = response.data.makert;
				}
			})
		}
		getAllmakert();

		// Notifi._loading();
		// lấy danh sách trung tâm
		function getCenter() {
			DataServices.GetCenter().then(function (response) {
				if (response.data.error_code === 0) {
					$scope.Centers = response.data.center;

					var _makerting = [];

					if ($scope.Makerting !== undefined && $scope.Makertings.length > 0) {
						$scope.Centers.forEach(c => {
							DataServices.Getrating(c, null, null).then(function (response) {
								if (response.data.error_code === 0) {
									$scope.Makertings.forEach(element => {
										if (response.data.mkt.User !== undefined) {
											if (element.Username === response.data.mkt.User) {
												_makerting.push(response.data.mkt);
											}
										}
									})
								}
							})
						});
					}

					if ($scope.Makerting !== undefined) {
						$timeout(function () {
							// Notifi._close();
							$scope._Makerting = _makerting;
						}, $scope.Makertings.length * 100)
					} else {
						$timeout(function () {
							// Notifi._close();
							$scope._Makerting = _makerting;
						}, 500)
					}

					$scope.newdtOptions = DTOptionsBuilder.newOptions()
						.withDisplayLength(10)
						.withOption('bLengthChange', true)
						.withOption('iDisplayLength', 10)
						.withOption('bDestroy', true)
						.withOption('colReorder', true)
						.withDOM('Zlfrtip')
				}
			});
		}

		$timeout(function () {
			getCenter();
		}, 1000);

		$scope._change = function () {
			$scope._sale_for_group = [{
					id: null,
					Fullname: 'Tất cả'
				}
			];
			$scope.Users = $scope._sale_for_group[0];

			if ($scope.mgroup._id !== null) {
				if ($scope.Makertings.length > 0) {
					$scope.Makertings.forEach(element => {
						if (element.id !== null) {
							// if(element.Zone[0].id === $scope.mgroup._id){
							// $scope._sale_for_group.push(element);
							// }
							element.Zone.forEach(elz => {
								if (elz.id === $scope.mgroup._id) {
									$scope._sale_for_group.push(element);
								}
							})
						}
					});
				}
			}
		}

		//filter theo ngày tháng và group
		$scope.Search_mk = function () {
			Notifi._loading();

			let _fromday = $('#mkcday').val();
			let _today = $('#mkcday2').val();
			let list_mk = [];
			let _mk;
			if ($scope.mgroup !== undefined && $scope.mgroup._id !== null) {
				if ($scope.Makertings.length > 0) {
					$scope.Makertings.forEach(element => {
						if ($scope.mgroup._id === element.Zone[0].id) {
							list_mk.push(element);
						}
					});
				}
			} else {
				list_mk = $scope.Makertings;
			}

			if ($scope.Users !== undefined) {
				if ($scope.Users.id !== null) {
					_mk = $scope.Users.Username;
				} else {
					_mk = null
				}
			} else {
				_mk = null;
			}

			if (_fromday === '') {
				_fromday = null
			}else{
				_fromday = convertshow(_fromday);
			}

			if (_today === '') {
				_today = null
			}else{
				_today = convertshow(_today);
			}

			var _makerting = [];
			if ($scope.Centers.length > 0) {
				if (_mk !== null) {
					$scope.Centers.forEach(c => {
						DataServices.Getrating(c, _fromday, _today).then(function (response) {
							if (response.data.error_code === 0) {
								if (response.data.mkt.User !== undefined) {
									if (_mk === response.data.mkt.User) {
										_makerting.push(response.data.mkt);
									}
								}
							}
						})
					});

					$timeout(function () {
						$scope._Makerting = _makerting;
						Notifi._close();
					}, $scope.Centers.length * 100)

				} else {
					$scope.Centers.forEach(c => {
						DataServices.Getrating(c, _fromday, _today).then(function (response) {
							if (response.data.error_code === 0 && list_mk !== undefined) {
								list_mk.forEach(element => {
									if (response.data.mkt.User !== undefined) {
										if (element.Username === response.data.mkt.User) {
											_makerting.push(response.data.mkt);
										}
									}
								})
							}
						})
					})

					$timeout(function () {
						$scope._Makerting = _makerting;
						Notifi._close();
					}, $scope.Centers.length * 100)

				}
			}
		}

	}
})

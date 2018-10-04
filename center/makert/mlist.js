sas
.controller('MlistCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket) {
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
						}];
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
						}
						else {
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
			
			// if ($rootScope.auth.Role[0].id !== 0) {
			// if ($rootScope.auth.SheetID !== null) {
			// _mform = $rootScope.auth.SheetID[0].id;
			// } else {
			// _mform = null;
			// }
			
			// } else {
			// _mform = null;
			// }
			
			DataServices.GetallQuery($rootScope.auth.Role, $rootScope.auth.Username, null, null, null, null).then(function (response) {
				if (response.data.error_code === 0) {
					$scope.all_students = response.data.student;
					
					$scope.newdtOptions = DTOptionsBuilder.newOptions()
					.withDisplayLength(10)
					.withOption('bLengthChange', true)
					.withOption('iDisplayLength', 10)
					.withDOM('Zlfrtip')
				}
			})
		}
		
		get_null_query();
		
		//filter theo ngày tháng và trạng thái, form
		$scope._status = [
			{
				id: null,
				name: 'Tất cả'
			},
			{
				id: 1,
				name: 'Online không trùng'
			},
			{
				id: 2,
				name: 'Đã đăng ký'
			},
			{
				id: 3,
				name: 'Trùng'
			},
			{
				id: 4,
				name: 'Không tiềm năng'
			}
		]
		$scope.mstatus = $scope._status[0];
		// $timeout(function () {
		//     if($scope.Markets !== undefined){
		//         $scope.mform = $scope.Markets[0];
		//     }
		
		// }, 500)
		
		
		$scope.Search_mk = function () {
			let _fromday = $('#mkday').val();
			let _today = $('#mkday2').val();
			let _mform;
			
			if (_fromday === '') {
				_fromday = null
			}
			
			if (_today === '') {
				_today = null
			}
			
			// if ($rootScope.auth.Role[0].id !== 0) {
			//     _mform = $rootScope.auth.SheetID[0].id;
			// } else {
			_mform = $scope.mform.id;
			// }
			
			DataServices.GetallQuery($rootScope.auth.Role, $rootScope.auth.Username, _fromday, _today, $scope.mstatus.id, _mform).then(function (response) {
				if (response.data.error_code === 0) {
					$scope.all_students = response.data.student;
					
					$scope.newdtOptions = DTOptionsBuilder.newOptions()
					.withDisplayLength(10)
					.withOption('bLengthChange', true)
					.withOption('iDisplayLength', 10)
					.withDOM('Zlfrtip')
				}
			})
			
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
		
		// lấy tất cả các group
		function Getallgroup() {
			DataServices.GetallGgroup().then(function (response) {
				if (response.data.error_code === 0) {
					if(response.data.groups.length > 0){
						$scope.AllGroups = [{
							_id: null,
							Name: 'Tất cả'
						}];
						
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
		
		// lấy danh sách trung tâm
		function getCenter(){
			DataServices.GetCenter().then(function(response){
				if(response.data.error_code === 0){
					$scope.Centers = response.data.center;
					
					$scope._Makerting = [];
					
					if($scope.Makertings.length > 0){
						$scope.Centers.forEach( c => {
							DataServices.Getrating(c, null, null).then(function (response) {
								if (response.data.error_code === 0) {
									$scope.Makertings.forEach(element => {
										if(response.data.mkt.User !== undefined){
											if(element.Username === response.data.mkt.User){
												$scope._Makerting.push(response.data.mkt);
											}
										}
									})
								}
							})
						});
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
		getCenter();
		
		$scope._change = function(){
			$scope._sale_for_group = [{
				id: null,
				Fullname: 'Tất cả'	
			}];
			$scope.Users = $scope._sale_for_group[0];
			
			if($scope.mgroup._id !== null){
				if($scope.Makertings.length > 0){
					$scope.Makertings.forEach(element =>{
						if(element.id !== null){
							if(element.Zone[0].id === $scope.mgroup._id){
								$scope._sale_for_group.push(element);
							}
						}
					});
				}
			}
		}
		
		//filter theo ngày tháng và group
		$scope.Search_mk = function () {
			let _fromday = $('#mkcday').val();
			let _today = $('#mkcday2').val();
			let list_mk = [];
			let _mk;
			if ($scope.mgroup._id !== null) {
					if($scope.Makertings.length > 0){
						$scope.Makertings.forEach(element => {
							if ($scope.mgroup._id === element.Zone[0].id) {
								list_mk.push(element);
							}
						});
					}
				} else {
				list_mk = $scope.Makertings;
			}
			
			if($scope.Users !== undefined){
				if ($scope.Users.id !== null) {
					_mk = $scope.Users.Username;
					}else{
					_mk = null
				}
				}else{
				_mk = null;
			}
			
			if (_fromday === '') {
				_fromday = null
			}
			
			if (_today === '') {
				_today = null
			}
			
			
			$scope._Makerting = [];
			if($scope.Centers.length > 0){
				if(_mk !== null){
						$scope.Centers.forEach( c => {
							DataServices.Getrating(c, _fromday, _today).then(function (response) {
								if (response.data.error_code === 0) {
									if(response.data.mkt.User !== undefined){
										if(_mk === response.data.mkt.User){
											$scope._Makerting.push(response.data.mkt);
										}
									}
								}
							})
						});
					}else{
					$scope.Centers.forEach( c => {
						DataServices.Getrating(c, _fromday, _today).then(function (response) {
							if (response.data.error_code === 0) {
								list_mk.forEach(element => {
									if(response.data.mkt.User !== undefined){
										if(element.Username === response.data.mkt.User){
											$scope._Makerting.push(response.data.mkt);
										}
									}
								})
							}
						})
					})
				}
			}
		}
		
	}
})
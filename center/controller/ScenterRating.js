sas
.controller('ScenterCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket) {
	// check exit user
	$rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
	if (!$rootScope.auth) {
		$location.path('/login');
		} else {
		
		// lấy tất cả các group
		function Getallgroup() {
			DataServices.GetallGgroup().then(function (response) {
				if (response.data.error_code === 0) {
					$scope.AllGroups = [{
						_id: null,
						Name: 'Tất cả'
					}];
					
					$scope.mgroup = $scope.AllGroups[0];
					response.data.groups.forEach(element => {
						if (element.Gtype[0].id === 1) {
							$scope.AllGroups.push(element);
						}
					});	
				}
			})
		}
		Getallgroup();
		
		// lấy danh sách sale
		function getAllsale() {
			DataServices.GetallUser().then(function (repsonse) {
				if (repsonse.data.error_code === 0) {
					$scope.TheUsers = repsonse.data.users;
					$scope._User = [];
					
					if($scope.TheUsers.length > 0){
						$scope.TheUsers.forEach(element => {
							DataServices.GetSrating(element.Username, null, null).then(function (response) {
								if (response.data.error_code === 0) {
									$scope._User.push(response.data.user);
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
		getAllsale();
		
		$scope._change = function(){
			$scope._sale_for_group = [{
				id: null,
				Fullname: 'Tất cả'	
			}];
			$scope.Users = $scope._sale_for_group[0];
			
			if($scope.mgroup._id !== null){
				$scope.TheUsers.forEach(element =>{
					if(element.id !== null){
						if(element.Zone[0].id === $scope.mgroup._id){
							$scope._sale_for_group.push(element);
						}
					}
				});
			}
		}
		
		//filter theo ngày tháng và group
		$scope.Search_mk = function () {
			let _fromday = $('#scday').val();
			let _today = $('#scday2').val();
			let list_mk = [];
			let _us;
			if ($scope.mgroup._id !== null) {
				$scope.TheUsers.forEach(element => {
					if ($scope.mgroup._id === element.Zone[0].id) {
						list_mk.push(element);
					}
				});
			} else {
				list_mk = $scope.TheUsers;
			}
			
			if($scope.Users !== undefined){
				if ($scope.Users.id !== null) {
					_us = $scope.Users.Username;
					}else{
					_us = null
				}
				}else{
				_us = null;
			}
			
			if (_fromday === '') {
				_fromday = null
			}
			
			if (_today === '') {
				_today = null
			}
			
			
			$scope._User = [];
			if(_us !== null){
				DataServices.GetSrating(_us, _fromday, _today).then(function(response){
					if (response.data.error_code === 0) {
						$scope._User.push(response.data.user);
					}
				});
				}else{
				list_mk.forEach(element => {
					DataServices.GetSrating(element.Username, _fromday, _today).then(function (response) {
						if (response.data.error_code === 0) {
							$scope._User.push(response.data.user);
						}
					})
				});
			}
			
		}
		
	}
})

.controller('SratingCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket) {
	$rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
	if (!$rootScope.auth) {
		$location.path('/login');
		} else {
		
		// lấy danh sách sale
		function getAllsale() {
			DataServices.GetallUser().then(function (repsonse) {
				if (repsonse.data.error_code === 0) {
					$scope.TheUsers = repsonse.data.users;
					$scope._User = [];
					
					if($scope.TheUsers.length > 0){
						$scope.TheUsers.forEach(element => {
							DataServices.GetSrating(element.Username, null, null).then(function (response) {
								if (response.data.error_code === 0) {
									$scope._User.push(response.data.user);
								}
							})
						});
					}
					
					$scope.newdtOptions = DTOptionsBuilder.newOptions()
					.withDisplayLength(10)
					.withOption('bLengthChange', true)
					.withOption('iDisplayLength', 10)
					.withOption('order', [[4, 'desc']])
					.withOption('bDestroy', true)
					.withOption('colReorder', true)
					.withDOM('Zlfrtip')
				}
			});			
		}
		getAllsale();
		
		// lấy tất cả các group
		function Getallgroup() {
			DataServices.GetallGgroup().then(function (response) {
				if (response.data.error_code === 0) {
					$scope.AllGroups = [{
						_id: null,
						Name: 'Tất cả'
					}];
					
					$scope.mgroup = $scope.AllGroups[0];
					response.data.groups.forEach(element => {
						if (element.Gtype[0].id === 1) {
							$scope.AllGroups.push(element);
						}
					});	
				}
			})
		}
		Getallgroup();
		
		//filter theo ngày tháng và group
		$scope.Search_mk = function () {
			let _fromday = $('#sday').val();
			let _today = $('#sday2').val();			
			
			if (_fromday === '') {
				_fromday = null
			}
			
			if (_today === '') {
				_today = null
			}
			
			$scope._User= [];
			$scope.TheUsers.forEach(element => {
				DataServices.GetSrating(element.Username, null, null).then(function (response) {
					if (response.data.error_code === 0) {
						$scope._User.push(response.data.user);
					}
				})
			});	
			
			}
	}
})
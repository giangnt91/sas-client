sas
.controller('ScenterCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket) {
	// check exit user
	$rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
	if (!$rootScope.auth) {
		$location.path('/login');
	} else {

		Notifi._loading();
		// lấy tất cả các group
		function Getallgroup() {
			DataServices.GetallGgroup().then(function (response) {
				if (response.data.error_code === 0) {
					$scope.AllGroups = [{
							_id: null,
							Name: 'Tất cả'
						}
					];

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
				}
			});
		}
		getAllsale();

		// lấy danh sách trung tâm
		function getCenter() {
			$timeout(function () {
				Notifi._close();
			}, 500);
			DataServices.GetCenter().then(function (response) {
				if (response.data.error_code === 0) {
					$scope.Centers = response.data.center;

					var _user = [];

					if ($scope.TheUsers !== undefined && $scope.TheUsers.length > 0) {
						$scope.Centers.forEach(c => {
							DataServices.GetSCenter(c, null, null).then(function (response) {
								if (response.data.error_code === 0) {
									$scope.TheUsers.forEach(element => {
										if (response.data.user.User !== undefined) {
											if (element.Username === response.data.user.User) {
												_user.push(response.data.user);
											}
										}
									})
								}
							})
						});
					}

					$timeout(function () {
						$scope._User = _user;
					}, 500);

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
				$scope.TheUsers.forEach(element => {
					if (element.id !== null) {
						element.Zone.forEach(elz => {
							if (elz.id === $scope.mgroup._id) {
								$scope._sale_for_group.push(element);
							}
						})
						// if(element.Zone[0].id === $scope.mgroup._id){
						// $scope._sale_for_group.push(element);
						// }
					}
				});
			}
		}

		//filter theo ngày tháng và group
		$scope.Search_mk = function () {
			Notifi._loading();

			let _fromday = $('#scday').val();
			let _today = $('#scday2').val();
			let list_mk = [];
			let _us;
			if ($scope.mgroup._id !== null) {
				$scope.TheUsers.forEach(element => {
					element.Zone.forEach(elz => {
						if (elz.id === $scope.mgroup._id) {
							list_mk.push(element);
						}
					})
					// if ($scope.mgroup._id === element.Zone[0].id) {
					// list_mk.push(element);
					// }
				});
			} else {
				list_mk = $scope.TheUsers;
			}

			if ($scope.Users !== undefined) {
				if ($scope.Users.id !== null) {
					_us = $scope.Users.Username;
				} else {
					_us = null
				}
			} else {
				_us = null;
			}

			if (_fromday === '') {
				_fromday = null
			}

			if (_today === '') {
				_today = null
			}

			var _user = [];
			if (_us !== null) {
				$scope.Centers.forEach(c => {
					DataServices.GetSCenter(c, _fromday, _today).then(function (response) {
						if (response.data.error_code === 0) {
							if (response.data.user.User !== undefined) {
								if (_us === response.data.user.User) {
									_user.push(response.data.user);
								}
							}
						}
					})
				});

			} else {
				$scope.Centers.forEach(c => {
					DataServices.GetSCenter(c, _fromday, _today).then(function (response) {
						if (response.data.error_code === 0 && list_mk !== undefined) {
							list_mk.forEach(element => {
								if (response.data.user.User !== undefined) {
									if (element.Username === response.data.user.User) {
										_user.push(response.data.user);
									}
								}
							})
						}
					})
				})

			}

			$timeout(function () {
				$scope._User = _user;
				Notifi._close();
			}, 500);

		}

	}
})

.controller('SratingCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket) {
	$rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
	if (!$rootScope.auth) {
		$location.path('/login');
	} else {

		// hiển thị ngày tháng
		function convertshow(x) {
			var parts = x.split("/");
			return parts[2] + '-' + parts[1] + '-' + parts[0];
		}

		Notifi._loading();
		// lấy danh sách sale
		function getAllsale() {
			$timeout(function () {
				Notifi._close();
			}, 1500);
			DataServices.GetallUser().then(function (repsonse) {
				if (repsonse.data.error_code === 0) {
					$scope.TheUsers = repsonse.data.users;
					var _user = [];

					if ($scope.TheUsers.length > 0) {
						$scope.TheUsers.forEach(element => {
							DataServices.GetSrating(element.Username, element.Fullname, null, null).then(function (response) {
								if (response.data.error_code === 0) {
									_user.push(response.data.user);
								}
							})
						});
					}
					$timeout(function () {
						$scope._User = _user;
						$scope.isLoading = true;
						Notifi._close();
					}, 1500);

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
						}
					];

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
			Notifi._loading();
			let _fromday = $('#sday').val();
			let _today = $('#sday2').val();

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

			var _user = [];
			if ($scope.TheUsers !== undefined) {
				$scope.TheUsers.forEach(element => {
					DataServices.GetSrating(element.Username, element.Fullname, _fromday, _today).then(function (response) {
						if (response.data.error_code === 0) {
							_user.push(response.data.user);
						}
					})
				});
			}

			$timeout(function () {
				$scope._User = _user;
				$scope.isLoading = true;
				Notifi._close();
			}, $scope.TheUsers.length * 100);

		}
	}
})

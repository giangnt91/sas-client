sas
.controller('MakertingCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket) {
	// check exit user
	$rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
	if (!$rootScope.auth) {
		$location.path('/login');
        } else {
		Notifi._loading();
		
		function getAllmakert() {
			DataServices.GetallMakerting().then(function (response) {
				if (response.data.error_code === 0) {
					$scope.Makertings = response.data.makert;
					var _makerting = [];
					
					// lấy danh sách form
					$scope.Markets = [{
						id: null,
						name: 'Tất cả'
					}];
					$scope.form = $scope.Markets[0];
					if ($scope.auth.Role[0].id === 0) {
						$scope.Makertings.forEach(element => {
							DataServices.GettqMakert($rootScope.auth.Role, element.Username, element.Fullname, null, null, null).then(function (response) {
								if (response.data.error_code === 0) {
									_makerting.push(response.data.mkt);
								}
							})
							
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
						
						$timeout(function(){
							Notifi._close();
							$scope._Makerting = _makerting;
						}, $scope.Makertings.length * 100);
						
                        } else {
						DataServices.GettqMakert($rootScope.auth.Role, $rootScope.auth.Username, $rootScope.auth.Fullname, null, null, null).then(function (response) {
							if (response.data.error_code === 0) {
								_makerting.push(response.data.mkt);
							}
						})
						
						$timeout(function(){
							Notifi._close();
							$scope._Makerting = _makerting;
						});
						
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
					
					$scope.newdtOptions = DTOptionsBuilder.newOptions()
					.withDisplayLength(10)
					.withOption('bLengthChange', true)
					.withOption('iDisplayLength', 10)
					.withOption('bDestroy', true)
					.withOption('colReorder', true)
					.withDOM('Zlfrtip')
				}
			})
		}
		getAllmakert();
		
		// lấy tất cả các group
		function Getallgroup() {
			DataServices.GetallGgroup().then(function (response) {
				if (response.data.error_code === 0) {
					$scope.AllGroups = [{
						id: null,
						Name: 'Chọn'
					}];
					
					$scope.SaleGroup = [{
						id: null,
						Name: 'Chọn'
					}]
					$scope.choosegroup = $scope.SaleGroup[0];
					
					$scope.mgroup = $scope.AllGroups[0];
					$scope.my_all_sale = [];
					response.data.groups.forEach(element => {
						if (element.Gtype[0].id === 2) {
							$scope.AllGroups.push(element);
						}
						
						if (element.Gtype[0].id === 1) {
							$scope.SaleGroup.push(element);
							
							// lấy ds các group mà marketer liên kết
							// if (element.Sheet !== null) {
							// element.Sheet.forEach(el => {
							// if (el.muser === $rootScope.auth.Username) {
							// $scope.my_all_sale.push(element);
							// }
							// });
							// }
							
							if ($scope.SaleGroup !== null) {
								if($rootScope.auth.GroupSheet !== null){
									$rootScope.auth.GroupSheet.forEach(el => {
										$scope.SaleGroup.forEach(s =>{
											if (el.id === s._id) {
												$scope.my_all_sale.push(element);
											}
										})
									});
								}
							}
						}
					});
					
					$scope.my_all_sale = angular.fromJson(angular.toJson($scope.my_all_sale));
					
					
				}
			})
		}
		Getallgroup();
		
		// thông báo trùng
		Thesocket.on('mkduplicate', function (list_duplicate) {
			
			var last_id = localStorage.getItem('last_id');
			list_duplicate.forEach(element => {
				if (element.mketer === $rootScope.auth.Username) {
					localStorage.setItem('last_id', element.mketer);
					if (last_id !== element.mketer) {
						Notifi._notifi(
						'Học viên ' + element.student + '<br> có số điện thoại ' + element.stphone + '<br> đã được đăng ký vào lúc ' + element.pretime + ' <br> bởi ' + element.premname + ' có username ' + element.premid
						)
					}
				}
			});
		})
		//
		
		
		//filter theo ngày tháng và group
		$scope.Search_mk = function () {
			Notifi._loading();
			
			let _fromday = $('#mkday').val();
			let _today = $('#mkday2').val();
			let list_mk = [];
			let _form;
			if ($scope.mgroup.id !== null) {
				$scope.Makertings.forEach(element => {
					// if ($scope.mgroup._id === element.Zone[0].id) {
						// list_mk.push(element);
					// }
					element.Zone.forEach( elz => {
						if($scope.mgroup._id === elz.id){
							list_mk.push(element);
						}
					})
				});
				} else {
				list_mk = $scope.Makertings;
			}
			
			if ($scope.form.id !== null) {
				_form = $scope.form.id;
				}else{
				_form = null
			}
			
			if (_fromday === '') {
				_fromday = null
			}
			
			if (_today === '') {
				_today = null
			}
			
			var _makerting = [];
			if ($scope.auth.Role[0].id === 0) {
					list_mk.forEach(element => {
						DataServices.GettqMakert($rootScope.auth.Role, element.Username, element.Fullname, _fromday, _today, _form).then(function (response) {
							if (response.data.error_code === 0) {
								_makerting.push(response.data.mkt);
							}
						})
					});
					
					$timeout(function(){
						Notifi._close();
						$scope._Makerting = _makerting;
					}, list_mk.length * 100);
				} else {
					DataServices.GettqMakert($rootScope.auth.Role, $rootScope.auth.Username, $rootScope.auth.Fullname, _fromday, _today, _form).then(function (response) {
						if (response.data.error_code === 0) {
							_makerting.push(response.data.mkt);
						}
					})
					
					$timeout(function(){
						Notifi._close();
						$scope._Makerting = _makerting;
					}, 500);
			}
			
		}
		
		// marketing chọn group sale liên kết
		$scope.List_sheet = [];
		if ($rootScope.auth.SheetID !== null) {
			$rootScope.auth.SheetID.forEach(element => {
				if (element.isready === true) {
					$scope.List_sheet.push(element);
				}
			});
			$scope.chooseSheet = $scope.List_sheet[0];
		}
		
		$scope.Join = function () {
			if ($scope.choosegroup.id === null || $scope.choosegroup === undefined || $scope.chooseSheet === '' || $scope.chooseSheet === null) {
				Notifi._error('Vui lòng chọn để liên kết');
				} else {
				
				let tmp = {
					name: $rootScope.auth.Fullname,
					muser: $rootScope.auth.Username,
					id: $scope.chooseSheet.id,
					sheetname: $scope.chooseSheet.name,
					isready: $scope.chooseSheet.isready,
					group: $scope.choosegroup.Name,
					groupid: $rootScope.auth.Zone[0].id
				}
				
				if ($scope.choosegroup.Sheet !== null) {
					let a = 0;
					$scope.choosegroup.Sheet.forEach(element => {
						if (element.id === $scope.chooseSheet.id) {
							a = 1;
						}
					});
					if (a === 0) {
						$scope.choosegroup.Sheet.push(tmp);
					}
					} else {
					$scope.choosegroup.Sheet = [tmp];
				}
				
				let _group = angular.fromJson(angular.toJson($scope.choosegroup));
				
				
				// update group market
				DataServices.UpGroup(_group).then(function (response) {
					if (response.data.error_code === 0) {
						if ($rootScope.auth.GroupSheet !== null) {
							let a = 0;
							let tmp_2 = {
								id: _group._id,
								name: _group.Name
							}
							$rootScope.auth.GroupSheet.forEach(element => {
								if (element.id === _group._id) {
									a = 1
								}
							});
							if (a === 0) {
								$rootScope.auth.GroupSheet.push(tmp_2);
							}
							} else {
							let tmp_2 = {
								id: _group._id,
								name: _group.Name
							}
							$rootScope.auth.GroupSheet = [tmp_2]
							$rootScope.auth = angular.fromJson(angular.toJson($rootScope.auth));
						}
						DataServices.UpdateUser($rootScope.auth).then(function (res) { })
						Getallgroup();
						Notifi._success('Liên kết group thành công');
					}
				})
			}
			
			
			
			
		}
		
		
		$scope.upJoinOpen = function (data) {
			$scope._upgroup = data;
			
			if ($scope.List_sheet !== null & $scope.List_sheet !== undefined) {
				$scope.List_sheet.forEach(element => {
					if (data.Sheet !== null) {
						data.Sheet.forEach(el => {
							if (element.name === el.sheetname && el.muser === $rootScope.auth.Username) {
								$scope.upjoinsheet = element;
								$scope._presheet = element;
							}
						});
					}
				});
			}
			
			
			if ($scope.SaleGroup !== null && $scope.SaleGroup !== undefined) {
				$scope.SaleGroup.forEach(element => {
					if (element._id === $scope._upgroup._id) {
						$scope.upjoingroup = element;
					}
				});
			}
			$('#upjoingroup').modal('show');
		}
		
		
		$scope.UpdatejoinGroup = function () {
			if ($scope.upjoinsheet.name !== $scope._presheet.name) {
				$scope._upgroup.Sheet.forEach(function (element, index) {
					if (element.sheetname === $scope._presheet.name && element.muser === $rootScope.auth.Username) {
						$scope._upgroup.Sheet.splice(index, 1);
						
						let tmp = {
							name: $rootScope.auth.Fullname,
							muser: $rootScope.auth.Username,
							id: $scope.upjoinsheet.id,
							sheetname: $scope.upjoinsheet.name,
							isready: $scope.upjoinsheet.isready,
							group: $rootScope.auth.Zone[0].name,
							groupid: $rootScope.auth.Zone[0].id
						}
						
						$scope._upgroup.Sheet.push(tmp);
					}
				});
			}
			
			$scope._upgroup = angular.fromJson(angular.toJson($scope._upgroup));
			
			// update group telesale
			DataServices.UpGroup($scope._upgroup).then(function (response) {
				if (response.data.error_code === 0) {
					$('#upjoingroup').modal('hide');
					DataServices.withOut($rootScope.auth._id).then(function (res) {
						if (res.data.error_code === 0) {
							$rootScope.auth = res.data.user;
							localStorage.setItem('Auth', JSON.stringify(res.data.user));
						}
					});
					Getallgroup();
					Notifi._success('Liên kết group thành công');
				}
			})
		}
		
		$scope.upjoinDelopen = function (data, sheetname) {
			$scope._delgroup = data;
			
			if ($scope.List_sheet !== null & $scope.List_sheet !== undefined) {
				$scope.List_sheet.forEach(element => {
					if (data.Sheet !== null) {
						data.Sheet.forEach(el => {
							if (element.name === el.sheetname && el.muser === $rootScope.auth.Username) {
								$scope._delsheet = element;
							}
						});
					}
				});
			}
			
			$('#deljoingroup').modal('show')
		}
		
		$scope.Deljoin = function (name) {
			$scope._delgroup.Sheet.forEach(function (element, index) {
				if (element.sheetname === $scope._delsheet.name && element.muser === $rootScope.auth.Username) {
					$scope._delgroup.Sheet.splice(index, 1);
				}
			});
			
			$scope._delgroup = angular.fromJson(angular.toJson($scope._delgroup));
			// update group telesale
			DataServices.UpGroup($scope._delgroup).then(function (response) {
				if (response.data.error_code === 0) {
					$('#deljoingroup').modal('hide');
					DataServices.withOut($rootScope.auth._id).then(function (res) {
						if (res.data.error_code === 0) {
							$rootScope.auth = res.data.user;
							localStorage.setItem('Auth', JSON.stringify(res.data.user));
						}
					});
					Getallgroup();
					Notifi._success('Xóa liên kết group thành công');
				}
			})
		}
		
	}
})

.controller('RatingCtrl', function ($location, $scope, $rootScope, Notifi, ngDialog, $timeout, DataServices, md5, DTOptionsBuilder, Thesocket) {
	$rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
	if (!$rootScope.auth) {
		$location.path('/login');
		} else {
		Notifi._loading();
		
		function getAllmakert() {
			DataServices.GetallMakerting().then(function (response) {
				if (response.data.error_code === 0) {
					$scope.Makertings = response.data.makert;
					var _makerting = [];
					
					// lấy danh sách form
					$scope.Markets = [{
						id: null,
						name: 'Tất cả'
					}];
					$scope.form = $scope.Markets[0];
					
					$scope.Makertings.forEach(element => {
						DataServices.GettqMakert($rootScope.auth.Role, element.Username, element.Fullname, null, null, null).then(function (response) {
							if (response.data.error_code === 0) {
								_makerting.push(response.data.mkt);
							}
						})
						
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
					
					$timeout(function(){
						$scope._Makerting = _makerting;
						Notifi._close();
					}, $scope.Makertings.length * 100);
					
					
					$scope.newdtOptions = DTOptionsBuilder.newOptions()
					.withDisplayLength(10)
					.withOption('bLengthChange', true)
					.withOption('iDisplayLength', 10)
					.withOption('order', [[4, 'desc']])
					.withOption('bDestroy', true)
					.withOption('colReorder', true)
					.withDOM('Zlfrtip')
				}
			})
		}
		getAllmakert();
		
		// lấy tất cả các group
		function Getallgroup() {
			DataServices.GetallGgroup().then(function (response) {
				if (response.data.error_code === 0) {
					$scope.AllGroups = [{
						id: null,
						Name: 'Chọn'
					}];
					
					$scope.SaleGroup = [{
						id: null,
						Name: 'Chọn'
					}]
					$scope.choosegroup = $scope.SaleGroup[0];
					
					$scope.mgroup = $scope.AllGroups[0];
					$scope.my_all_sale = [];
					response.data.groups.forEach(element => {
						if (element.Gtype[0].id === 2) {
							$scope.AllGroups.push(element);
						}
						
						if (element.Gtype[0].id === 1) {
							$scope.SaleGroup.push(element);
							
							// lấy ds các group mà marketer liên kết
							// if (element.Sheet !== null) {
							// element.Sheet.forEach(el => {
							// if (el.muser === $rootScope.auth.Username) {
							// $scope.my_all_sale.push(element);
							// }
							// });
							// }
							
							if ($scope.SaleGroup !== null) {
								if($rootScope.auth.GroupSheet !== null){
									$rootScope.auth.GroupSheet.forEach(el => {
										$scope.SaleGroup.forEach(s =>{
											if (el.id === s._id) {
												$scope.my_all_sale.push(element);
											}
										})
									});
								}
							}
						}
					});
					
					$scope.my_all_sale = angular.fromJson(angular.toJson($scope.my_all_sale));
					
					
				}
			})
		}
		Getallgroup();
		
		//filter theo ngày tháng và group
		$scope.Search_mk = function () {
			Notifi._loading();
			
			let _fromday = $('#mkday').val();
			let _today = $('#mkday2').val();
			let list_mk = [];
			if ($scope.mgroup.id !== null) {
				$scope.Makertings.forEach(element => {
					if ($scope.mgroup._id === element.Zone[0].id) {
						list_mk.push(element);
					}
				});
				} else {
				list_mk = $scope.Makertings;
			}
			
			
			if (_fromday === '') {
				_fromday = null
			}
			
			if (_today === '') {
				_today = null
			}
			
			var _makerting = [];
			list_mk.forEach(element => {
				DataServices.GettqMakert($rootScope.auth.Role, element.Username, element.Fullname, _fromday, _today, null).then(function (response) {
					if (response.data.error_code === 0) {
						_makerting.push(response.data.mkt);
					}
				})
			});	
			
			$timeout(function(){
				$scope._Makerting = _makerting;
				Notifi._close();
			}, list_mk.length * 100);
			
		}
	}
})
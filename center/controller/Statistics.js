sas
// Optional configuration
.config(['ChartJsProvider', function (ChartJsProvider) {
	// Configure all charts
	ChartJsProvider.setOptions({
		chartColors: ['#00BCD4', '#F44336', '#9C27B0', '#FF9800'],
		responsive: true,
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true
				},
			}]
		},
		legend: { display: true }
	});
	// Configure all line charts
	ChartJsProvider.setOptions('line', {
		showLines: false
	});
}])
.controller('StatisticsCtrl', function ($scope, $rootScope, $timeout, DataServices, Notifi) {
	// lấy danh sách user
	function getUsers() {
		// lấy danh sách user
		DataServices.GetallUser().then(function (repsonse) {
			if (repsonse.data.error_code === 0) {
				if (repsonse.data.users.length > 0) {
					$scope.users = repsonse.data.users;
				}
                } else {
				Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.')
			}
		});
	}
	
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
	
	// check exit user
	$rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
	if (!$rootScope.auth) {
		$location.path('/login');
        } else {
		getUsers();
		$scope.isactive = 1;
		var list_friend_user = [];
		
		$scope.labels1 = [];
		var dataOn = [];
		var dataOut = [];
		var dataIn = [];
		var dataFriend = [];
		
		// lấy thành viên trong group cho user thường
		if($rootScope.auth.Role[0].id !== 0){
			$timeout(function () {
				$scope.users.forEach( u => {
					if(u.Zone[0].id === $rootScope.auth.Zone[0].id){
						list_friend_user.push(u);
					}
				})
				
				list_friend_user.forEach(element => {
					DataServices.GetforchartDefault(element.Username, null, null).then(function (res) {
						if (res.data.error_code === 0) {
							var _result = res.data.student;
							if (_result.length > 0) {
								dataOn.push(_result[0].On.length);
								dataIn.push(_result[0].In.length);
								dataOut.push(_result[0].Out.length);
								dataFriend.push(_result[0].Fri.length);
							}
						}
					})
					$scope.labels1.push(element.Fullname);
				});
				
				$scope.data = [
					dataOn,
					dataOut,
					dataIn,
					dataFriend
				];
				$scope.series = ['Online', 'Out', 'In', 'Friend'];
			}, 500)
			
			}else if($rootScope.auth.Role[0].id === 0){
			
			if ($scope.isactive === 1) {
				
				$timeout(function () {
					$scope.users.forEach(element => {
						DataServices.GetforchartDefault(element.Username, null, null).then(function (res) {
							if (res.data.error_code === 0) {
								var _result = res.data.student;
								if (_result.length > 0) {
									dataOn.push(_result[0].On.length);
									dataIn.push(_result[0].In.length);
									dataOut.push(_result[0].Out.length);
									dataFriend.push(_result[0].Fri.length);
								}
							}
						})
						$scope.labels1.push(element.Fullname);
					});
					
					$scope.data = [
						dataOn,
						dataOut,
						dataIn,
						dataFriend
					];
					$scope.series = ['Online', 'Out', 'In', 'Friend'];
				}, 500)
				
			}
			
		}
		
		// lọc theo ngày
		$scope.fillbyday = function () {
			getUsers();
			var list_friend_user = [];
			
			if($rootScope.auth.Role[0].id === 0){
				if($scope.mgroup._id !== null){
					$scope.users.forEach( u => {
						if(u.Zone[0].id === $scope.mgroup._id){
							list_friend_user.push(u);
						}
					})
					}else{
					list_friend_user = $scope.users;
				}
				}else{
				$scope.users.forEach( u => {
					if(u.Zone[0].id === $rootScope.auth.Zone[0].id){
						list_friend_user.push(u);
					}
				})
			}
			
			
			let _fromday = $('#fromd').val();
			let _today = $('#tod').val();
			
			if (_fromday === '') {
				_fromday = null
			}
			
			if (_today === '') {
				_today = null
			}
			
			//Kiểm tra isactive để lọc dữ liệu
			switch ($scope.isactive) {
				case 2:
				$scope.labels2 = [];
				var notcall = [];
				
				list_friend_user.forEach(element => {					
					DataServices.GetforchartNotcall(element.Username, _fromday, _today).then(function (res) {
						if (res.data.error_code === 0) {
							var _result = res.data.notcall;
							notcall.push(_result.length);
						}
					})
					$scope.labels2.push(element.Fullname);
				});
				
				$scope.data2 = [
					notcall
				];
				$scope.series2 = ['Chưa gọi'];
				break;
				case 3:
				$scope.labels3 = [];
				var relcall = [];
				list_friend_user.forEach(element => {
					
					DataServices.GetforchartRecall(element.Username, _fromday, _today).then(function (res) {
						if (res.data.error_code === 0) {
							var _result = res.data.recall;
							relcall.push(_result.length);
						}
					})
					$scope.labels3.push(element.Fullname);
				});
				
				$scope.data3 = [
					relcall
				];
				$scope.series3 = ['Gọi lại'];
				break;
				case 4:
				$scope.tl = [];
				list_friend_user.forEach(element => {
					DataServices.Gettl(element.Username, _fromday, _today).then(function (res) {
						if (res.data.error_code === 0) {
							var _result = res.data.tl;
							$scope.tl.push(_result);
						}
					})
				});
				
				break;
				case 5:
				var hcd = [];
				$scope.labels5 = [];
				list_friend_user.forEach(element => {
					
					DataServices.GetforchartHcd(element.Username, _fromday, _today).then(function (res) {
						if (res.data.error_code === 0) {
							var _result = res.data.hcd;
							hcd.push(_result.length);
						}
					})
					$scope.labels5.push(element.Fullname);
				});
				
				$scope.data5 = [
					hcd
				];
				$scope.series5 = ['Hẹn chưa đến'];
				break;
				case 6:
				var dcdk = [];
				$scope.labels6 = [];
				list_friend_user.forEach(element => {
					
					DataServices.GetforchartDcdk(element.Username, _fromday, _today).then(function (res) {
						if (res.data.error_code === 0) {
							var _result = res.data.dcdk;
							dcdk.push(_result.length);
						}
					})
					$scope.labels6.push(element.Fullname);
				});
				
				$scope.data6 = [
					dcdk
				];
				$scope.series6 = ['Đến chưa đăng ký'];
				break;
				case 7:
				var cdk = [];
				$scope.labels7 = [];
				list_friend_user.forEach(element => {
					
					DataServices.GetforchartCdk(element.Username, _fromday, _today).then(function (res) {
						if (res.data.error_code === 0) {
							var _result = res.data.cdk;
							cdk.push(_result.length);
						}
					})
					$scope.labels7.push(element.Fullname);
				});
				
				$scope.data7 = [
					cdk
				];
				$scope.series7 = ['Chưa đăng ký'];
				break;
				case 8:
				var ktn = [];
				$scope.labels8 = [];
				list_friend_user.forEach(element => {
					
					DataServices.GetforchartKtn(element.Username, _fromday, _today).then(function (res) {
						if (res.data.error_code === 0) {
							var _result = res.data.ktn;
							ktn.push(_result.length);
						}
					})
					$scope.labels8.push(element.Fullname);
				});
				
				$scope.data8 = [
					ktn
				];
				$scope.series8 = ['Không tiềm năng'];
				break;
				case 9:
				$scope.lh = [];
				list_friend_user.forEach(element => {
					DataServices.Getlh(element.Username, _fromday, _today).then(function (res) {
						if (res.data.error_code === 0) {
							var _result = res.data.lh;
							$scope.lh.push(_result);
						}
					})
				});
				break;
				default:
				$scope.labels1 = [];
				var dataOn = [];
				var dataOut = [];
				var dataIn = [];
				var dataFriend = [];
				list_friend_user.forEach(element => {
					DataServices.GetforchartDefault(element.Username, _fromday, _today).then(function (res) {
						if (res.data.error_code === 0) {
							var _result = res.data.student;
							if (_result.length > 0) {
								dataOn.push(_result[0].On.length);
								dataIn.push(_result[0].In.length);
								dataOut.push(_result[0].Out.length);
								dataFriend.push(_result[0].Fri.length);
							}
						}
					})
					$scope.labels1.push(element.Fullname);
				});
				
				$scope.data = [
					dataOn,
					dataOut,
					dataIn,
					dataFriend
				];
				$scope.series = ['Online', 'Out', 'In', 'Friend'];
			}
			
		}
		
		// tổng quan
		$scope.tq = function () {
			$scope.isactive = 1;
		}
		
		// chưa gọi
		$scope.cg = function () {
			getUsers();
			$scope.isactive = 2;
			
			$scope.labels2 = [];
			var notcall = [];
			var list_friend_user = [];
			
			$timeout(function () {
				if($rootScope.auth.Role[0].id !== 0){
					$scope.users.forEach( u => {
						if(u.Zone[0].id === $rootScope.auth.Zone[0].id){
							list_friend_user.push(u);
						}
					})
					
					list_friend_user.forEach(element => {
						DataServices.GetforchartNotcall(element.Username, null, null).then(function (res) {
							if (res.data.error_code === 0) {
								var _result = res.data.notcall;
								if (_result.length > 0) {
									notcall.push(_result.length);
								}
							}
						})
						$scope.labels2.push(element.Fullname);
					});
					
					$scope.data2 = [
						notcall
					];
					$scope.series2 = ['Chưa gọi'];
					
					}else{
					
					$scope.users.forEach(element => {
						
						DataServices.GetforchartNotcall(element.Username, null, null).then(function (res) {
							if (res.data.error_code === 0) {
								var _result = res.data.notcall;
								if (_result.length > 0) {
									notcall.push(_result.length);
								}
							}
						})
						$scope.labels2.push(element.Fullname);
					});
					
					$scope.data2 = [
						notcall
					];
					$scope.series2 = ['Chưa gọi'];
					
				}
			}, 500)
		}
		
		// gọi lại
		$scope.gl = function () {
			getUsers();
			$scope.isactive = 3;
			$scope.labels3 = [];
			var relcall = [];
			var list_friend_user = [];
			$timeout(function () {
				
				if($rootScope.auth.Role[0].id !== 0){
					$scope.users.forEach( u => {
						if(u.Zone[0].id === $rootScope.auth.Zone[0].id){
							list_friend_user.push(u);
						}
					})
					
					list_friend_user.forEach(element => {
						DataServices.GetforchartNotcall(element.Username, null, null).then(function (res) {
							if (res.data.error_code === 0) {
								var _result = res.data.recall;
								if (_result.length > 0) {
									relcall.push(_result.length);
								}
							}
						})
						$scope.labels3.push(element.Fullname);
					});
					
					$scope.data3 = [
						relcall
					];
					$scope.series3 = ['Gọi lại'];
					
					}else{
					
					$scope.users.forEach(element => {
						
						DataServices.GetforchartRecall(element.Username, null, null).then(function (res) {
							if (res.data.error_code === 0) {
								var _result = res.data.recall;
								relcall.push(_result.length);
							}
						})
						$scope.labels3.push(element.Fullname);
					});
					
					$scope.data3 = [
						relcall
					];
					$scope.series3 = ['Gọi lại'];
					
				}
			}, 500)
			
		}
		
		// tỷ lệ
		$scope._tl = function () {
			$scope.isactive = 4;
			
			$scope.tl = [];
			var list_friend_user = [];
			
			if($rootScope.auth.Role[0].id !== 0){
				$scope.users.forEach( u => {
					if(u.Zone[0].id === $rootScope.auth.Zone[0].id){
						list_friend_user.push(u);
					}
				})
				list_friend_user.forEach(element => {
					DataServices.Gettl(element.Username, null, null).then(function (res) {
						if (res.data.error_code === 0) {
							var _result = res.data.tl;
							$scope.tl.push(_result);
						}
					})
				});	
				}else{
				$scope.users.forEach(element => {
					DataServices.Gettl(element.Username, null, null).then(function (res) {
						if (res.data.error_code === 0) {
							var _result = res.data.tl;
							$scope.tl.push(_result);
						}
					})
				});
			}
		}
		
		// hẹn chưa đến
		$scope.hcd = function () {
			$scope.isactive = 5;
			getUsers();
			
			$scope.labels5 = [];
			var hcd = [];
			var list_friend_user = [];
			
			$timeout(function () {
				
				if($rootScope.auth.Role[0].id !== 0){
					$scope.users.forEach( u => {
						if(u.Zone[0].id === $rootScope.auth.Zone[0].id){
							list_friend_user.push(u);
						}
					})
					
					list_friend_user.forEach(element => {
						DataServices.GetforchartHcd(element.Username, null, null).then(function (res) {
							if (res.data.error_code === 0) {
								var _result = res.data.hcd;
								if (_result.length > 0) {
									hcd.push(_result.length);
								}
							}
						})
						$scope.labels5.push(element.Fullname);
					});
					
					$scope.data5 = [
						hcd
					];
					$scope.series5 = ['Hẹn chưa đến'];
					
					}else{
					
					$scope.users.forEach(element => {
						
						DataServices.GetforchartHcd(element.Username, null, null).then(function (res) {
							if (res.data.error_code === 0) {
								var _result = res.data.hcd;
								hcd.push(_result.length);
							}
						})
						$scope.labels5.push(element.Fullname);
					});
					
					$scope.data5 = [
						hcd
					];
					$scope.series5 = ['Hẹn chưa đến'];
					
				}
			}, 500)
		}
		
		// đến chưa đăng ký
		$scope.dcdk = function () {
			$scope.isactive = 6;
			getUsers();
			
			var dcdk = [];
			$scope.labels6 = [];
			var list_friend_user = [];
			
			$timeout(function () {
				
				if($rootScope.auth.Role[0].id !== 0){
					$scope.users.forEach( u => {
						if(u.Zone[0].id === $rootScope.auth.Zone[0].id){
							list_friend_user.push(u);
						}
					})
					
					list_friend_user.forEach(element => {
						DataServices.GetforchartDcdk(element.Username, null, null).then(function (res) {
							if (res.data.error_code === 0) {
								var _result = res.data.dcdk;
								if (_result.length > 0) {
									dcdk.push(_result.length);
								}
							}
						})
						$scope.labels6.push(element.Fullname);
					});
					
					$scope.data6 = [
						dcdk
					];
					$scope.series6 = ['Đến chưa đăng ký'];
					
					}else{
					
					$scope.users.forEach(element => {
						
						DataServices.GetforchartDcdk(element.Username, null, null).then(function (res) {
							if (res.data.error_code === 0) {
								var _result = res.data.dcdk;
								dcdk.push(_result.length);
							}
						})
						$scope.labels6.push(element.Fullname);
					});
					
					$scope.data6 = [
						dcdk
					];
					$scope.series6 = ['Đến chưa đăng ký'];
					
				}
			}, 500)
		}
		
		// chưa đăng ký
		$scope.cdk = function () {
			$scope.isactive = 7;
			
			getUsers();
			
			var cdk = [];
			$scope.labels7 = [];
			var list_friend_user = [];
			
			$timeout(function () {
				
				if($rootScope.auth.Role[0].id !== 0){
					$scope.users.forEach( u => {
						if(u.Zone[0].id === $rootScope.auth.Zone[0].id){
							list_friend_user.push(u);
						}
					})
					
					list_friend_user.forEach(element => {
						DataServices.GetforchartCdk(element.Username, null, null).then(function (res) {
							if (res.data.error_code === 0) {
								var _result = res.data.cdk;
								if (_result.length > 0) {
									cdk.push(_result.length);
								}
							}
						})
						$scope.labels7.push(element.Fullname);
					});
					
					$scope.data7 = [
						cdk
					];
					$scope.series7 = ['Chưa đăng ký'];
					
					}else{
					
					$scope.users.forEach(element => {
						
						DataServices.GetforchartCdk(element.Username, null, null).then(function (res) {
							if (res.data.error_code === 0) {
								var _result = res.data.cdk;
								cdk.push(_result.length);
							}
						})
						$scope.labels7.push(element.Fullname);
					});
					
					$scope.data7 = [
						cdk
					];
					$scope.series7 = ['Chưa đăng ký'];
					
				}
			}, 500)
		}
		
		// không tiềm năng
		$scope.ktn = function () {
			$scope.isactive = 8;
			
			getUsers();
			
			var ktn = [];
			$scope.labels8 = [];
			var list_friend_user = [];
			
			$timeout(function () {
				
				if($rootScope.auth.Role[0].id !== 0){
					$scope.users.forEach( u => {
						if(u.Zone[0].id === $rootScope.auth.Zone[0].id){
							list_friend_user.push(u);
						}
					})
					
					list_friend_user.forEach(element => {
						DataServices.GetforchartKtn(element.Username, null, null).then(function (res) {
							if (res.data.error_code === 0) {
								var _result = res.data.ktn;
								if (_result.length > 0) {
									ktn.push(_result.length);
								}
							}
						})
						$scope.labels8.push(element.Fullname);
					});
					
					$scope.data8 = [
						ktn
					];
					$scope.series8 = ['Không tiềm năng'];
					
					}else{
					
					$scope.users.forEach(element => {
						
						DataServices.GetforchartKtn(element.Username, null, null).then(function (res) {
							if (res.data.error_code === 0) {
								var _result = res.data.ktn;
								ktn.push(_result.length);
							}
						})
						$scope.labels8.push(element.Fullname);
					});
					
					$scope.data8 = [
						ktn
					];
					$scope.series8 = ['Không tiềm năng'];
					
				}
			}, 500)
		}
		
		// lịch hẹn
		$scope._lh = function () {
			$scope.isactive = 9;
			
			getUsers();
			
			$scope.lh = [];
			var list_friend_user = [];
			
			$timeout(function () {
				
				if($rootScope.auth.Role[0].id !== 0){
					$scope.users.forEach( u => {
						if(u.Zone[0].id === $rootScope.auth.Zone[0].id){
							list_friend_user.push(u);
						}
					})
					
					list_friend_user.forEach(element => {
						DataServices.Getlh(element.Username, null, null).then(function (res) {
							if (res.data.error_code === 0) {
								var _result = res.data.lh;
								$scope.lh.push(_result);
							}
						})
					});
					
					}else{
					
					$scope.users.forEach(element => {
						DataServices.Getlh(element.Username, null, null).then(function (res) {
							if (res.data.error_code === 0) {
								var _result = res.data.lh;
								$scope.lh.push(_result);
							}
						})
					});
					
				}
			}, 500)
		}
	}
})																									
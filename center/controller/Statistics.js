sas
// Optional configuration
.config(['ChartJsProvider', function (ChartJsProvider) {
			// Configure all charts
			ChartJsProvider.setOptions({
				chartColors: ['#2980C3', '#F44336', '#9C27B0', '#FF9800'],
				responsive: true,
				scales: {
					yAxes: [{
							ticks: {
								beginAtZero: true
							},
						}
					]
				},
				legend: {
					display: true
				}
			});
			// Configure all line charts
			ChartJsProvider.setOptions('line', {
				showLines: false
			});
		}
	])
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

		Notifi._loading();
		// lấy thành viên trong group cho user thường
		if ($rootScope.auth.Role[0].id !== 0) {
			$timeout(function () {
				if ($scope.users !== undefined) {
					$scope.users.forEach(u => {
						u.Zone.forEach(elz => {
							if (elz.id === $rootScope.auth.Zone[0].id) {
								list_friend_user.push(u);
							}
						})
						// if(u.Zone[0].id === $rootScope.auth.Zone[0].id){
						// list_friend_user.push(u);
						// }
					})
				}

				if (list_friend_user !== undefined) {
					list_friend_user.forEach(function (element, index) {
						$timeout(function () {
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
						}, 100 * index);
					});
				}

				if (list_friend_user !== undefined) {
					$timeout(function () {
						Notifi._close();
						$scope.data = [
							dataOn,
							dataOut,
							dataIn,
							dataFriend
						];
					}, list_friend_user.length * 50);
				} else {
					$timeout(function () {
						Notifi._close();
						$scope.data = [
							dataOn,
							dataOut,
							dataIn,
							dataFriend
						];
					}, 500);
				}

				$scope.series = ['Online', 'Out', 'In', 'Friend'];
			}, 500)

		} else if ($rootScope.auth.Role[0].id === 0) {

			if ($scope.isactive === 1) {

				$timeout(function () {
					if ($scope.users !== undefined) {
						$scope.users.forEach(function (element, index) {
							$timeout(function () {
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
							}, 100 * index);
						});
					}

					if ($scope.users !== undefined) {
						$timeout(function () {
							Notifi._close();
							$scope.data = [
								dataOn,
								dataOut,
								dataIn,
								dataFriend
							];
						}, $scope.users.length * 50);
					} else {
						Notifi._close();
						$scope.data = [
							dataOn,
							dataOut,
							dataIn,
							dataFriend
						];
					}

					$scope.series = ['Online', 'Out', 'In', 'Friend'];
				}, 500)

			}

		}

		// lọc theo ngày
		$scope.fillbyday = function () {
			Notifi._loading();

			getUsers();
			var list_friend_user = [];

			if ($rootScope.auth.Role[0].id === 0) {
				if ($scope.mgroup._id !== null) {
					$scope.users.forEach(u => {
						u.Zone.forEach(elz => {
							if (elz.id === $scope.mgroup._id) {
								list_friend_user.push(u);
							}
						})
						// if(u.Zone[0].id === $scope.mgroup._id){
						// list_friend_user.push(u);
						// }
					})
				} else {
					list_friend_user = $scope.users;
				}
			} else {
				$scope.users.forEach(u => {
					u.Zone.forEach(elz => {
						if (elz.id === $rootScope.auth.Zone[0].id) {
							list_friend_user.push(u);
						}
					})
					// if(u.Zone[0].id === $rootScope.auth.Zone[0].id){
					// list_friend_user.push(u);
					// }
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
				$scope.data2 = [];

				if (list_friend_user !== undefined) {
					list_friend_user.forEach(function (element, index) {
						$timeout(function () {
							DataServices.GetforchartNotcall(element.Username, _fromday, _today).then(function (res) {
								if (res.data.error_code === 0) {
									var _result = res.data.notcall;
									notcall.push(_result.length);
								}
							})
							$scope.labels2.push(element.Fullname);
						}, 100 * index);
					});
				}

				if (list_friend_user !== undefined && list_friend_user.length > 0) {
					$timeout(function () {
						Notifi._close();
						$scope.data2 = [
							notcall
						];
					}, list_friend_user.length * 50);
				} else {
					$timeout(function () {
						Notifi._close();
						$scope.data2 = [
							notcall
						];
					}, 500);
				}

				$scope.series2 = ['Chưa gọi'];
				break;

			case 3:
				$scope.labels3 = [];
				var relcall = [];
				$scope.data3 = [];

				if (list_friend_user !== undefined) {
					list_friend_user.forEach(function (element, index) {
						$timeout(function () {
							DataServices.GetforchartRecall(element.Username, _fromday, _today).then(function (res) {
								if (res.data.error_code === 0) {
									var _result = res.data.recall;
									relcall.push(_result.length);
								}
							})
							$scope.labels3.push(element.Fullname);
						}, 50 * index);
					});
				}

				if (list_friend_user !== undefined && list_friend_user.length > 0) {
					$timeout(function () {
						Notifi._close();
						$scope.data3 = [
							relcall
						];
					}, list_friend_user.length * 50);
				} else {
					$timeout(function () {
						Notifi._close();
						$scope.data3 = [
							relcall
						]
					}, 500)
				}

				$scope.series3 = ['Gọi lại'];
				break;

			case 4:
				var _tl = [];
				$scope.tl = [];

				if (list_friend_user !== undefined) {
					list_friend_user.forEach(function (element, index) {
						$timeout(function () {
							DataServices.Gettl(element.Username, _fromday, _today).then(function (res) {
								if (res.data.error_code === 0) {
									var _result = res.data.tl;
									_tl.push(_result);
								}
							})
						}, 100 * index);
					});
				}

				if (list_friend_user !== undefined && list_friend_user.length > 0) {
					$timeout(function () {
						Notifi._close();
						$scope.tl = _tl;
					}, list_friend_user.length * 100);
				} else {
					$timeout(function () {
						Notifi._close();
						$scope.tl = _tl;
					}, 500);
				}

				break;

			case 5:
				var hcd = [];
				$scope.data5 = [];
				$scope.labels5 = [];

				if (list_friend_user !== undefined) {
					list_friend_user.forEach(function (element, index) {
						$timeout(function () {
							DataServices.GetforchartHcd(element.Username, _fromday, _today).then(function (res) {
								if (res.data.error_code === 0) {
									var _result = res.data.hcd;
									hcd.push(_result.length);
								}
							})
							$scope.labels5.push(element.Fullname);
						}, 100 * index);
					});
				}

				if (list_friend_user !== undefined && list_friend_user.length > 0) {
					$timeout(function () {
						Notifi._close();
						$scope.data5 = [
							hcd
						];
					}, list_friend_user.length * 100);
				} else {
					$timeout(function () {
						Notifi._close();
						$scope.data5 = [
							hcd
						];
					}, 500);
				}

				$scope.series5 = ['Hẹn chưa đến'];
				break;

			case 6:
				var dcdk = [];
				$scope.labels6 = [];
				$scope.data6 = [];

				if (list_friend_user !== undefined) {
					list_friend_user.forEach(function (element, index) {
						$timeout(function () {
							DataServices.GetforchartDcdk(element.Username, _fromday, _today).then(function (res) {
								if (res.data.error_code === 0) {
									var _result = res.data.dcdk;
									dcdk.push(_result.length);
								}
							})
							$scope.labels6.push(element.Fullname);
						}, 100 * index);
					});
				}

				if (list_friend_user !== undefined && list_friend_user.length > 0) {
					$timeout(function () {
						Notifi._close();
						$scope.data6 = [
							dcdk
						];
					}, list_friend_user.length * 100);
				} else {
					$timeout(function () {
						Notifi._close();
						$scope.data6 = [
							dcdk
						];
					}, 500);
				}

				$scope.series6 = ['Đến chưa đăng ký'];
				break;

			case 7:
				var cdk = [];
				$scope.labels7 = [];
				$scope.data7 = [];

				if (list_friend_user !== undefined) {
					list_friend_user.forEach(function (element, index) {
						$timeout(function () {
							DataServices.GetforchartCdk(element.Username, _fromday, _today).then(function (res) {
								if (res.data.error_code === 0) {
									var _result = res.data.cdk;
									cdk.push(_result.length);
								}
							})
							$scope.labels7.push(element.Fullname);
						}, 100 * index);
					});
				}

				if (list_friend_user !== undefined && list_friend_user.length > 0) {
					$timeout(function () {
						Notifi._close();
						$scope.data7 = [
							cdk
						];
					}, list_friend_user.length * 100);
				} else {
					$timeout(function () {
						Notifi._close();
						$scope.data7 = [
							cdk
						];
					}, 500);
				}

				$scope.series7 = ['Chưa đăng ký'];
				break;

			case 8:
				var ktn = [];
				$scope.labels8 = [];
				$scope.data8 = [];

				if (list_friend_user !== undefined) {
					list_friend_user.forEach(function (element, index) {
						$timeout(function () {
							DataServices.GetforchartKtn(element.Username, _fromday, _today).then(function (res) {
								if (res.data.error_code === 0) {
									var _result = res.data.ktn;
									ktn.push(_result.length);
								}
							})
							$scope.labels8.push(element.Fullname);
						}, 100 * index);
					});
				}

				if (list_friend_user !== undefined && list_friend_user.length > 0) {
					$timeout(function () {
						Notifi._close();
						$scope.data8 = [
							ktn
						];
					}, list_friend_user.length * 100);
				} else {
					$timeout(function () {
						Notifi._close();
						$scope.data8 = [
							ktn
						];
					}, 500);
				}

				$scope.series8 = ['Không tiềm năng'];
				break;

			case 9:
				var _lh = [];
				$scope.lh = [];

				if (list_friend_user !== undefined) {
					list_friend_user.forEach(function (element, index) {
						$timeout(function () {
							DataServices.Getlh(element.Username, _fromday, _today).then(function (res) {
								if (res.data.error_code === 0) {
									var _result = res.data.lh;
									_lh.push(_result);
								}
							})
						}, 100 * index);
					});
				}

				if (list_friend_user !== undefined && list_friend_user.length > 0) {
					$timeout(function () {
						Notifi._close();
						$scope.lh = _lh;
					}, list_friend_user.length * 100);
				} else {
					$timeout(function () {
						Notifi._close();
						$scope.lh = _lh;
					}, 500);
				}

				break;

			case 10:
				var huy = [];
				$scope.labels9 = [];
				$scope.data9 = [];

				if (list_friend_user !== undefined) {
					list_friend_user.forEach(function (element, index) {
						$timeout(function () {
							DataServices.GetforchartH(element.Username, _fromday, _today).then(function (res) {
								if (res.data.error_code === 0) {
									var _result = res.data.h;
									huy.push(_result.length);
								}
							})
							$scope.labels9.push(element.Fullname);
						}, 100 * index);
					});
				}

				if (list_friend_user !== undefined && list_friend_user.length > 0) {
					$timeout(function () {
						Notifi._close();
						$scope.data9 = [
							huy
						];
					}, list_friend_user.length * 100);
				} else {
					$timeout(function () {
						Notifi._close();
						$scope.data9 = [
							huy
						];
					}, 500);
				}

				$scope.series8 = ['Hủy'];
				break;

			default:
				$scope.labels1 = [];
				var dataOn = [];
				var dataOut = [];
				var dataIn = [];
				var dataFriend = [];
				$scope.data = [];

				if (list_friend_user !== undefined) {
					list_friend_user.forEach(function (element, index) {
						$timeout(function () {
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
						}, 100 * index);
					});
				}

				if (list_friend_user !== undefined && list_friend_user.length > 0) {
					$timeout(function () {
						Notifi._close();
						$scope.data = [
							dataOn,
							dataOut,
							dataIn,
							dataFriend
						];
					}, list_friend_user.length * 100);
				} else {
					$timeout(function () {
						Notifi._close();
						$scope.data = [
							dataOn,
							dataOut,
							dataIn,
							dataFriend
						];
					}, 500);
				}

				$scope.series = ['Online', 'Out', 'In', 'Friend'];
			}

		}

		// tổng quan
		$scope.tq = function () {
			$scope.isactive = 1;
		}

		// chưa gọi
		$scope.cg = function () {
			Notifi._loading();

			getUsers();
			$scope.isactive = 2;

			$scope.labels2 = [];
			var notcall = [];
			var list_friend_user = [];

			$timeout(function () {
				if ($rootScope.auth.Role[0].id !== 0) {
					if ($scope.users !== undefined) {
						$scope.users.forEach(u => {
							if (u.Zone[0].id === $rootScope.auth.Zone[0].id) {
								list_friend_user.push(u);
							}
						})
					}

					if (list_friend_user !== undefined) {
						list_friend_user.forEach(function (element, index) {
							$timeout(function () {
								DataServices.GetforchartNotcall(element.Username, null, null).then(function (res) {
									if (res.data.error_code === 0) {
										var _result = res.data.notcall;
										if (_result.length > 0) {
											notcall.push(_result.length);
										}
									}
								})
								$scope.labels2.push(element.Fullname);
							}, index * 200);

						});
					}

					if (list_friend_user !== undefined && list_friend_user.length > 0) {
						$timeout(function () {
							Notifi._close();
							$scope.data2 = [
								notcall
							];
						}, list_friend_user.length * 100);
					} else {
						$timeout(function () {
							Notifi._close();
							$scope.data2 = [
								notcall
							];
						}, 500);
					}

					$scope.series2 = ['Chưa gọi'];

				} else {

					if ($scope.users !== undefined) {
						$scope.users.forEach(function (element, index) {
							$timeout(function () {
								DataServices.GetforchartNotcall(element.Username, null, null).then(function (res) {
									if (res.data.error_code === 0) {
										var _result = res.data.notcall;
										// if (_result.length > 0) {
										notcall.push(_result.length);
										// }
									}
								})
								$scope.labels2.push(element.Fullname);
							}, index * 100);
						});
					}

					if ($scope.users !== undefined && $scope.users.length > 0) {
						$timeout(function () {
							Notifi._close();
							$scope.data2 = [
								notcall
							];
						}, $scope.users.length * 100);
					} else {
						$timeout(function () {
							Notifi._close();
							$scope.data2 = [
								notcall
							];
						}, 500);
					}

					$scope.series2 = ['Chưa gọi'];

				}
			}, 500)
		}

		// gọi lại
		$scope.gl = function () {
			Notifi._loading();
			getUsers();
			$scope.isactive = 3;
			$scope.labels3 = [];
			var relcall = [];
			var list_friend_user = [];
			$timeout(function () {

				if ($rootScope.auth.Role[0].id !== 0) {
					if ($scope.users !== undefined) {
						$scope.users.forEach(u => {
							if (u.Zone[0].id === $rootScope.auth.Zone[0].id) {
								list_friend_user.push(u);
							}
						})
					}

					if (list_friend_user !== undefined) {
						list_friend_user.forEach(function (element, index) {
							$timeout(function () {
								DataServices.GetforchartRecall(element.Username, null, null).then(function (res) {
									if (res.data.error_code === 0) {
										var _result = res.data.recall;
										// if (_result.length > 0) {
										relcall.push(_result.length);
										// }
									}
								})
								$scope.labels3.push(element.Fullname);
							}, index * 100);
						});
					}

					if (list_friend_user !== undefined && list_friend_user.length > 0) {
						$timeout(function () {
							Notifi._close();
							$scope.data3 = [
								relcall
							];
						}, list_friend_user.length * 100);
					} else {
						$timeout(function () {
							Notifi._close();
							$scope.data3 = [
								relcall
							];
						}, 500);
					}

					$scope.series3 = ['Gọi lại'];

				} else {
					if ($scope.users !== undefined) {
						$scope.users.forEach(function (element, index) {
							$timeout(function () {
								DataServices.GetforchartRecall(element.Username, null, null).then(function (res) {
									if (res.data.error_code === 0) {
										var _result = res.data.recall;
										relcall.push(_result.length);
									}
								})
								$scope.labels3.push(element.Fullname);
							}, index * 100);
						});
					}

					if ($scope.users !== undefined && $scope.users.length > 0) {
						$timeout(function () {
							Notifi._close();
							$scope.data3 = [
								relcall
							];
						}, $scope.users.length * 100);
					} else {
						$timeout(function () {
							Notifi._close();
							$scope.data3 = [
								relcall
							];
						}, 500);
					}

					$scope.series3 = ['Gọi lại'];

				}
			}, 500)

		}

		// tỷ lệ
		$scope._tl = function () {
			Notifi._loading();

			$scope.isactive = 4;

			var list_friend_user = [];
			var _tl = [];
			$scope.tl = [];

			if ($rootScope.auth.Role[0].id !== 0) {
				if ($scope.users !== undefined) {
					$scope.users.forEach(u => {
						if (u.Zone[0].id === $rootScope.auth.Zone[0].id) {
							list_friend_user.push(u);
						}
					})
				}

				if (list_friend_user !== undefined) {
					list_friend_user.forEach(function (element, index) {
						$timeout(function () {
							DataServices.Gettl(element.Username, null, null).then(function (res) {
								if (res.data.error_code === 0) {
									var _result = res.data.tl;
									_tl.push(_result);
								}
							})
						}, index * 100);
					});
				}

				if (list_friend_user !== undefined && list_friend_user.length > 0) {
					$timeout(function () {
						Notifi._close();
						$scope.tl = _tl;
					}, list_friend_user.length * 100);
				} else {
					$timeout(function () {
						Notifi._close();
						$scope.tl = _tl;
					}, 500);
				}

			} else {
				if ($scope.users !== undefined) {
					$scope.users.forEach(function (element, index) {
						$timeout(function () {
							DataServices.Gettl(element.Username, null, null).then(function (res) {
								if (res.data.error_code === 0) {
									var _result = res.data.tl;
									_tl.push(_result);
								}
							})
						}, index * 100);
					});
				}

				if ($scope.users !== undefined && $scope.users.length > 0) {
					$timeout(function () {
						Notifi._close();
						$scope.tl = _tl;
					}, $scope.users.length * 100);
				} else {
					$timeout(function () {
						Notifi._close();
						$scope.tl = _tl;
					}, 500);
				}
			}
		}

		// hẹn chưa đến
		$scope.hcd = function () {
			Notifi._loading();

			$scope.isactive = 5;
			getUsers();

			$scope.labels5 = [];
			var hcd = [];
			var list_friend_user = [];

			$timeout(function () {

				if ($rootScope.auth.Role[0].id !== 0) {
					if ($scope.users !== undefined) {
						$scope.users.forEach(u => {
							if (u.Zone[0].id === $rootScope.auth.Zone[0].id) {
								list_friend_user.push(u);
							}
						});
					}

					if (list_friend_user !== undefined) {
						list_friend_user.forEach(function (element, index) {
							$timeout(function () {
								DataServices.GetforchartHcd(element.Username, null, null).then(function (res) {
									if (res.data.error_code === 0) {
										var _result = res.data.hcd;
										// if (_result.length > 0) {
										hcd.push(_result.length);
										// }
									}
								})
								$scope.labels5.push(element.Fullname);
							}, index * 100);

						});
					}

					if (list_friend_user !== undefined && list_friend_user.length > 0) {
						$timeout(function () {
							Notifi._close();
							$scope.data5 = [
								hcd
							];
						}, list_friend_user.length * 100);
					} else {
						$timeout(function () {
							Notifi._close();
							$scope.data5 = [
								hcd
							];
						}, 500);
					}

					$scope.series5 = ['Hẹn chưa đến'];

				} else {

					if ($scope.users !== undefined) {
						$scope.users.forEach(function (element, index) {
							$timeout(function () {
								DataServices.GetforchartHcd(element.Username, null, null).then(function (res) {
									if (res.data.error_code === 0) {
										var _result = res.data.hcd;
										hcd.push(_result.length);
									}
								})
								$scope.labels5.push(element.Fullname);
							}, index * 100);
						});
					}

					if ($scope.users !== undefined && $scope.users.length > 0) {
						$timeout(function () {
							Notifi._close();
							$scope.data5 = [
								hcd
							];
						}, $scope.users.length * 100);
					} else {
						$timeout(function () {
							Notifi._close();
							$scope.data5 = [
								hcd
							];
						}, 500);
					}

					$scope.series5 = ['Hẹn chưa đến'];

				}
			}, 500)
		}

		// đến chưa đăng ký
		$scope.dcdk = function () {
			Notifi._loading();
			$scope.isactive = 6;
			getUsers();

			var dcdk = [];
			$scope.labels6 = [];
			var list_friend_user = [];

			$timeout(function () {

				if ($rootScope.auth.Role[0].id !== 0) {
					if ($scope.users !== undefined) {
						$scope.users.forEach(u => {
							if (u.Zone[0].id === $rootScope.auth.Zone[0].id) {
								list_friend_user.push(u);
							}
						});
					}

					if (list_friend_user !== undefined) {
						list_friend_user.forEach(function (element, index) {
							$timeout(function () {
								DataServices.GetforchartDcdk(element.Username, null, null).then(function (res) {
									if (res.data.error_code === 0) {
										var _result = res.data.dcdk;
										if (_result.length > 0) {
											dcdk.push(_result.length);
										}
									}
								})
								$scope.labels6.push(element.Fullname);
							}, index * 100);
						});
					}

					if (list_friend_user !== undefined && list_friend_user.length > 0) {
						$timeout(function () {
							Notifi._close();
							$scope.data6 = [
								dcdk
							];
						}, list_friend_user.length * 100);
					} else {
						$timeout(function () {
							Notifi._close();
							$scope.data6 = [
								dcdk
							];
						}, 500);
					}

					$scope.series6 = ['Đến chưa đăng ký'];

				} else {
					if ($scope.users !== undefined) {
						$scope.users.forEach(function (element, index) {
							$timeout(function () {
								DataServices.GetforchartDcdk(element.Username, null, null).then(function (res) {
									if (res.data.error_code === 0) {
										var _result = res.data.dcdk;
										dcdk.push(_result.length);
									}
								})
								$scope.labels6.push(element.Fullname);
							}, index * 100);
						});
					}

					if ($scope.users !== undefined && $scope.users.length > 0) {
						$timeout(function () {
							Notifi._close();
							$scope.data6 = [
								dcdk
							];
						}, $scope.users.length * 100);
					} else {
						$timeout(function () {
							Notifi._close();
							$scope.data6 = [
								dcdk
							];
						}, 500);
					}

					$scope.series6 = ['Đến chưa đăng ký'];

				}
			}, 500)
		}

		// chưa đăng ký
		$scope.cdk = function () {
			Notifi._loading();
			$scope.isactive = 7;

			getUsers();

			var cdk = [];
			$scope.labels7 = [];
			var list_friend_user = [];

			$timeout(function () {

				if ($rootScope.auth.Role[0].id !== 0) {
					if ($scope.users !== undefined) {
						$scope.users.forEach(u => {
							if (u.Zone[0].id === $rootScope.auth.Zone[0].id) {
								list_friend_user.push(u);
							}
						});
					}

					if (list_friend_user !== undefined) {
						list_friend_user.forEach(function (element, index) {
							$timeout(function () {
								DataServices.GetforchartCdk(element.Username, null, null).then(function (res) {
									if (res.data.error_code === 0) {
										var _result = res.data.cdk;
										if (_result.length > 0) {
											cdk.push(_result.length);
										}
									}
								})
								$scope.labels7.push(element.Fullname);
							}, index * 100);
						});
					}

					if (list_friend_user !== undefined && list_friend_user.length > 0) {
						$timeout(function () {
							Notifi._close();
							$scope.data7 = [
								cdk
							];
						}, list_friend_user.length * 100);
					} else {
						$timeout(function () {
							Notifi._close();
							$scope.data7 = [
								cdk
							];
						}, 500);
					}

					$scope.series7 = ['Chưa đăng ký'];

				} else {
					if ($scope.users !== undefined) {
						$scope.users.forEach(function (element, index) {
							$timeout(function () {
								DataServices.GetforchartCdk(element.Username, null, null).then(function (res) {
									if (res.data.error_code === 0) {
										var _result = res.data.cdk;
										cdk.push(_result.length);
									}
								})
								$scope.labels7.push(element.Fullname);
							}, index * 100);
						});
					}

					if ($scope.users !== undefined && $scope.users.length > 0) {
						$timeout(function () {
							Notifi._close();
							$scope.data7 = [
								cdk
							];
						}, $scope.users.length * 100);
					} else {
						$timeout(function () {
							Notifi._close();
							$scope.data7 = [
								cdk
							];
						}, 500);
					}

					$scope.series7 = ['Chưa đăng ký'];

				}
			}, 500)
		}

		// không tiềm năng
		$scope.ktn = function () {
			Notifi._loading();

			$scope.isactive = 8;

			getUsers();

			var ktn = [];
			$scope.labels8 = [];
			var list_friend_user = [];

			$timeout(function () {

				if ($rootScope.auth.Role[0].id !== 0) {
					if ($scope.users !== undefined) {
						$scope.users.forEach(u => {
							if (u.Zone[0].id === $rootScope.auth.Zone[0].id) {
								list_friend_user.push(u);
							}
						});
					}

					if (list_friend_user !== undefined) {
						list_friend_user.forEach(function (element, index) {
							$timeout(function () {
								DataServices.GetforchartKtn(element.Username, null, null).then(function (res) {
									if (res.data.error_code === 0) {
										var _result = res.data.ktn;
										if (_result.length > 0) {
											ktn.push(_result.length);
										}
									}
								})
								$scope.labels8.push(element.Fullname);
							}, index * 100);
						});
					}

					if (list_friend_user !== undefined && list_friend_user.length > 0) {
						$timeout(function () {
							Notifi._close();
							$scope.data8 = [
								ktn
							];
						}, list_friend_user.length * 100);
					} else {
						$timeout(function () {
							Notifi._close();
							$scope.data8 = [
								ktn
							];
						}, 500);
					}

					$scope.series8 = ['Không tiềm năng'];

				} else {
					if ($scope.users !== undefined) {
						$scope.users.forEach(function (element, index) {
							$timeout(function () {
								DataServices.GetforchartKtn(element.Username, null, null).then(function (res) {
									if (res.data.error_code === 0) {
										var _result = res.data.ktn;
										ktn.push(_result.length);
									}
								})
								$scope.labels8.push(element.Fullname);
							}, index * 100);
						});
					}

					if ($scope.users !== undefined && $scope.users.length > 0) {
						$timeout(function () {
							Notifi._close();
							$scope.data8 = [
								ktn
							];
						}, $scope.users.length * 100);
					} else {
						$timeout(function () {
							Notifi._close();
							$scope.data8 = [
								ktn
							];
						}, 500);
					}

					$scope.series8 = ['Không tiềm năng'];

				}
			}, 500)
		}

		$scope.h = function () {
			Notifi._loading();
			$scope.isactive = 10;

			getUsers();

			var huy = [];
			$scope.labels9 = [];
			var list_friend_user = [];

			$timeout(function () {

				if ($rootScope.auth.Role[0].id !== 0) {
					if ($scope.users !== undefined) {
						$scope.users.forEach(u => {
							if (u.Zone[0].id === $rootScope.auth.Zone[0].id) {
								list_friend_user.push(u);
							}
						});
					}

					if (list_friend_user !== undefined) {
						list_friend_user.forEach(function (element, index) {
							$timeout(function () {
								DataServices.GetforchartH(element.Username, null, null).then(function (res) {
									if (res.data.error_code === 0) {
										var _result = res.data.h;
										if (_result.length > 0) {
											huy.push(_result.length);
										}
									}
								})
								$scope.labels9.push(element.Fullname);
							}, index * 100);
						});
					}

					if (list_friend_user !== undefined && list_friend_user.length > 0) {
						$timeout(function () {
							Notifi._close();
							$scope.data9 = [
								ktn
							];
						}, list_friend_user.length * 100);
					} else {
						$timeout(function () {
							Notifi._close();
							$scope.data9 = [
								ktn
							];
						}, 500);
					}

					$scope.series9 = ['Hủy'];

				} else {
					if ($scope.users !== undefined) {
						$scope.users.forEach(function (element, index) {
							$timeout(function () {
								DataServices.GetforchartH(element.Username, null, null).then(function (res) {
									if (res.data.error_code === 0) {
										var _result = res.data.h;
										huy.push(_result.length);
									}
								})
								$scope.labels9.push(element.Fullname);
							}, index * 100);
						});
					}

					if ($scope.users !== undefined && $scope.users.length > 0) {
						$timeout(function () {
							Notifi._close();
							$scope.data9 = [
								huy
							];
						}, $scope.users.length * 100);
					} else {
						$timeout(function () {
							Notifi._close();
							$scope.data9 = [
								huy
							];
						}, 500);
					}

					$scope.series9 = ['Hủy'];

				}
			}, 500)
		}

		// lịch hẹn
		$scope._lh = function () {
			Notifi._loading();
			$scope.isactive = 9;

			getUsers();

			_lh = [];
			$scope.lh = [];

			var list_friend_user = [];

			$timeout(function () {

				if ($rootScope.auth.Role[0].id !== 0) {
					if ($scope.users !== undefined) {
						$scope.users.forEach(u => {
							if (u.Zone[0].id === $rootScope.auth.Zone[0].id) {
								list_friend_user.push(u);
							}
						});
					}

					if (list_friend_user !== undefined) {
						list_friend_user.forEach(function (element, index) {
							$timeout(function () {
								DataServices.Getlh(element.Username, null, null).then(function (res) {
									if (res.data.error_code === 0) {
										var _result = res.data.lh;
										_lh.push(_result);
									}
								})
							}, index * 100);
						});
					}

					if (list_friend_user !== undefined && list_friend_user.length > 0) {
						$timeout(function () {
							Notifi._close();
							$scope.lh = _lh;
						}, list_friend_user.length * 100);
					} else {
						$timeout(function () {
							Notifi._close();
							$scope.lh = _lh;
						}, 500);
					}

				} else {
					if ($scope.users !== undefined) {
						$scope.users.forEach(function (element, index) {
							$timeout(function () {
								DataServices.Getlh(element.Username, null, null).then(function (res) {
									if (res.data.error_code === 0) {
										var _result = res.data.lh;
										_lh.push(_result);
									}
								})
							}, index * 100);
						});
					}

					if ($scope.users !== undefined && $scope.users.length > 0) {
						$timeout(function () {
							Notifi._close();
							$scope.lh = _lh;
						}, $scope.users.length * 100);
					} else {
						$timeout(function () {
							Notifi._close();
							$scope.lh = _lh;
						}, 500);
					}
				}
			}, 500)
		}
	}
})

sas
    .controller('SetupCtrl', function ($location, DataServices, Notifi, $rootScope, ngDialog, $timeout, $scope) {
        // check exit user
        $rootScope.auth = JSON.parse(localStorage.getItem('Auth'));
        if (!$rootScope.auth) {
            $location.path('/login');
        } else {
            DataServices.GetallUser().then(function (repsonse) {
                if (repsonse.data.error_code === 0) {
					if($rootScope.auth.Role[0].id === 0){
						$scope.users = repsonse.data.users;
					}else{
						$scope.users = [];
						repsonse.data.users.forEach( element => {
							if($rootScope.auth.Zone[0].id === element.Zone[0].id){
								$scope.users.push(element);
							}
						})
					}
					
					$scope._user = [{
							_id: null,
							Fullname: 'Chọn' 
						}]
					$scope.users.forEach( u => {
						$scope._user.push(u);
					})
					$scope.chooseu = $scope._user[0];
                } else {
                    Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.')
                }
            });
            
            $scope.ChangeStatus = function (data, check) {
                DataServices.UpdateStatus(data._id, check).then(function (repsonse) {
                    if (repsonse.data.error_code === 0) {
                        Notifi._success('Cập nhật thông tin thành công');
                    } else {
                        Notifi._error('Có lỗi trong quá trình lấy dữ liệu, load lại trang để thử lại.')
                    }
                })
            }
	
			$scope.OpenShare = function(data){
				$scope._detail = data;
				$('#share').modal('show');
			}
	
            $scope.Share = function (data) {
				let _num = 0;
				let _all;
				

				if(data !== undefined){
					if(data.s !== null){
						_num = data.s;
					}
				}
				
				if($scope.chooseu._id !== null){
					_all = $scope.chooseu.Username;
				}else{
					_all = null;
				}
				

				if(_all !== null){
				
					ngDialog.open({
						template: 'templates/loading.html',
						className: 'ngdialog-theme-default',
						paint: true,
						showClose: false,
						closeByDocument: false,
						closeByEscape: false
					});

					DataServices.ShareStudent($scope._detail.Username, _all, _num).then(function (repsonse) {
						$timeout(function () {
							if (repsonse.data.error_code === 0) {
								Notifi._success('học viên đã được chuyển thành công');
								$scope.enable = false;
							} else if (repsonse.data.error_code === 3) {
								Notifi._error('telesale không còn học viên để chuyển');
							} else if (repsonse.data.error_code === 2) {
								Notifi._error('hiện chỉ còn 1 telesale nên không thể chuyển học viên');
							}
							ngDialog.close();
						}, 2900);
					})

				}else{
					Notifi._error('Vui lòng chọn user cần chuyển học viên');
				}
            }
        }
    })
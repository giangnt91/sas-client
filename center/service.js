angular.module('SASService', [])
    .factory('DataServices', function ($http) {
        var api_gateway_url = 'http://112.78.1.78:191';
        // var api_gateway_url = 'http://localhost:191';
        var parameter;
        var url;
        var header = { header: { 'Conntent-Type': 'application/x-www-form-urlencoded' } };

        return {
            // Api Auth
			TheAccess: function(_id, Access){
				parameter = JSON.stringify({
					_id: _id,
					Access: Access
				});
				url = api_gateway_url + '/access';
				return $http.post(url, parameter, header);
			},
            withOut: function (_id) {
                parameter = JSON.stringify({
                    _id: _id
                })
                url = api_gateway_url + '/withoutlogin';
                return $http.post(url, parameter, header);
            },
            signIn: function (Username, Password) {
                parameter = JSON.stringify({
                    Username: Username,
                    Password: Password
                });
                url = api_gateway_url + '/signin';
                return $http.post(url, parameter, header);
            },
            signUp: function (Username, Password, Fullname, Email, Phone, Birthday, Role, Zone, Inspect) {
                parameter = JSON.stringify({
                    Username: Username,
                    Password: Password,
                    Fullname: Fullname,
                    Email: Email,
                    Phone: Phone,
                    Birthday: Birthday,
                    Role: Role,
                    Zone: Zone,
					Inspect: Inspect
                });
                url = api_gateway_url + '/signup';
                return $http.post(url, parameter, header);
            },
            Update: function (Username, Password) {
                parameter = JSON.stringify({
                    Username: Username,
                    Password: Password
                });
                url = api_gateway_url + '/update';
                return $http.post(url, parameter, header)
            },
            UpdateUser: function (_detail) {
                parameter = JSON.stringify({
                    _detail: _detail
                });
                url = api_gateway_url + '/updateUser';
                return $http.post(url, parameter, header)
            },
            UpdateZoneUser: function (Zone, _id) {
                parameter = JSON.stringify({
                    Zone: Zone,
                    _id: _id
                });
                url = api_gateway_url + '/updatezoneUser';
                return $http.post(url, parameter, header)
            },
            Updatermleader: function (_id) {
                parameter = JSON.stringify({
                    _id: _id
                });
                url = api_gateway_url + '/updatermleader';
                return $http.post(url, parameter, header)
            },
            DeleteUser: function (_id) {
                parameter = JSON.stringify({
                    _id: _id
                })
                url = api_gateway_url + '/deleteuser';
                return $http.post(url, parameter, header);
            },
            Resetpass: function (_id, new_pass) {
                parameter = JSON.stringify({
                    _id: _id,
                    new_pass: new_pass
                })
                url = api_gateway_url + '/resetuser';
                return $http.post(url, parameter, header);
            },
            GetallUser: function () {
                url = api_gateway_url + '/getuserbysup';
                return $http.post(url, parameter, header);
            },
            AllUser: function () {
                url = api_gateway_url + '/alluser';
                return $http.post(url, parameter, header);
            },
            GetallUSerforGroup: function () {
                url = api_gateway_url + '/getallusergroup';
                return $http.post(url, parameter, header);
            },
            GetUserforGroup: function (id, Role) {
                parameter = JSON.stringify({
                    id: id,
                    Role: Role
                })
                url = api_gateway_url + '/getuserforgroup';
                return $http.post(url, parameter, header);
            },
            UpdateStatus: function (_id, value) {
                parameter = JSON.stringify({
                    _id: _id,
                    value: value
                });
                url = api_gateway_url + '/upstatus';
                return $http.post(url, parameter, header);
            },
            UpdateSheetStatus: function (_id, value) {
                parameter = JSON.stringify({
                    _id: _id,
                    value: value
                });
                url = api_gateway_url + '/upsheetstatus';
                return $http.post(url, parameter, header);
            },
            ShareStudent: function (From, Username, TheNum, _Status, _toGroup) {
                parameter = JSON.stringify({
					From: From,
                    Username: Username,
					TheNum: TheNum,
					_Status: _Status,
					_toGroup: _toGroup
                });
                url = api_gateway_url + '/sharestudent';
                return $http.post(url, parameter, header);
            },
            Rmgroupofuser: function (_id) {
                parameter = JSON.stringify({
                    _id: _id
                })
                url = api_gateway_url + '/rmgroupofuser';
                return $http.post(url, parameter, header);
            },

            // Groups
            Cgroup: function (Name, Gtype, Leader) {
                parameter = JSON.stringify({
                    Name: Name,
                    Gtype: Gtype,
                    Leader: Leader
                });
                url = api_gateway_url + '/cgroup';
                return $http.post(url, parameter, header);
            },
            GetallGgroup: function () {
                url = api_gateway_url + '/allgroup';
                return $http.post(url, parameter, header);
            },
            DelGroup: function (_id) {
                parameter = JSON.stringify({
                    _id: _id
                })
                url = api_gateway_url + '/delgroup';
                return $http.post(url, parameter, header);
            },
            UpGroup: function (group) {
                parameter = JSON.stringify({
                    group: group
                })
                url = api_gateway_url + '/upgroup';
                return $http.post(url, parameter, header);
            },
            GetallMakerting: function () {
                url = api_gateway_url + '/getallmakerting';
                return $http.post(url, parameter, header);
            },
            GettqMakert: function (Role, Username, Fullname, Fromday, Today, TheForm) {
                parameter = JSON.stringify({
                    Role: Role,
                    Username: Username,
                    Fullname: Fullname,
                    Fromday: Fromday,
                    Today: Today,
                    TheForm: TheForm
                })
                url = api_gateway_url + '/gettqmakert';
                return $http.post(url, parameter, header);
            },
			GetCenter: function(){
				url = api_gateway_url + '/getcenter';
				return $http.post(url, parameter, header);
			},
            //Api Student
            CstudentF: function (Fistname, Lastname, Fullname, Email, Phone, Sex, Address, Regday, Note, Center, Appointment_day, Appointment_dayiso, Appointment_time, Status_student, Manager) {
                parameter = {
					Fistname: Fistname,
					Lastname: Lastname,
                    Fullname: Fullname,
                    Email: Email,
                    Phone: Phone,
                    Sex: Sex,
                    Address: Address,
                    Regday: Regday,
                    Note: Note,
                    Center: Center,
                    Appointment_day: Appointment_day,
                    Appointment_dayiso: Appointment_dayiso,
                    Appointment_time: Appointment_time,
                    Status_student: Status_student,
                    Manager: Manager
                }
                url = api_gateway_url + '/cstudent';
                return $http.post(url, parameter, header);
            },
			GetByGroup: function(_id, Start, Length, Search){
				parameter = JSON.stringify({
					_id: _id,
					Start: Start,
					Length: Length,
					Search: Search
				});
				url = api_gateway_url + '/getbygroup';
				return $http.post(url, parameter, header);
			},
            Getall: function (Username, Role, Start, Length, Search) {
                parameter = JSON.stringify({
                    Username: Username,
                    Role: Role,
					Start: Start,
					Length: Length,
					Search: Search
                });
                url = api_gateway_url + '/getall';
                return $http.post(url, parameter, header);
            },
            GetallQuery: function (Role, Username, Fromday, Today, _status, form, Start, Length, Search) {
                parameter = JSON.stringify({
                    Role: Role,
                    Username: Username,
                    Fromday: Fromday,
                    Today: Today,
                    _status: _status,
                    form: form,
					Start: Start,
					Length: Length,
					Search: Search
                });
                url = api_gateway_url + '/getallquery';
                return $http.post(url, parameter, header)
            },
            GetforNotif: function (Username, Role, Time, Day) {
                parameter = JSON.stringify({
                    Username: Username,
                    Role: Role,
                    Time,
                    Day
                });
                url = api_gateway_url + '/getfornof';
                return $http.post(url, parameter, header);
            },
            UpStudent: function (detail) {
                parameter = JSON.stringify({
                    detail: detail
                });
                url = api_gateway_url + '/upstudent';
                return $http.post(url, parameter, header);
            },
			SendStudentById: function(detail){
				parameter = JSON.stringify({
					detail: detail
				});
				url = api_gateway_url + '/sendstudent';
				return $http.post(url, parameter, header);
			},

            // Tìm kiếm
			SearchPro: function(proName, proCenter, proAddress, proSale, Start, Length, Search){
				parameter = JSON.stringify({
					proName: proName,
					proCenter: proCenter,
					proAddress: proAddress,
					proSale: proSale,
					Start: Start,
					Length: Length,
					Search: Search
				});
				url = api_gateway_url + '/searchpro';
				return $http.post(url, parameter, header);
			},
			SearchByPhone: function(Phone, Start, Length, Search){
				parameter = JSON.stringify({
					Phone: Phone,
					Start: Start,
					Length: Length,
					Search: Search
				});
				url = api_gateway_url + '/searchbyphone';
				return $http.post(url, parameter, header);
			},
            SearchH: function (Role, Username, Regday, Regday2, Center, Status, Start, Length, Search) {
                parameter = JSON.stringify({
                    Role: Role,
                    Username: Username,
                    Regday: Regday,
                    Regday2: Regday2,
                    Center: Center,
                    Status: Status,
					Start: Start,
					Length: Length,
					Search: Search
                });
                url = api_gateway_url + '/searchhome';
                return $http.post(url, parameter, header);
            },
            SearchN: function (Role, Regday, Regday2, Username, Start, Length, Search) {
                parameter = JSON.stringify({
                    Role: Role,
                    Regday: Regday,
                    Regday2: Regday2,
                    Username: Username,
					Start: Start,
					Length: Length,
					Search: Search
                });
                url = api_gateway_url + '/searchnotcall';
                return $http.post(url, parameter, header);
            },
            SearchR: function (Role, Username, Retime, Retime2, Reday, Reday2, Sale, Start, Length, Search) {
                parameter = JSON.stringify({
                    Role: Role,
                    Username: Username,
                    Retime: Retime,
                    Retime2: Retime2,
                    Reday: Reday,
                    Reday2: Reday2,
                    Sale: Sale,
					Start: Start,
					Length: Length,
					Search: Search
                });
                url = api_gateway_url + '/searchrecall';
                return $http.post(url, parameter, header);
            },
            SearchSch: function (Role, Username, Regday, Regday2, Sale, Start, Length, Search) {
                parameter = JSON.stringify({
                    Role: Role,
                    Username: Username,
                    Regday: Regday,
                    Regday2: Regday2,
                    Sale: Sale,
					Start: Start,
					Length: Length,
					Search: Search
                })
                url = api_gateway_url + '/searchschedule';
                return $http.post(url, parameter, header);
            },
            SearchUn: function (Role, Regday, Regday2, Username, Start, Length, Search) {
                parameter = JSON.stringify({
                    Role: Role,
                    Regday: Regday,
                    Regday2: Regday2,
                    Username: Username,
					Start: Start,
					Length: Length,
					Search: Search
                })
                url = api_gateway_url + '/searchunreg';
                return $http.post(url, parameter, header);
            },
            SearchS: function (Role, Username, Regday, Regday2, Sale, Start, Length, Search) {
                parameter = JSON.stringify({
                    Role: Role,
                    Username: Username,
                    Regday: Regday,
                    Regday2: Regday2,
                    Sale: Sale,
					Start: Start,
					Length: Length,
					Search: Search
                })
                url = api_gateway_url + '/searchsend';
                return $http.post(url, parameter, header);
            },
            SearchC: function (Role, Username, Cday, Cday2, Sale, Start, Length, Search) {
                parameter = JSON.stringify({
                    Role: Role,
                    Username: Username,
                    Cday: Cday,
                    Cday2: Cday2,
                    Sale: Sale,
					Start: Start,
					Length: Length,
					Search: Search
                })
                url = api_gateway_url + '/searchcalendar';
                return $http.post(url, parameter, header);
            },
            // kết thúc

            // lấy dữ liệu cho chart
            GetforchartDefault: function (Username, Fromday, Today) {
                parameter = JSON.stringify({
                    Username: Username,
                    Fromday: Fromday,
                    Today: Today
                })
                url = api_gateway_url + '/chartdefault';
                return $http.post(url, parameter, header);
            },
            GetforchartNotcall: function (Username, Fromday, Today) {
                parameter = JSON.stringify({
                    Username: Username,
                    Fromday: Fromday,
                    Today: Today
                })
                url = api_gateway_url + '/chartnotcall';
                return $http.post(url, parameter, header);
            },
            GetforchartRecall: function (Username, Fromday, Today) {
                parameter = JSON.stringify({
                    Username: Username,
                    Fromday: Fromday,
                    Today: Today
                })
                url = api_gateway_url + '/chartrecall';
                return $http.post(url, parameter, header);
            },
            Gettl: function (Username, Fromday, Today) {
                parameter = JSON.stringify({
                    Username: Username,
                    Fromday: Fromday,
                    Today: Today
                })
                url = api_gateway_url + '/charttl';
                return $http.post(url, parameter, header);
            },
            GetforchartHcd: function (Username, Fromday, Today) {
                parameter = JSON.stringify({
                    Username: Username,
                    Fromday: Fromday,
                    Today: Today
                })
                url = api_gateway_url + '/charthcd';
                return $http.post(url, parameter, header);
            },
            GetforchartDcdk: function (Username, Fromday, Today) {
                parameter = JSON.stringify({
                    Username: Username,
                    Fromday: Fromday,
                    Today: Today
                })
                url = api_gateway_url + '/chartdcdk';
                return $http.post(url, parameter, header);
            },
            GetforchartCdk: function (Username, Fromday, Today) {
                parameter = JSON.stringify({
                    Username: Username,
                    Fromday: Fromday,
                    Today: Today
                })
                url = api_gateway_url + '/chartcdk';
                return $http.post(url, parameter, header);
            },
            GetforchartKtn: function (Username, Fromday, Today) {
                parameter = JSON.stringify({
                    Username: Username,
                    Fromday: Fromday,
                    Today: Today
                })
                url = api_gateway_url + '/chartktn';
                return $http.post(url, parameter, header);
            },
			GetforchartH: function (Username, Fromday, Today) {
				parameter = JSON.stringify({
                    Username: Username,
                    Fromday: Fromday,
                    Today: Today
                })
                url = api_gateway_url + '/charthuy';
                return $http.post(url, parameter, header);
			},
            Getlh: function (Username, Fromday, Today) {
                parameter = JSON.stringify({
                    Username: Username,
                    Fromday: Fromday,
                    Today: Today
                })
                url = api_gateway_url + '/chartlh';
                return $http.post(url, parameter, header);
            },
            GetSMSDemo: function () {
                url = api_gateway_url + '/getsms';
                return $http.post(url, parameter, header);
            },
			Getrating: function(Center, Fromday, Today){
				 parameter = JSON.stringify({
                    Center: Center,
                    Fromday: Fromday,
                    Today: Today
                })
                url = api_gateway_url + '/getrating';
                return $http.post(url, parameter, header);
			},
			GetSrating: function(Username, Fullname, Fromday, Today){
				 parameter = JSON.stringify({
                    Username: Username,
					Fullname: Fullname,
                    Fromday: Fromday,
                    Today: Today
                })
                url = api_gateway_url + '/getsrating';
                return $http.post(url, parameter, header);
			},
			GetSCenter: function(Center, Fromday, Today){
				parameter = JSON.stringify({
					Center: Center,
                    Fromday: Fromday,
                    Today: Today
                })
                url = api_gateway_url + '/getscenter';
                return $http.post(url, parameter, header);
			}
        }
    })
    .factory('SMSService', function ($http) {
        var api_gateway_url = 'http://112.78.1.78:191';
        // var api_gateway_url = 'http://localhost:191';
        var parameter;
        var header = { header: { 'Conntent-Type': 'application/x-www-form-urlencoded' } };
        return {
            SendSMS: function (sdt, noidung) {
                // url = 'center/getsms.php';
                // parameter = {
                //     smsurl: 'http://cloudsms.vietguys.biz:8088/api/?u=SAS-Center&pwd=wcs8z&from=SAS.edu.vn&phone=' + sdt + '&sms=' + noidung
                // }
                // return $http.post(url, parameter, header);
                parameter = {
                    Phone: sdt,
                    SMS: noidung
                }
                url = api_gateway_url + '/checksms';
                return $http.post(url, parameter, header)
            }
        }
    })
    .factory('Thesocket', function (socketFactory) {
        var api_gateway_url = 'http://112.78.1.78:191';
        // var api_gateway_url = 'http://localhost:191';
        var socketConnection = io.connect(api_gateway_url);
        var socket = socketFactory({
            ioSocket: socketConnection
        });
        return socket;
    });
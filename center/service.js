angular.module('SASService', [])
    .factory('DataServices', function ($http) {
        // var api_gateway_url = 'http://35.240.165.98:191';
        var api_gateway_url = 'http://localhost:191';
        var parameter;
        var url;
        var header = { header: { 'Conntent-Type': 'application/x-www-form-urlencoded' } };

        return {
            // Api Auth
            signIn: function (Username, Password) {
                parameter = JSON.stringify({
                    Username: Username,
                    Password: Password
                });
                url = api_gateway_url + '/signin';
                return $http.post(url, parameter, header);
            },
            signUp: function (Username, Password, Fullname, Email, Phone, Role) {
                parameter = JSON.stringify({
                    Username: Username,
                    Password: Password,
                    Fullname: Fullname,
                    Email: Email,
                    Phone: Phone,
                    Role: Role,
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
            GetallUser: function () {
                url = api_gateway_url + '/getuserbysup';
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
            ShareStudent: function (detail) {
                parameter = JSON.stringify({
                    detail: detail
                });
                url = api_gateway_url + '/sharestudent';
                return $http.post(url, parameter, header);
            },

            //Api Student
            CstudentF: function (Fullname, Email, Phone, Sex, Address, Regday, Note, Center, Appointment_day, Appointment_dayiso, Appointment_time, Status_student, Manager) {
                parameter = {
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
            Getall: function (Username, Role) {
                parameter = JSON.stringify({
                    Username: Username,
                    Role: Role
                });
                url = api_gateway_url + '/getall';
                return $http.post(url, parameter, header);
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

            // Tìm kiếm
            SearchH: function (Regday, Regday2, Center, Status) {
                parameter = JSON.stringify({
                    Regday: Regday,
                    Regday2: Regday2,
                    Center: Center,
                    Status: Status
                });
                url = api_gateway_url + '/searchhome';
                return $http.post(url, parameter, header);
            },
            SearchN: function (Regday, Regday2, Username) {
                parameter = JSON.stringify({
                    Regday: Regday,
                    Regday2: Regday2,
                    Username: Username
                });
                url = api_gateway_url + '/searchnotcall';
                return $http.post(url, parameter, header);
            },
            SearchR: function (Retime, Retime2, Reday, Reday2, Sale) {
                parameter = JSON.stringify({
                    Retime: Retime,
                    Retime2: Retime2,
                    Reday: Reday,
                    Reday2: Reday2,
                    Sale: Sale
                });
                url = api_gateway_url + '/searchrecall';
                return $http.post(url, parameter, header);
            },
            SearchSch: function (Regday, Regday2, Sale) {
                parameter = JSON.stringify({
                    Regday: Regday,
                    Regday2: Regday2,
                    Sale: Sale
                })
                url = api_gateway_url + '/searchschedule';
                return $http.post(url, parameter, header);
            },
            SearchUn: function (Regday, Regday2, Username) {
                parameter = JSON.stringify({
                    Regday: Regday,
                    Regday2: Regday2,
                    Username: Username
                })
                url = api_gateway_url + '/searchunreg';
                return $http.post(url, parameter, header);
            },
            SearchS: function (Regday, Regday2, Sale) {
                parameter = JSON.stringify({
                    Regday: Regday,
                    Regday2: Regday2,
                    Sale: Sale
                })
                url = api_gateway_url + '/searchsend';
                return $http.post(url, parameter, header);
            },
            SearchC: function (Cday, Cday2, Sale) {
                parameter = JSON.stringify({
                    Cday: Cday,
                    Cday2: Cday2,
                    Sale: Sale
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
            Getlh: function (Username, Fromday, Today) {
                parameter = JSON.stringify({
                    Username: Username,
                    Fromday: Fromday,
                    Today: Today
                })
                url = api_gateway_url + '/chartlh';
                return $http.post(url, parameter, header);
            }
        }
    })
    .factory('Thesocket', function (socketFactory) {
        var api_gateway_url = 'http://35.240.165.98:191';
        // var api_gateway_url = 'http://localhost:191';
        var socketConnection = io.connect(api_gateway_url);
        var socket = socketFactory({
            ioSocket: socketConnection
        });
        return socket;
    });
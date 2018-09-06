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
            CstudentF: function (Fullname, Email, Phone, Sex, Address, Regday, Note, Center, Appointment_day, Appointment_time, Status_student, Manager) {
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
            Search: function (Appointment_day, Appointment_day2, Appointment_time, Appointment_time2, Center) {
                parameter = JSON.stringify({
                    Appointment_day: Appointment_day,
                    Appointment_day2: Appointment_day2,
                    Appointment_time: Appointment_time,
                    Appointment_time2: Appointment_time2,
                    Center: Center
                });
                url = api_gateway_url + '/search';
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
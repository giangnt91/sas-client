angular.module('SASService', [])
    .factory('DataServices', function ($http) {
        // var api_gateway_url = 'http://35.240.165.98:191';
        var api_gateway_url = 'http://localhost:191';
        var parameter;
        var url;
        var header = { header: { 'Conntent-Type': 'application/x-www-form-urlencoded' } };

        return {
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
            }
        }
    })
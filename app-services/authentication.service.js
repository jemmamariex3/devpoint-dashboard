app.factory('AuthenticationService', function ($http, $localStorage, $location) {
    var service = {};

    service.Login = Login;
    service.Logout = Logout;

    return service;

    function Login(identifier, password, callback) {
        var data = {
            identifier: identifier,
            password: password
        };
        $http({
            method: 'POST',
            url: 'https://devpoint-api.herokuapp.com/auth/local',
            data: $.param(data), //forms user object
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(function (response) {
                console.log(response.data);
                // login successful if there's a token in the response
                if (response.data.token) {
                    // store username and token in local storage to keep user logged in between page refreshes
                    //$localStorage.currentUser = {username: username, token: response.data.token};
                    $localStorage.username = response.data.username;
                    $localStorage.token = response.data.token;
                    // add jwt token to auth header for all requests made by the $http service
                    //$http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                    // execute callback with true to indicate successful login
                    callback(true);
                } else {
                    // execute callback with false to indicate failed login
                    callback(false);
                }
            });
    }



    function Logout() {
        // remove user from local storage and clear http auth header
        delete $localStorage.token;
        delete $localStorage.username;
        $location.path('/login');
        //$http.defaults.headers.common.Authorization = '';
    }
});
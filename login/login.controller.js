app.controller('Login.IndexController', function($location, AuthenticationService, $http, $localStorage) {
    var vm = this;

    vm.login = login;

    initController();

    function initController() {
        // reset login status
        AuthenticationService.Logout();
    }
    vm.gotoregister = function(){
        $location.path('/register');
    };

    vm.shoot = function () {
        var data = {
            identifier: "jarellano01",
            password: "password"
        };
        $http({
            method: 'POST',
            url: 'https://devpoint-api.herokuapp.com/auth/local',
            data: $.param(data), //forms user object
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response){
            console.log(response);
            $localStorage.test = response.data.token;
        });
    };

    function login() {
        vm.loading = true;
        AuthenticationService.Login(vm.identifier, vm.password, function (result) {
            if (result === true) {
                $location.path('/');
            } else {
                vm.error = 'Username or password is incorrect';
                vm.loading = false;
            }
        });
    }
});

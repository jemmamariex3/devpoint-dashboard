app.controller('register.controller', function($location, AuthenticationService, $http, $localStorage) {
    var vm = this;

    vm.login = login;

    // initController();
    //
    // function initController() {
    //     // reset login status
    //     AuthenticationService.Logout();
    // }



    function login() {
        vm.loading = true;
        if(vm.password != vm.verifyPassword){
            vm.error = "Passwords do not match"
        }
        else{
            AuthenticationService.Register(vm.email, vm.username, vm.password, function (result) {
                if (result === true) {
                    $location.path('/');
                } else {
                    vm.error = 'Username or password is incorrect';
                    vm.loading = false;
                }
            });
        }

    }
});

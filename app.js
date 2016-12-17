var app = angular.module("myApp", ['angularModalService', 'angular-cloudinary', 'tehwalris.file-selector', "ui.router", 'ngStorage']);


app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});


app.config(function ($stateProvider, $urlRouterProvider) {
    // default route
    //$urlRouterProvider.otherwise("/");

    // app routes
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home/dashboard.html',
            controller: 'appController'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'login/login.html',
            controller: 'Login.IndexController',
            controllerAs: 'vm'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'register/register.html',
            controller: 'register.controller',
            controllerAs: 'vm'
        });
});

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.config(function (cloudinaryProvider) {
    cloudinaryProvider.config({
        upload_endpoint: 'https://api.cloudinary.com/v1_1/', // default
        cloud_name: 'dsnpiaom4', // required
        upload_preset: 'exhyeshg', // optional
    });
});

app.run(function ($rootScope, $http, $location, $localStorage) {
    // keep user logged in after page refresh
    if ($localStorage.token) {
        //$http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/register','/login'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        console.log(restrictedPage);
        console.log($location.path());

        if (restrictedPage && !$localStorage.token) {
            $location.path('/login');
        }
    });
});

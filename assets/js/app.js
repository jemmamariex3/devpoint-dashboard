var app = angular.module("myApp", []);


app.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.service('sharedData', function() {
  $scope
});

app.controller('appController', function($scope){
  $scope.firstName = "John";
  $scope.lastName = "Doe";
});

app.controller('services', function ($scope, $http) {


  $scope.updateServices = function () {
    $scope.services.push('new service')
  };

  $scope.user = {
    name: "Html"
  };

  $scope.delete = function (id) {
    $http.get("https://devpoint-api.herokuapp.com/service/delete/" + id).then(function (response) {
      $scope.reloadServices();
    })
  };

  $scope.reloadServices = function () {
    $http.get("https://devpoint-api.herokuapp.com/user/jarellano/services").then(function (response) {
      $scope.services = response.data;
    }, function (response) {
      $scope.services = "Something went wrong";
    });
  };
  $scope.reloadServices();

  $scope.submitForm = function () {
    // Posting data to php file
    $http({
      method: 'POST',
      url: 'https://devpoint-api.herokuapp.com/user/jarellano/services',
      data: $.param($scope.user), //forms user object
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .then(function (data) {
        $scope.reloadServices();
      });
  };

});


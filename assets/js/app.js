var app = angular.module("myApp", []);


app.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});
app.controller('services', function ($scope, $http) {
  $scope.firstName = "John";
  $scope.lastName = "Doe";


  $scope.updateServices = function(){
    $scope.services.push('new service')
  };

  $scope.user = {
    name: "Html"
  };



  $scope.delete = function(id){
    $http.get("https://devpoint-api.herokuapp.com/service/delete/" + id).then(function(response){
      $scope.reloadServices();
    })
  };

  $scope.reloadServices = function () {
    $http.get("https://devpoint-api.herokuapp.com/user/jarellano/services").then(function (response) {
      $scope.services = response.data;
    }, function(response) {
      $scope.services = "Something went wrong";
    });
  };
  $scope.reloadServices();

  $scope.submitForm = function() {
    // Posting data to php file
    $http({
      method  : 'POST',
      url     : 'https://devpoint-api.herokuapp.com/user/jarellano/services',
      data    : $.param($scope.user), //forms user object
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .then(function(data) {
        $scope.reloadServices();
      });
  };

});




// app.directive("serviceTemplate", function () {
//   return {
//     template: " <h1 ng-repeat='x in services'>[[x]]</h1>"
//
//   };
// });

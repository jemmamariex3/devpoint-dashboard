var app = angular.module("myApp", []);


app.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.service('sharedData', function() {
 // $scope
});


app.controller('appController', function ($scope, $http) {

  //GLOBAL VARIABLES
  $scope.deleteItem = function (id, itemName) {
    $http.delete("https://devpoint-api.herokuapp.com/user/jarellano/" + itemName + "/" + id).then(function (response) {
      $scope.reloadData();
    })
  };


  $scope.newItem = {};
  $scope.newItemMethod = "Create";

  $scope.reloadData = function () {
    $http.get("https://devpoint-api.herokuapp.com/user?username=jarellano").then(function (response) {
      $scope.user = response.data;
    }, function (response) {
      $scope.user = "Something went wrong";
    });
  };
  $scope.reloadData();

  $scope.createItem = function (itemName) {
    // Posting data to php file
    $http({
      method: 'POST',
      url: 'https://devpoint-api.herokuapp.com/user/jarellano/' + itemName,
      data: $.param($scope.newItem), //forms user object
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .then(function (data) {
        $scope.reloadData();
        $scope.newItem = {};
      });
  };


});

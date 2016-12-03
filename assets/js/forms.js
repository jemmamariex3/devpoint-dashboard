var postApp = angular.module('postApp', []);
// Controller function and passing $http service and $scope var.
postApp.controller('postController', function($scope, $http) {
  // create a blank object to handle form data.
  $scope.user = {};
  // calling our submit function.
  $scope.submitForm = function() {
    // Posting data to php file
    $http({
      method  : 'POST',
      url     : 'clone.php',
      data    : $scope.user, //forms user object
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .success(function(data) {
        if (data.errors) {
          // Showing errors.
          $scope.errorName = data.errors.name;
          $scope.errorUserName = data.errors.username;
          $scope.errorEmail = data.errors.email;
        } else {
          $scope.message = data.message;
        }
      });
  };
});

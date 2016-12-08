var app = angular.module("myApp", ['angularModalService']);


app.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.service('sharedData', function () {
  // $scope
});


app.controller('appController', function ($scope, $http, ModalService) {

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

  $scope.createItem = function (itemName, item) {
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

  $scope.show = function (itemName, item) {
    var newItem = item[0][0];
    var method = "post";
    if (item) {
      method = "put";
    }
    ModalService.showModal({
      templateUrl: '/js/modals/' + itemName + '.html',
      controller: "ModalController",
      inputs: {
        options: {
          item: newItem,
          method: method
        }
      }
    }).then(function (modal) {
      modal.element.modal({
        backdrop: 'static',
        keyboard: false
      });
      modal.close.then(function (result) {
        if (!result) {
          $scope.message = "Cancelled";
        }
        else {
          $scope.createItem()
          $scope.message = result;
        }
      });
    });
  };
});

app.controller('ModalController', function ($scope, options, close) {
  $scope.curItem = options.item;
  $scope.method = options.method;
  $scope.close = function (result) {
    if(result){
      close($scope.curItem, 500); // close, but give 500ms for bootstrap to animate
    }
    else{
      close(result, 500)
    }

  };

});

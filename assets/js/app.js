var app = angular.module("myApp", ['angularModalService']);


app.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.service('sharedData', function () {
  // $scope
});


app.controller('appController', function ($scope, $http, ModalService) {
  // var basePath = 'http://localhost:3001';
  var basePath = 'https://devpoint-api.herokuapp.com';
  //GLOBAL VARIABLES
  $scope.deleteItem = function (id, itemName) {
    $http.delete( basePath + "/user/jarellano/" + itemName + "/" + id).then(function (response) {
      $scope.reloadData();
    })
  };


  $scope.newItem = {};
  $scope.newItemMethod = "Create";

  $scope.reloadData = function () {
    $http.get(basePath + "/user?username=jarellano").then(function (response) {
      $scope.user = response.data;
    }, function (response) {
      $scope.user = "Something went wrong";
    });
  };
  $scope.reloadData();

  $scope.createItem = function (itemName, item) {
    // Posting data to php file
    delete item.userId;
    delete item.deleteLink;
    delete item.createdAt;
    delete item.updatedAt;
    console.log(item);



    $http({
      method: 'POST',
      url: basePath + '/user/jarellano/' + itemName,
      data: $.param(item), //forms user object
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .then(function (data) {
        console.log(data.data);
        $scope.reloadData();
      });
  };

  $scope.show = function (itemName, item) {

    var method = "Create";
    var newItem;
    if (item) {
      newItem = item[0][0];
      method = "Update";
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
          $scope.createItem(itemName, result);
          $scope.message = result;
        }
      });
    });
  };
});

app.controller('ModalController', function ($scope, options, close) {
  $scope.original = angular.copy(options.item);
  $scope.curItem = options.item;
  $scope.method = options.method;
  $scope.close = function (result) {
    if (result) {
      close($scope.curItem, 500); // close, but give 500ms for bootstrap to animate
    }
    else {
      angular.copy($scope.original, $scope.curItem);
      close(result, 500)
    }

  };

});

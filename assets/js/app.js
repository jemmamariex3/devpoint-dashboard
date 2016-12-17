var app = angular.module("myApp", ['angularModalService', 'angular-cloudinary', 'tehwalris.file-selector', "ngRoute"]);


app.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.config(function($routeProvider) {
  $routeProvider
      .when("/", {
        templateUrl : "pages/dashboard.html",
        controller : "appController"
      })
      .when("/login", {
        templateUrl : "pages/login.html",
        controller : "login"
      })
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

app.controller('login', function($scope, $http){

});

app.controller('appController', ['$scope', '$http', 'ModalService', 'cloudinary', function ($scope, $http, ModalService, cloudinary) {
  // var basePath = 'http://localhost:3001';
  var basePath = 'https://devpoint-api.herokuapp.com';
  $scope.username = "rlopez";
  //GLOBAL VARIABLES

  $scope.uploadFile = function (file) {

      $scope.profileImage = file;

      console.log(file);

      cloudinary.upload(file, {public_id: $scope.user.username})
      // This returns a promise that can be used for result handling
        .then(function (resp) {
          console.log(resp.data);
          $scope.user.profile[0].profileImage = resp.data.public_id;
        });
  };

  $scope.deleteItem = function (id, itemName) {
    $http.delete(basePath + "/user/" + $scope.username + "/" + itemName + "/" + id).then(function (response) {
      $scope.reloadData();
    })
  };


  $scope.newItem = {};
  $scope.newItemMethod = "Create";

  $scope.reloadData = function () {
    $http.get(basePath + "/user/" + $scope.username).then(function (response) {
      $scope.user = response.data;
    }, function (response) {
      $scope.user = "Something went wrong";
    });
  };
  $scope.reloadData();
  $scope.updateProfile = function(){
    $scope.createItem("profile", $scope.user.profile[0]);
  };
  $scope.createItem = function (itemName, item) {
    // Posting data to php file
    delete item.userId;
    delete item.deleteLink;
    delete item.createdAt;
    delete item.updatedAt;
    console.log(item);


    $http({
      method: 'POST',
      url: basePath + '/user/' + $scope.username + '/' + itemName,
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
      templateUrl: 'assets/js/modals/' + itemName + '.html',
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

  $scope.updateUser = function () {
    var userData = angular.copy($scope.user);
    delete userData.username;
    delete userData.password;
    delete userData.createdAt;
    delete userData.updatedAt;
    delete userData.profileImage;
    delete userData.skill;
    delete userData.link;
    delete userData.id;
    delete userData.service;
    delete userData.project;
    $http({
      method: 'PUT',
      url: basePath + '/user/' + $scope.username,
      data: $.param(userData), //forms user object
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .then(function (data) {
        console.log(data.data);
        $scope.reloadData();
        $scope.message = "Saved";
      });
  };

  $scope.updateTemplate = function () {
    $http({
      method: 'PUT',
      url: basePath + '/user/' + $scope.username,
      data: $.param({template: $scope.user.template}), //forms user object
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .then(function (data) {
        console.log(data.data);
        $scope.reloadData();
        $scope.message = "Saved";
      });
  }
}]);

app.controller('ModalController', function ($scope, options, close) {
  $scope.icons = [
    {name: "Android", class: "fa fa-android"},
    {name: "Apple", class: "fa fa-apple"},
    {name: "Code", class: "fa fa-code"},
    {name: "CSS3", class: "fa fa-css3"},
    {name: "Codepen", class: "fa fa-codepen"},
    {name: "Dribbble", class: "fa fa-dribbble"},
    {name: "Facebook", class: "fa fa-facebook"},
    {name: "GitHub", class: "fa fa-github-alt"},
    {name: "Google Plus", class: "fa fa-google-plus"},
    {name: "HTML5", class: "fa fa-html5"},
    {name: "Instagram", class: "fa fa-instagram"},
    {name: "LinkedIn", class: "fa fa-linkedin"},
    {name: "Linux", class: "fa fa-linux"},
    {name: "Reddit", class: "fa fa-reddit"},
    {name: "Skype", class: "fa fa-skype"},
    {name: "Slack", class: "fa fa-slack"},
    {name: "Stack Overflow", class: "fa fa-stack-overflow"},
    {name: "Soundcloud", class: "fa fa-soundcloud"},
    {name: "Spotify", class: "fa fa-spotify"},
    {name: "Trello", class: "fa fa-trello"},
    {name: "Tumblr", class: "fa fa-tumblr"},
    {name: "Twitter", class: "fa fa-twitter"},
    {name: "Windows", class: "fa fa-windows"},
    {name: "Youtube", class: "fa fa-youtube"},
  ];
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

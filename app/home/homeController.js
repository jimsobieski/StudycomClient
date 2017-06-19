angular.module('myApp.homeController', ['ngRoute'])

    .controller('homeController', function ($scope, $mdDialog, $http, $rootScope, Auth) {

    $scope.user = null;

    $scope.user = Auth.user();

    console.log($scope.user);
    console.log($scope.user.name);


    });
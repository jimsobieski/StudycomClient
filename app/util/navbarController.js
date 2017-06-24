angular.module('myApp.navbarController', ['ngRoute'])

    .controller('navbarController', function ($scope, $mdDialog, $http, $rootScope, Auth, $mdSidenav) {

        $scope.test = 'test';

        $scope.isConnected = false;

        function successAuth(res) {
            $mdDialog.hide();
        }

        $scope.openSideNav = function (){
            $mdSidenav('left').toggle();
        }

        $scope.showInscription = function (ev) {
            $mdDialog.show({
                controller: inscriptionController,
                controllerAs: 'inscription',
                templateUrl: 'welcome/inscription.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (answer) {

            })

            function inscriptionController($scope, $mdDialog) {
                $scope.email = '';
                $scope.password = '';
                $scope.confirmPassword = '';
                $scope.closeDialog = function () {
                    $mdDialog.hide();
                }

                $scope.authInscription = function () {

                    var formData = {
                        'login': $scope.login,
                        'name': $scope.name,
                        'email': $scope.email,
                        'password': $scope.password,
                        'idtype': $scope.typeUser
                    }

                    Auth.signup(formData, successAuth, function () {
                        $rootScope.error = 'Invalid credentials.';
                    })

                }
            }
        };
        $scope.showConnexion = function (ev) {
            $mdDialog.show({
                controller: connexionController,
                controllerAs: 'connexion',
                templateUrl: 'welcome/connexion.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (answer) {

            });

            function connexionController($scope, $mdDialog, $rootScope, Auth) {
                $scope.email = '';
                $scope.password = '';
                $scope.name = "connexion";
                $scope.closeDialog = function () {
                    $mdDialog.hide();
                };

                $scope.signin = function () {
                    var formData = {
                        email: $scope.email,
                        password: $scope.password
                    };

                    Auth.signin(formData, successAuth, function () {
                        $rootScope.error = 'Invalid credentials.';
                    })
                };
            }

        };

        $scope.logout = function () {
            Auth.logout();
        };

        $scope.isConnected = function () {
            return Auth.isConnected();
        }
    });
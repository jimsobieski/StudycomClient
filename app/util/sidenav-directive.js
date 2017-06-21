studycom.directive("studycomSidenav", function ($http) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "util/sidenav-directive.html",
        link: function(scope) {

        },
        controller: function ($scope, $mdDialog, Auth) {

            $scope.user = null;

            Auth.user().then(function(response) {
                $scope.user = response;
                $scope.getTopics();
                $scope.getContacts();

            });

            $scope.getTopics = function () {
                $http.get('http://localhost/Studycom/public/api/user/'+$scope.user.id+'/topic').then(function(response) {
                    $scope.topics = response.data;

                })
            };

            $scope.getContacts = function () {
                $http.get('http://localhost/Studycom/public/api/user/'+$scope.user.id+'/contacts/get').then(function(response) {
                    $scope.contacts = response.data;

                })
            };


            $scope.openAddTopicDialog = function (ev) {
                $mdDialog.show({
                    controller: addTopicModalController,
                    controllerAs: 'addTopic',
                    templateUrl: 'util/addTopicModal.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                }).then(function (answer) {

                });

                function addTopicModalController($scope, $mdDialog, $rootScope, Auth) {

                    Auth.user().then(function(response) {
                        $scope.user = response;
                    });

                    $scope.name = '';

                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    };


                    $scope.createTopic = function () {
                        var formData = {
                            name: $scope.name,
                        };
                        console.log($scope.user.id);
                        $http.post('http://localhost/Studycom/public/api/user/'+ $scope.user.id+'/topic', formData)
                            .then(function(response) {
                                console.log(response.data);
                                $mdDialog.hide();
                        })


                    };
                }
            }

            $scope.openAddContactDialog = function (ev) {
                $mdDialog.show({
                    controller: addContactModalController,
                    controllerAs: 'addTopic',
                    templateUrl: 'util/addContactModal.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                }).then(function (answer) {

                });

                function addContactModalController($scope, $mdDialog, $rootScope, Auth) {
                    $scope.name = '';

                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    };

                    $scope.createTopic = function () {
                        var formData = {
                            name: $scope.name,
                        };
                        console.log(formData);

                    };
                }
            }
        }
    }
});
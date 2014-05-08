angular.module('myModule', []);

angular.module("myApp", ["ui.bootstrap"])
  .controller('Hello', function($scope) {
    $scope.$watch("yourName", function( yourName ) {
        if ((yourName !== undefined) && (yourName !== "")) {
          $scope.msg = "hello, " + yourName;
        }
        else {
          $scope.msg = "";
        }
      }
    );
  });
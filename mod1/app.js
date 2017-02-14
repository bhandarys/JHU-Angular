(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', function ($scope) {
  $scope.message = "";
  $scope.menu = "";

  $scope.checkCount = function(){
    var count = countMenuItems($scope.menu);
    if (count == 0){
      $scope.message = "Please enter data first";
    }
    else if (count <= 3){
    $scope.message = "Enjoy!";
    }
    else {
      $scope.message = "Too much!";
    };
  };
  function countMenuItems(string) {
    if(string.length == 0){
      return 0;
    }
    var arrLunchItems = string.split(",");
    var count = 0;
    for(var i=0;i<arrLunchItems.length;i++){
        if(arrLunchItems[i].trim() != "")
           count = count + 1;
    }
    return count;
  };

});

})();

(function (){
'use strict';

var shoppingList1 = [
  {
    name: "Rolls",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "200"
  },
  {
    name: "Cookies",
    quantity: "300"
  },
  {
    name: "Chocolate",
    quantity: "5"
  }
];
var shoppingList2 = [];

angular.module("ShoppingListCheckOff", [])
  .controller("ToBuyController", ToBuyController)
  .controller("AlreadyBoughtController", AlreadyBoughtController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyController.$inject = ["$scope"];
  function ToBuyController($scope){
    $scope.ToBuyList = shoppingList1;

    $scope.onBuy = function(index) {
      shoppingList2.push(  {
          name: shoppingList1[index].name,
          quantity: shoppingList1[index].quantity
        }
      );
      shoppingList1.splice(index, 1);
    };
  }

  AlreadyBoughtController.$inject = ["$scope"];
  function AlreadyBoughtController($scope){
    $scope.BoughtList = shoppingList2;
  }
  function ShoppingListCheckOffService(index){
    // $scope.onBuy = function(index) {
    //   shoppingList2.push(  {
    //       name: shoppingList1[index].name,
    //       quantity: shoppingList1[index].quantity
    //     }
    //   );
    //   shoppingList1.splice(index, 1);
    // };
  }

})();

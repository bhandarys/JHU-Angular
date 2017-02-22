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
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  //ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController() { //, ShoppingListCheckOffService){
    var buy = this;
    buy.ToBuyList = shoppingList1;

    buy.onBuy = function(index){
      onBuy(index);
    }
  }

  //AlreadyBoughtController.$inject = ["$scope"];
  function AlreadyBoughtController(){
    var bought = this
    bought.BoughtList = shoppingList2;
  }

  function ShoppingListCheckOffService(index){
    var service = this;
    service.onBuy = function(index) {
    function onBuy(index) {
      shoppingList2.push(  {
          name: shoppingList1[index].name,
          quantity: shoppingList1[index].quantity
        }
      );
      shoppingList1.splice(index, 1);
    }
    };
  }

  function onBuy(index) {
    shoppingList2.push(  {
        name: shoppingList1[index].name,
        quantity: shoppingList1[index].quantity
      }
    );
    shoppingList1.splice(index, 1);
  };

})();

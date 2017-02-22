(function (){
'use strict';

angular.module("ShoppingListCheckOff", [])
  .controller("ToBuyController", ToBuyController)
  .controller("AlreadyBoughtController", AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var buy = this;
    buy.ToBuyList = ShoppingListCheckOffService.shoppingList1;

    buy.onBuy = function(index){
      ShoppingListCheckOffService.onBuy(index);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var bought = this
    bought.BoughtList = ShoppingListCheckOffService.shoppingList2;
  }

  function ShoppingListCheckOffService(){
    var service = this;
    // Data
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
    // Till here

    service.shoppingList1 = shoppingList1;
    service.shoppingList2 = shoppingList2;

    service.onBuy = function(index) {
      shoppingList2.push(  {
          name: shoppingList1[index].name,
          quantity: shoppingList1[index].quantity
        }
      );
      shoppingList1.splice(index, 1);
    };
  }
})();

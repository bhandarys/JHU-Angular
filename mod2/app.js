(function (){
'use strict';

angular.module("ShoppingListCheckOff", [])
  .controller("ToBuyController", ToBuyController)
  .controller("AlreadyBoughtController", AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var buy = this;
    buy.ToBuyList = ShoppingListCheckOffService.getToBuyItems();

    buy.onBuy = function(index){
      ShoppingListCheckOffService.onBuy(index);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var bought = this
    bought.BoughtList = ShoppingListCheckOffService.getBoughtItems();

    bought.onCancelBuy = function(index){
      ShoppingListCheckOffService.onCancelBuy(index);
    }
  };

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
    // Data till here

    service.getToBuyItems = function(){
      return shoppingList1;
    };

    service.getBoughtItems = function(){
      return shoppingList2;
    };

    service.onBuy = function(index) {
      shoppingList2.push(  {
          name: shoppingList1[index].name,
          quantity: shoppingList1[index].quantity
        }
      );
      shoppingList1.splice(index, 1);
    };

    service.onCancelBuy = function(index) {
      shoppingList1.push(  {
          name: shoppingList2[index].name,
          quantity: shoppingList2[index].quantity
        }
      );
      shoppingList2.splice(index, 1);
    };

  }
})();

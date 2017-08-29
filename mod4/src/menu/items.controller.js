(function(){
'use strict';

angular.module("data")
.controller("ItemsListController", ItemsListController);

  ItemsListController.$inject = ["items"];
  function ItemsListController(items) {
    var categoryItems = this;
    categoryItems.items = items;
    categoryItems.name = items.category.name;
  };
})();

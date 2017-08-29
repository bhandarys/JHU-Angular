(function(){
'use strict';

angular.module("data")
.controller("CategoriesListController", CategoriesListController);

  CategoriesListController.$inject = ["MenuDataService", "menu"];
  function CategoriesListController(MenuDataService, menu) {
    var categories = this;
    categories.items = menu;

  };
})();

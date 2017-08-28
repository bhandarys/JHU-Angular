(function(){
'use strict';

angular.module("data")
.controller("CategoriesListController", CategoriesListController);

  CategoriesListController.$inject = ["MenuCategories"];
  function CategoriesListController(MenuDataService, menu) {
    var categories = this;
    categories.items = MenuCategories;

  };
})();

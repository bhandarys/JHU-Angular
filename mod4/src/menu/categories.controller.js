(function(){
'use strict';

angular.module("data")
.controller("CategoriesListController", CategoriesListController);

  CategoriesListController.$inject = ["menu"];
  function CategoriesListController(menu) {
    var categories = this;
    categories.items = menu;

  };
})();

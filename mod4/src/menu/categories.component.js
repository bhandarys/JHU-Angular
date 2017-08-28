(function(){
'use strict';

angular.module("data")
.controller("CategoriesListController", CategoriesListController);


  CategoriesListController.$inject = ["MenuDataService", "menu"];
  // CategoriesListController.$inject = ["MenuCategories"];
  function CategoriesListController(MenuDataService, menu) {
    var categories = this;
    // categories.items = MenuCategories;

    var promise = MenuDataService.getAllCategories();
    promise
    .then(function(response){
        categories.items = response.data;
    })
    .catch(function(response){
      console.log("Error");
    })
    // console.log(MenuCategories);
  };
})();

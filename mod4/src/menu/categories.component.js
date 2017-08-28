(function(){
'use strict';

angular.module("data")
.controller("CategoriesListController", CategoriesListController);

  CategoriesListController.$inject = ["MenuDataService"];
  function CategoriesListController(MenuDataService) {
    var categories = this;
    //
    var promise = MenuDataService.getAllCategories();
    promise
    .then(function(response){
        categories.items = response.data;
    })
    .catch(function(response){
      console.log("Error");
    })
  };
})();

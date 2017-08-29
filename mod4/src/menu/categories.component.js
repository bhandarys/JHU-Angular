(function(){
'use strict';

  angular.module("MenuApp")
  .component("category", {
    templateUrl: "src/menu/categorieslist.template.html",
    bindings: {
      items: "<"
      }
    });
})();

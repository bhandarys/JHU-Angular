(function(){
'use strict';

  angular.module("MenuApp")
  .component("items", {
    templateUrl: "src/menu/itemlist.template.html",
    bindings: {
      items: "<"
      }
    });
})();

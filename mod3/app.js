(function(){

'use strict';

angular.module("NarrowItDownApp", [])
      .controller("NarrowItDownController", NarrowItDownController)
      .service("MenuSearchService", MenuSearchService);


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var list = this;

  console.log("Inside Controller");
 // {{item.short_name}}
  // list.getMatchedMenuItems = function(){};
  // list.items = "";
  list.getMatchedMenuItems = function(){
    console.log("Inside function");
    var promise = MenuSearchService.getMatchedMenuItems();
    console.log("Strange promise " + promise);
    promise.then(function (response){
        list.items = response.data.menu_items;
        console.log("in controller log; length is " + list.items.length);
        console.log("in controller log; status is " + response.status);
        console.log("in controller log; Status Text is " + response.statusText );
        console.log("in controller log; Status Text is " + response.data );
    })
    .catch(function(error){
      console.log("Caught the error");
    });
    // list.items = ["Sudhir", "Vidya", "Nakshatra"];

  } ;
}


  MenuSearchService.$inject = ["$http"];
  function MenuSearchService($http){
    var service = this;

    service.getMatchedMenuItems = function(){
      var response = $http({
        method:"GET",
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
        // url: ("https://davids-restaurant.herokuapp.com/categories.json")
      });
      console.log("Inside http call");
      return response;
    }
  };

})();

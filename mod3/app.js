(function(){

'use strict';

angular.module("NarrowItDownApp", [])
      .controller("NarrowItDownController", NarrowItDownController)
      .service("MenuSearchService", MenuSearchService)
      .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
      .directive("foundItems", FoundItemsDirective);

function FoundItemsDirective(){
  var ddo = {
    templateUrl: 'menuList.html',
    scope: {
       found: '<',
      //  myTitle: '@title',
      removeItem: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
    // link: ShoppingListDirectiveLink
  };
  return ddo;
};

function FoundItemsDirectiveController() {};

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var list = this;

  list.found = [];
  console.log("Inside Controller");
  list.getMatchedMenuItems = function(){
    console.log("Inside function with search for " + list.search);
    list.found.splice(0, list.found.length);
    var promise = MenuSearchService.getMatchedMenuItems(list.search);
    // console.log("Strange promise " + promise + " with search " + list.search);
    promise.then(function (response){
    // MenuSearchService.getMatchedMenuItems(list.search)
    // .then(function (response){
        list.found = response;
        console.log("Finally, the count is " + list.found.length);
        // CheckForSerchItems(list.search, response);
    })
    .catch(function(error){
      console.log("Caught the error " + error);
    });
    console.log("Search item is " + list.search );
  } ;

  list.removeItem = function(index){
      list.found.splice(index, 1);
  };
} // Controller


  MenuSearchService.$inject = ["$http", "ApiBasePath"];
  function MenuSearchService($http, ApiBasePath){
    var service = this;

    service.getMatchedMenuItems = function(search){
      console.log("Local to service function" + search);
      // var searhTerm = search;
      var response = $http({
        method:"GET",
        url: (ApiBasePath + "/menu_items.json")
        // url: ("https://davids-restaurant.herokuapp.com/categories.json")
      })
      .then(function(response){
            // search = "egg";
            var found = [];
            console.log("Inside Check for search items with search" + search);
            if(search){
              console.log("Inside Seach with count " + response.data.menu_items.length);
              for(var i=0;i<response.data.menu_items.length;i++){
                var n = response.data.menu_items[i].description.toLowerCase().search(search.toLowerCase());
                console.log("Found at position " + n + " in " + response.data.menu_items[i].description);
                if(n != -1){
                  console.log("Found Match" + response.data.menu_items[i].description);
                  found.push(response.data.menu_items[i])
                }
              }
            } else {
              console.log("search failed");
            }
            console.log("1. Found " + found.length + " items");
            return found;
      });
      // console.log("2. Found " + found.length + " items");
      return response;
    }; //function(search)
  }; //MenuSearchService

})();

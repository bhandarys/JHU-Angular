(function(){

'use strict';

angular.module("NarrowItDownApp", [])
      .controller("NarrowItDownController", NarrowItDownController)
      .service("MenuSearchService", MenuSearchService);


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var list = this;

  list.found = [];
  console.log("Inside Controller");
 // {{item.short_name}}
  // list.getMatchedMenuItems = function(){};
  list.getMatchedMenuItems = function(){
    console.log("Inside function");
    list.found.splice(0, list.found.length);
    var promise = MenuSearchService.getAllMenuItems();
    console.log("Strange promise " + promise);
    promise.then(function (response){
        list.items = response.data.menu_items;
        CheckForSerchItems(list.search);
        // console.log("Inside Seach with count " + list.items.count);
        // for(var i=0;i<list.items.count;i++){
        //   if(list.items[i].search(search) != -1){
        //      list.items1.push(items[i]);
        //      console.log("Pushed " + list.items[i].id);
        //    };

        // console.log("in controller log; length is " + list.items.length);
        // console.log("in controller log; status is " + response.status);
        // console.log("in controller log; Status Text is " + response.statusText );
        // console.log("in controller log; Status Text is " + response.data );
    })
    .catch(function(error){
      console.log("Caught the error " + error);
    });
    // list.items = ["Sudhir", "Vidya", "Nakshatra"];
    console.log("Search item is " + list.search );
  } ;

  function CheckForSerchItems(search){
    console.log("Inside Check for search items");
        if(search){
        console.log("Inside Seach with count " + list.items.length);
        for(var i=0;i<list.items.length;i++){
          var n = list.items[i].description.toLowerCase().search(search.toLowerCase());
          console.log("Found at position " + n + " in " + list.items[i].description);
          if(n != -1){
            console.log("Found Match" + list.items[i]);
            // items[i].splice(i, 1);
            list.found.push(list.items[i])
            console.log("Excpeption in push");
          }
          else {
            console.log("Not Match");
          }
        }
      }
      else{
        console.log("search failed");
      }
    };
  //
  list.removeItem = function(index){
      list.found.splice(index, 1);
  };
} // Controller


  MenuSearchService.$inject = ["$http"];
  function MenuSearchService($http){
    var service = this;

    service.getAllMenuItems = function(){
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

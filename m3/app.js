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
      preSearch: '=',
      Sudhir: '<',
      removeItem: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true,
    link: FoundItemsDirectiveLink
  };
  return ddo;
};


function FoundItemsDirectiveController() {
  var list = this;

  list.showMsg = function(){
    // console.log("Inside Show Message Function. Value of preSearch is " + list.preSearch);
    // console.log(list);
    if(list.preSearch == true){
      return false;
    } else {
      if (list.found.length == 0){
        return true;
      }
    }
    return false;
    // return true;
  }
};

function FoundItemsDirectiveLink(scope, element, attrs, controller) {

  scope.$watch('list.showMsg()', function (newValue, oldValue) {
    // console.log("showMsg is " + newValue);
    var emptyElem = element.find("div");
    if (newValue === true) {
      emptyElem.css('display', 'block');
    }
    else {
      emptyElem.css('display', 'none');
    }
  });

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var items = this;

  items.preSearch = true;
  items.Sudhir = "Sudhir";
  console.log("Inside Controller. Value of preSearch is " + items.preSearch);
  items.found = [];
  items.getMatchedMenuItems = function(){
    console.log("Inside getMatchedMenuItems function. Value of preSearch is " + items.preSearch);
    items.found.splice(0, items.found.length);
    items.preSearch = true;
    var promise = MenuSearchService.getMatchedMenuItems(items.search);
    console.log("Got promise");
    promise.then(function (response){
        console.log("Inside promise")
        items.found = response;
        items.preSearch = false;
        console.log("End of promise")
    }, function(response){})
    .catch(function(error){
      console.log("1. Caught the error with reason" + error.reason);
      console.log("1. Caught the error with reason" + error.status);
      console.log("1. Caught the error with reason" + error.description);
      // console.log("Caught the error " + error.name);
    });
  } ;

  items.removeItem = function(index){
      items.found.splice(index, 1);
      if (items.found.length == 0) items.preSearch = false;
  };
} // Controller


MenuSearchService.$inject = ["$http", "ApiBasePath"];
function MenuSearchService($http, ApiBasePath){
  var service = this;

  service.getMatchedMenuItems = function(search){
    console.log("Inside the service");
    var response = $http({
      method:"GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    .then(function(response){
          var found = [];
          if(search){
            for(var i=0;i<response.data.menu_items.length;i++){
              var n = response.data.menu_items[i].description.toLowerCase().search(search.toLowerCase());
              if(n != -1){
                found.push(response.data.menu_items[i])
              }
            }
          } else {
            console.log("search failed");
          }
          return found;
    });
    return response;
  }; //function(search)
}; //MenuSearchService

})();
